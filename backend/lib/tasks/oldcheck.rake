namespace :oldcheck do
  desc "テスト"
  task testbach: :environment do
    Oldcheck::Batch.batch
  end
end
