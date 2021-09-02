class Api::V1::StripeController < ApplicationController

  def create_subscription
    begin
      # Stripeのトークン
      token = params[:stripeToken]

      # ユーザ情報(メールアドレスなど一意なもの)
      client = params[:client]

      # 顧客の詳細情報
      detail = params[:detail]

      # 契約するプラン
      plan = params[:plan]

      # 顧客情報の作成
      customer = Stripe::Customer.create(
        :email => client,
        :source => token,
        :description => detail
      )

      # 作成された顧客のIDを取得
      customer_id = customer.id

      # Subsctiptionの作成
      Stripe::Subscription.create(
      customer: customer_id,
      plan: plan
      )

      json_data = {
        msg = "success"
      }

    rescue => e
      # 例外が発生した際
      json_data = {
        msg = "error"
        detail = e
      }
    end
    
    render json: json_data

  end
end