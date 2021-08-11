class LineCommonsController < ApplicationController
  require './app/commonclass/linepush'
  require './app/commonclass/lineprofile'
  protected

  # LINEからメッセージを受信した際
  def resept_line_message(request)
    # イベントタイプとラインのIDを取得
    event_type = params[:events][0][:message][:type]
    original_id = params[:events][0][:source][:userId]
    
    # トークン情報を取得
    token = Token.find_by(access_id: params[:token_access_id])

    if !LineCustomer.exists?(user_id: token.user_id, original_id: original_id)
      # 以下プロフィール情報を取得
      profile_hash = get_line_profile(original_id,token.messaging_token)
      # 以上プロフィール情報を取得
      if profile_hash["response"] == "success"
        insert_user(token.user_id, original_id,profile_hash["name"],profile_hash["image"],"0")
      end
    end

    if event_type == "text"
      # 対象のline登録ユーザーを取得
      trg_line_user = search_line_customer(original_id,params[:token_access_id])
      # インサートする
      insert(trg_line_user.id, params[:events][0][:message][:text],nil,"1")
    elsif event_type == "image"
      # 対象のline登録ユーザーを取得
      trg_line_user = search_line_customer(original_id,params[:token_access_id])
      # 以下画像の処理
      line = Linepush.new
      line.setToken(token.messaging_token)
      line.setSecret(token.chanel_secret)
      img_file = line.lineImgSave(request)
      # 以上画像の処理

      # インサートする
      insert(trg_line_user.id, nil,img_file,"1")
    end
  end

  # チャット情報のインサート
  def insert(line_id,body,image,send_flg)
    Chat.create(line_customer_id: line_id, body: body, image: image, send_flg: send_flg)
  end

  # 登録ユーザー検索
  def search_line_customer(original_id,token_access_id)
    user_token = Token.find_by(access_id: token_access_id)
    trg_line_user = LineCustomer.find_by(original_id: original_id, user_id: user_token.user_id)
    return trg_line_user
  end

  # クライアント情報をセット
  def set_client(client_src, access_token)
    @client ||= Line::Bot::Client.new { |config|
      config.channel_secret = access_token
      config.channel_token = client_src
    }
  end

  # ラインからのアクセスチェック
  def fromLine(request, secret_id)
    http_request_body = request.raw_post
    hash = OpenSSL::HMAC::digest(OpenSSL::Digest::SHA256.new, secret_id, http_request_body)
    signature = Base64.strict_encode64(hash)
    if request.env['HTTP_X_LINE_SIGNATURE'] == signature
      return true
    else
      return false
    end
  end

  # フォローアクション
  def follow()
    # lineのID取得
    original_id = params[:events][0][:source][:userId]

    # トークン情報を取得
    token = Token.find_by(access_id: params[:token_access_id])

    # トークンに紐づくユーザーを取得
    user = User.find(token.user_id)

    # ユーザーがいるかを確認
    line_user = LineCustomer.find_by(user_id: user.id, original_id: original_id)
    if line_user != nil and line_user.blockflg == "1"
      # 名前と写真が変わった際の処理をここに記入予定
      line_user.update(blockflg: "0")
    else
      # 以下プロフィール情報を取得
      profile_hash = get_line_profile(original_id,token.messaging_token)

      if profile_hash["response"] == "success"
        insert_user(user.id, original_id,profile_hash["name"],profile_hash["image"],"0")
      end
    end
  end

  # ブロックアクション
  def unfollow()

    # LINE IDを取得
    original_id = params[:events][0][:source][:userId]

    # トークン情報を取得
    token = Token.find_by(access_id: params[:token_access_id])

    # トークンに紐づくユーザーを取得
    user = User.find(token.user_id)

    # トークンに紐づくユーザーを取得
    line_user = LineCustomer.find_by(user_id: user.id, original_id: original_id)

    begin
      if line_user.blockflg == "0"
        line_user.update(blockflg: "1")
      end
    rescue => e
    end
  end

  # ユーザー登録
  def insert_user(user_id, original_id,name,image,flg)
    LineCustomer.create(user_id: user_id, original_id: original_id, name: name, image: image, blockflg: flg)
  end

  # LINEのプロファイル取得用メソッド
  def get_line_profile(original_id, messaging_token)

    line_prifile = Lineprofile.new(original_id)

    line_prifile.setToken(messaging_token)

    return line_prifile.getProfile()
  end
end