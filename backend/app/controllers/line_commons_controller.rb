class LineCommonsController < ApplicationController
  require './app/commonclass/linepush'
  protected
  def resept_line_message(request)
    event_type = params[:events][0][:type]
    original_id = params[:events][0][:source][:userId]
    if event_type == "message"
      # ここはモデルに書く
      trg_user = search_line_customer(original_id:,original_id)





      # インサートする
      insert(trg_user.id, params[:events][0][:message][:text],nil,"1")
      
    elsif event_type == "image"
      # ここはモデルに書く
      trg_user = search_line_customer(original_id:,original_id)
      line = Linepush.new
      token = Token.find_by(user_id: trg_user.id)
      line.setTitle(token.access_token)
      line.setSecret(token.chanel_secret)
      img_file = line.lineImgSave(request)
      insert(trg_user.id, nil,img_file,"1")
    end
  end

  def insert(line_id,body,image,send_flg)
    Chat.create(line_id: line_id, body: body, image: image, send_flg: send_flg)
  end

  def search_line_customer(original_id)
    trg_user = LineCostmer.find_by(original_id:,original_id)
    return trg_user
  end

  def set_client(client_src, access_token)
    @client ||= Line::Bot::Client.new { |config|
      config.channel_secret = access_token
      config.channel_token = client_src
  end
end