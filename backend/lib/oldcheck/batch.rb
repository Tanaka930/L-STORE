module Oldcheck::Batch extend self
  require "date"
  def batch
    # 日付取得
    d = Date.today
    trg_datas = Chat.where("created_at <= ?", d-1)
    ActiveRecord::Base.transaction do
      trg_datas.each do |trg_data|
        trg_data.destroy!
      end
    end
  end
end