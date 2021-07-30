class Api::V1::LinesController < ApplicationController
  def initialize()

  end
  def create

    # lineのID取得
    original_id = params[:events][0][:source][:userId]

    # トークン情報を取得
    token = Token.find_by(access_id: params[:token_access_id])

    # トークンに紐づくユーザーを取得
    user = User.find(token.user_id)
    
  end
end
