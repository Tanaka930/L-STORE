class Apicommon
  require 'net/http'
  require 'uri'
  require 'json' 

  def initialize()

  end

  def setToken(token)
    @token = token
  end

  def setImage(image)
    @image = image
  end

  protected
  def getHeader
    headers = {
      'Authorization'=>"Bearer #{@token}",
      'Content-Type' =>'application/json',
      'Accept'=>'application/json'
    }
    return headers
  end
end