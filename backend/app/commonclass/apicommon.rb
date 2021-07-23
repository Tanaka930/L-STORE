class Apicommon
  require 'net/http'
  require 'uri'
  require 'json' 

  def initialize()

  end

  def setToken(token)
    @token = token
  end

end