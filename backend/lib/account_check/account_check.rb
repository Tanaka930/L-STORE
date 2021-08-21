module AccountCheck::AccountCheck extend self
  require "date"
  require './app/commonclass/linepush'

  def batch
    begin
      # 出力するログを指定
      logger = Logger.new("log/" + ENV['ENV'] + ".log")

      logger.info("Start account chat")



      end
    rescue =>e
      # 例外が発生した際
      logger.info("Error occurred")
      logger.error(e)
    end
    logger.info("End account chat")
  end
end