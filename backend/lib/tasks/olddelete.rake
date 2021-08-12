namespace :oldcheck do
  desc "3ヶ月以上前のデータの削除"
  task testbach: :environment do
    Oldcheck::OldChatDelete.batch
  end
end
