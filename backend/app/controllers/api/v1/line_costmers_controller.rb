class Api::V1::LineCostmersController < LineCommonsController

  require 'net/http'
  require 'uri'
  require 'json'

  before_action :authenticate_api_v1_user!, except: :create

  def index
    line_users = LineCostmer.where(user_id: current_api_v1_user.id, blockflg: "0").pluck(:id,:user_id,:name,:image)
    json_array = []
    line_users.each do |line_user|
      json_data = {
        "id" => line_user[0] ,
        "user_id" => line_user[1],
        "name" => line_user[2],
        "image" => line_user[3]
      }
      json_array.push(json_data)
    end
    render json: json_array
  end

  def create
    @token = Token.find_by(access_id: params[:token_access_id])

    if fromLine(request, @token.chanel_secret)
      event_type = params[:events][0][:type]
      # case event_type
      # when "follow"
      if event_type == "follow"
        follow()
      elsif event_type == "unfollow"
        unfollow()
      elsif event_type == "message" or "image"
        resept_line_message(request)
      end
    end
  end

  private
  def follow()
    # lineのID取得
    original_id = params[:events][0][:source][:userId]

    # トークン情報を取得
    token = Token.find_by(access_id: params[:token_access_id])

    # トークンに紐づくユーザーを取得
    user = User.find(token.user_id)

    # ユーザーがいるかを確認
    # line_user_exists = LineCostmer.exists?(user_id: user.id, original_id: original_id)
    line_user = LineCostmer.find_by(user_id: user.id, original_id: original_id)
    if line_user != nil and line_user.blockflg == "1"
      # 名前と写真が変わった際の処理をここに記入予定
      line_user.update(blockflg: "0")
    else
      line_prifile = Lineprofile.new(original_id)
      line_prifile.setToken(token.messaging_token)
      prifile_hash = line_prifile.getProfile()
      if prifile_hash["response"] == "success"
        insert_user(user.id, original_id,prifile_hash["name"],prifile_hash["image"],"0")
      end
    end
  end

  def unfollow()
    original_id = params[:events][0][:source][:userId]
    # トークン情報を取得
    token = Token.find_by(access_id: params[:token_access_id])

    # トークンに紐づくユーザーを取得
    user = User.find(token.user_id)

    line_user = LineCostmer.find_by(user_id: user.id, original_id: original_id)

    if line_user.blockflg == "0"
      line_user.update(blockflg: "1")
    end
  end

  private
  def insert_user(user_id, original_id,name,image,flg)
    LineCostmer.create(user_id: user_id, original_id: original_id, name: name, image: image, blockflg: flg)
  end
end