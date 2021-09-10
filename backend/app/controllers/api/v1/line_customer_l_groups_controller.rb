class Api::V1::LineCustomerLGroupsController < ApplicationController
  before_action :authenticate_api_v1_user!, except: :create
  before_action :active_check, except: :create
  def create
    l_group_id = params[:l_group_id]
    line_customer_id = params[:line_customer_id]
    name = params[:group_name]
    insert(l_group_id,line_customer_id,name)
  end

  def destroy
    trg_date = LineCustomerLGroup.find(params[:id])
    trg_date.destroy
  end

  def index
    begin
      # ログイン中のユーザーを取得
      user = current_api_v1_user

      # line_customerに紐づくgroup情報を取得
      now_groups = LineCustomer.where(user_id: user.id, id: 1).joins(:l_groups).select("l_groups.name,line_customer_l_groups.id")

      # ユーザーが登録しているグループ情報を取得
      groups = LGroup.where(user_id: user.id).select("id, name")

      # 空の配列を用意
      now_group_list =[]
      group_list = []

      # 配列にデータを追加する
      now_groups.each do |now_group|
        now_group_list.push(
          {
            "currentGroupsId" => now_group.id,
            "currentGroupsName" => now_group.name,
          }
        )
      end
      groups.each do |group|
        group_list.push(
          {
            "groupId" => group.id,
            "groupName" => group.name,
          }
        )
      end

      # jsonデータ作成
      json_data = {
        json: {
          "status" => 200,
          "msg" => "success",
          "nowGroupList" => now_group_list,
          "groups" => group_list
        }
      }
    rescue => e
      # jsonデータ作成
      json_data = {
        json: {
          "status" => 500,
          "msg" => "error",
          "error" => e
        }
      }
    end

    render json_data
  end

  private
  def insert(l_group_id,line_customer_id,name)
    LineCustomerLGroup.create(l_group_id: l_group_id, line_customer_id: line_customer_id, name: name)
  end
end


