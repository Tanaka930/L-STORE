class Api::V1::LineCostmersController < LineCommonsController

  require 'net/http'
  require 'uri'
  require 'json'

  before_action :authenticate_api_v1_user!, except: :create

  def index
    line_user = LineCostmer.where(user_id: current_api_v1_user.id).pluck(:id,:user_id,:name,:image)
    render json: { is_login: true, data: line_user}
  end

  def create

    event_type = params[:events][0][:type]

    # case event_type
    # when "follow"

    if event_type == "follow"
      # lineのID取得
      original_id = params[:events][0][:source][:userId]

      # トークン情報を取得
      token = Token.find_by(access_id: params[:token_access_id])

      # トークンに紐づくユーザーを取得
      user = User.find(token.user_id)

      @url = "https://api.line.me/v2/bot/profile/#{original_id}"
      @uri = URI.parse(@url)
      @http = Net::HTTP.new(@uri.host,@uri.port)
      @http.use_ssl = true
      headers = {
        'Authorization' => "Bearer #{token.messaging_token}",
        # 'Content-Type' => 'application/json',
        # 'Accept' => 'application/json'
      }

      response = @http.get(@uri.path, headers)
      # binding.pry
      case response
      when Net::HTTPSuccess then
        contact = JSON.parse(response.body)
        costmer_name = contact['displayName']
        costmer_image = contact['pictureUrl']
        
      else
        p "#{response.code} #{response.body}"
      end

      # 新規作成の場合
      @line_costmer = LineCostmer.new
      @line_costmer.original_id = original_id
      @line_costmer.user_id = user.id
      @line_costmer.name = costmer_name
      @line_costmer.image = costmer_image

      if @line_costmer.save
        render json: { status: 'SUCCESS', data: current_api_v1_user }
        return
      else
        render json: { status: 'ERROR', data: current_api_v1_user }
        return
      end
    elsif event_type == "unfollow"

    elsif event_type == "message" or "image"
      resept_line_message(request)
    end
    # when "message"
    #   return
    # when "unfollow"
    #   return
    # else
    #   return
    # end

  end

  private

  # def set_type
  #   event_type = params[:events][0][:type]

  #   case event_type
  #   when "follow"
  #     original_id = params[:events][0][:source][:userId]

  #     # トークン情報を取得
  #     token = Token.find_by(access_id: params[:token_access_id])
  
  #     # トークンに紐づくユーザーを取得
  #     user = User.find(token.user_id)
  
  #     @url = "https://api.line.me/v2/bot/profile/#{original_id}"
  #     @uri = URI.parse(@url)
  #     @http = Net::HTTP.new(@uri.host,@uri.port)
  #     @http.use_ssl = true
  #     headers = {
  #       'Authorization' => "Bearer #{token.messaging_token}",
  #       # 'Content-Type' => 'application/json',
  #       # 'Accept' => 'application/json'
  #     }
  
  #     response = @http.get(@uri.path, headers)
  #     # binding.pry
  #     case response
  #     when Net::HTTPSuccess then
  #       contact = JSON.parse(response.body)
  #       costmer_name = contact['displayName']
  #       costmer_image = contact['pictureUrl']
        
  #     else
  #       p "#{response.code} #{response.body}"
  #     end
  #   end
  # end

  # def line_costmer_params
  #   params.require(:line_costmer).permit(:chanel_id, :chanel_secret, :messaging_token, :login_token)
  # end


end