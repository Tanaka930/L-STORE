class Api::V1::ChatsController < LineCommonsController
  before_action :authenticate_api_v1_user!
  def create
    begin
      trg_line_user = LineCostmer.find(params[:line_costmer_id])
      # params[:messate]は仮
      # params[:image]は仮

      message = params[:messate]

      insert(trg_line_user.id, message, image, "0")

      token = Token.find_by(user_id: trg_line_user.id)

      line = Linepush.new

      line.setToken(token.messaging_token)

      line.setBody(message)

      if params[:image]
        image = params[:image]
        line.setImage(image)
      end




      
      msg = "success"
      render json: { is_login: true, data: msg }
    rescue => e
      render json: { is_login: true, data: e }
    end    
  end
end
