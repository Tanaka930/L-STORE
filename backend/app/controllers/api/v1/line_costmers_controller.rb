class Api::V1::LinesController < ApplicationController
  require 'net/http'
  require 'uri'
  require 'json'
  @@url = 'https://api.line.me/v2/bot/message/broadcast'
  @@url2 = 'https://api-data.line.me/v2/bot/message/'
  
  def initialize()
  @uri = URI.parse(@@url)
  @http = Net::HTTP.new(@uri.host,@uri.port)
  @http.use_ssl = true
  end
  def create
  @client ||= Line::Bot::Client.new { |config|
  config.channel_secret = "bf03742991e1e3b7bb63928891c3ade8"
  config.channel_token = "IOrFAeqFk18F/08fPy4ghwbucm8q6QEqoe987UbMkc+dG/IcZOi14QwmuWbc41R+WSONKNMDSfSfCT0fZ8Q3nyLByUY/xNjB9cToukdeq5LMcVs/GnT2DA4lTMNL9cMPqXPdbyf/PuG1RIl9b/S19QdB04t89/1O/w1cDnyilFU="
  }
  
  if params[:events][0][:message][:type] == "image"
  # @uri2 = URI.parse(@@url2 + params[:events][0][:message][:id] + "/content")
  # @http2 = Net::HTTP.new(@uri2.host,@uri2.port)
  # @http2.use_ssl = true
  # headers = {
  # 'Authorization'=>"Bearer IOrFAeqFk18F/08fPy4ghwbucm8q6QEqoe987UbMkc+dG/IcZOi14QwmuWbc41R+WSONKNMDSfSfCT0fZ8Q3nyLByUY/xNjB9cToukdeq5LMcVs/GnT2DA4lTMNL9cMPqXPdbyf/PuG1RIl9b/S19QdB04t89/1O/w1cDnyilFU=",
  # 'Content-Type' =>'application/json',
  # 'Accept'=>'application/json'
  # }
  # # imgparameter = {"to" => ["U740cabcce96e25489ac68f1e2cbc9392"],"messages" => [{"type" => "text", "text" => "返信"}]}
  # response = @http2.get(@uri2.path, headers)
  # logger.debug response
  # user = User.find(response)
  # body = request.body.read
  # event = @client.parse_events_from(body)[0]
  # temp = Tempfile.new("example").binmode.tap do |file|
  # file.write @client.get_message_content(event.message['id']).body
  # end
  body = request.body.read
  event = @client.parse_events_from(body)[0]
  image_response = @client.get_message_content(event.message['id'])
  file = File.open("/tmp/#{SecureRandom.uuid}.jpg", "w+b")
  file.write(image_response.body)
  Chat.create(line_id: 1, image: file ,send_flg: "1")
  else
  # lineのID取得
  original_id = params[:events][0][:source][:userId]
  
  # トークン情報を取得
  token = Token.find_by(access_id: params[:token_access_id])
  
  # トークンに紐づくユーザーを取得
  user = User.find(token.user_id)
  
  parameter = {"to" => ["U740cabcce96e25489ac68f1e2cbc9392"],"messages" => [{"type" => "text", "text" => "返信"}]}
  doPush(parameter)
  end
  end
  
  private
  def getHeader
  headers = {
  Authorization'=>"Bearer IOrFAeqFk18F/08fPy4ghwbucm8q6QEqoe987UbMkc+dG/IcZOi14QwmuWbc41R+WSONKNMDSfSfCT0fZ8Q3nyLByUY/xNjB9cToukdeq5LMcVs/GnT2DA4lTMNL9cMPqXPdbyf/PuG1RIl9b/S19QdB04t89/1O/w1cDnyilFU=",
  Content-Type' =>'application/json',
  Accept'=>'application/json'
  }
  return headers
  end
  
  def doPush(jsonParam)
  response = @http.post(@uri.path, jsonParam.to_json, getHeader())
  end
  end