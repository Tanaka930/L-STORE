class Api::V1::LGroupsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :active_check
  def index
    group_names = LGroup.where(user_id: current_api_v1_user.id)
    json_data = {
      json:  {
        "status" => 200,
        "msg" => "succsess",
        json_data => group_names
      }
    }

    render json_data
  end

  def create
    # groupの名前のパラメータ取得
    group_name = params[:group_name]

    # データをインサート
    insert(current_api_v1_user.id, group_name)

    json_data = {
      json:  {
        "status" => 200,
        "msg" => "succsess",
      }
    }
    render json_data
  end

  private
  def insert(user_id, group_name)
    LGroup.create(user_id: user_id, name: group_name)
  end
end