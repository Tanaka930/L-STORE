class Api::V1::MemosController < ApplicationController
  before_action :authenticate_api_v1_user!
  def index
    trg_user = LineCustomer.find(params[:line_customer_id])
    memos = LineCustomerMemo.where(line_customer_id: trg_user.id)
    render json: memos
  end

  def create
    memos = LineCustomerMemo.create(line_customer_id: params[:line_customer_id], body: params[:body])

    render json: memos
  end
end