namespace :delete_chat_message do
  desc "3ヶ月以上前のデータの削除"
  task delete_chat_message: :environment do
    DeleteChat::DeleteChat.batch
  end
end
