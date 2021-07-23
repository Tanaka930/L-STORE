class Api::V1::MessagesController < ApplicationController
  before_action :authenticate_api_v1_user!
  require './app/commonclass/linepush'
  def initialize()

  end

  def create
      # require 'net/http'
      # require 'uri'
      # require 'json' 

      # ユーザー情報をセット
      result = insert(current_api_v1_user.id,params[:title],params[:body],params[:image])

      line = Linepush.new
      line.setTitle(params[:title])
      line.setBody(params[:body])
      line.setImage(Message.find(result))
      line.setToken(Token.find_by(user_id: current_api_v1_user.id).messaging_token)

      # 送信処理
      begin
        line.doPushMsg
        line.doPushImg
        msg={'status' => 'success'}
      rescue => error
        msg={'status' => 'error'}
      end


      # # post先のurl
      # uri = URI.parse('https://api.line.me/v2/bot/message/broadcast')
      # http = Net::HTTP.new(uri.host,uri.port)
      # http.use_ssl = true



      render json: { is_login: true, data: msg }

  end

  private
  def insert(user_id,title, body, image)
    result = Message.create(user_id: user_id, title: title, body: body, image: image)
    return result.id
  end
end
