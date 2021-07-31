class Api::V1::ChatsController < LineCommonsController
  before_action :authenticate_api_v1_user!
  def create
    begin
      
    rescue => e
      render json: { is_login: true, data: e }
    end    
  end
end
