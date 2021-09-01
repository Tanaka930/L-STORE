class Api::V1::UsersController < ApplicationController
  # ここは後ほど修正
  # before_action :authenticate_api_v1_user!
  def show
    begin
      # ユーザーの公式アカウントに対するフォロー情報を取得
    # ここは後ほど修正
      follow_records = FollowRecord.where(user_id: 1).order(created_at: "ASC").limit(7)

      # からの配列を用意
      follow_record_histories = []
      follow_sum_record_histories = []
      follow_record_days = []
      unfollow_record_histories = []


      # 取得したデータをもとに配列データを作成
      follow_records.each do |follow_record|

        # そうフォロワー数を取得
        follow_sum = follow_record.follow + follow_record.unfollow

        # 配列に追加
        follow_record_histories.push(follow_record.follow)

        follow_sum_record_histories.push(follow_sum)

        unfollow_record_histories.push(follow_record.unfollow)

        follow_record_days.push(follow_record.created_at.strftime("%m/%d"))
      end

      json_data = {
        # "message" => "success",
        "datasets" => [
          {
            "backgroundColor" => "#06c755",
            "borderColor" => "#06c755",
            "data" => follow_record_histories,
            "label" => "フォロー数"
          },
          {
            "backgroundColor" => "#e53935",
            "borderColor" => "#e53935",
            "data" => unfollow_record_histories,
            "label" => "ブロック数"      
          }
        ],
        "labels" => follow_record_days
      }
    rescue => e
      json_data = {
        # "message" => "error",
        "datasets" => e
      }
    end
    render json: json_data
  end
  def get_follow_data
    # 最新のユーザーを1件取得
    # ここは後ほど修正
    follow_records = FollowRecord.where(user_id: 1).order(created_at: :desc).limit(1)
    follow_count = 0
    unfollow_count = 0
    follow_records.each do |follow_record|
      follow_count = follow_record.follow
      unfollow_count = follow_record.unfollow
    end

    json_data = {
      "follow_count" => follow_count,
      "unfollow_count" => unfollow_count
    }

    render json: json_data
  end
end
