module SendMail::SendMail extend self
  def batch
    user = User.find(1)

    StripeMailer.send_thank(user).deliver
  end
end