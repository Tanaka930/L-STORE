namespace :send_mail do
  desc "Delete message data more than 3 months ago"
  task send_mail: :environment do
    SendMail::SendMail.batch
  end
end