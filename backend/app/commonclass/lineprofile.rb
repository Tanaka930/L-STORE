class Lineprofile < Apicommon

  def initialize(original_id)
    url = "https://api.line.me/v2/bot/profile/#{original_id}"
    @uri = URI.parse(url)
    @http = Net::HTTP.new(@uri.host,@uri.port)
    @http.use_ssl = true

    # original_idをセット
    @original_id = original_id
  end

  def getProfile
    response = getResponse()
    case response
    when Net::HTTPSuccess then
      contact = JSON.parse(response.body)
      profile_data = {
        "response" => "success",
        "name" => contact['displayName'],
        "image" => contact['pictureUrl'],
        "original_id" => @original_id
      }
    else
      profile_data = {
        "response" => "error"
      }
    end
    return profile_data
  end

  private
    def getHeader
      headers = {
        'Authorization'=>"Bearer #{@token}",
        'Content-Type' =>'application/json',
        'Accept'=>'application/json'
      }
      return headers
    end

    def getResponse
      response = @http.get(@uri.path, getHeader())
      return response
    end
end