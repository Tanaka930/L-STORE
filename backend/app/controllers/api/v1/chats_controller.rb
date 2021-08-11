class Api::V1::ChatsController < LineCommonsController
  before_action :authenticate_api_v1_user!

  def index
    chats = LineCustomer.
            left_joins(:chats).
            select('chats.*','line_customers.image').
            where(chats: {line_customer_id: params[:line_customer_id]})
    render json: chats
  end

  def create
    begin
      trg_line_user = LineCustomer.find(params[:line_customer_id])
      # params[:messate]は仮
      # params[:image]は仮

      message = params[:message]

      result = insert(trg_line_user.id, message, params[:chat_image], "0")

      token = Token.find_by(user_id: trg_line_user.id)

      line = Linepush.new

      line.setToken(token.messaging_token)

      line.setBody(message)

      # 配列を宣言
      to = []

      # 配列にIDを入れる
      to.push(trg_line_user.original_id)

      if params[:chat_image]
        insert_img(result.id, params[:chat_image])
        line.setImage(params[:chat_image])
        line.setThumbnail(params[:chat_image])
        # 画像送信
        line.doPushImgTo(to)
      end

      # メッセージ送信
      line.doPushMsgTo(to)

      msg = "success"
      render json: { is_login: true, data: msg }
    rescue => e
      render json: { is_login: true, data: e }
    end    
  end

  private
  def insert(line_id, body, image)
    result = Chat.create(line_customer_id: line_id, body: body, chat_image: image, send_flg: "0")
    return result.id
  end

  def insert_img(user_id,image)
    result = Chatimage.create(chat_id: user_id, chat_image: image)
    return result.id
  end
end
