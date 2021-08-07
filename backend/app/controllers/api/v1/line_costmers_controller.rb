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
        "id" => line_user[0],
        "user_id" => line_user[1],
        "name" => line_user[2],
        "image" => line_user[3]
      }
      json_array.push(json_data)
    end
    render json: json_array
  end

  def show
    trg_user = LineCostmer.find(current_api_v1_user.id))
    json_data = {
      "id" => trg_user.id,
      "user_id" => trg_user.user_id,
      "name" => trg_user.name,
      "image" => trg_user.image
    }
    render json: json_data
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
end