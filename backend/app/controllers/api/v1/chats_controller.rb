class Api::V1::ChatsController < LineCommonsController
  before_action :authenticate_api_v1_user!
  def create
    begin
      trg_line_user = LineCostmer.find(params[:line_costmer_id])
      # params[:messate]は仮
      # params[:image]は仮
      insert(trg_line_user.id, params[:messate], params[:image], "0")
      msg = "success"
      render json: { is_login: true, data: msg }
    rescue => e
      render json: { is_login: true, data: e }
    end    
  end
end
