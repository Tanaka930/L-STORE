namespace :delete_message do
  desc "3ヶ月以上前のデータの削除"
  task delete_message: :environment do
    DeleteMessage::DeleteMessage.batch
  end
end
