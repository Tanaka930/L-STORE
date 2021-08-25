# class UserMailer < ApplicationMailer
class UserMailer
  require 'sendgrid-ruby'
  include SendGrid
  def self.send_signup_email
    from_address = "test@example.com"

    trg_address = "kaito.hasegawa@openstore-japan.com"

    subject = "テスト送信"

    from = Email.new(email: from_address)
    to = Email.new(email: trg_address)

    content = Content.new(type: 'text/plain', value: 'ハローハロー')
    mail = Mail.new(from, subject, to, content)

    sg = SendGrid::API.new(api_key: ENV['SENDGRID_WEB_API_KEY'])
    puts ENV['SENDGRID_WEB_API_KEY']
    response = sg.client.mail._('send').post(request_body: mail.to_json)
  end
end

