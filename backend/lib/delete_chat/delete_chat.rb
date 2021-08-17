module DeleteChat::DeleteChat extend self
  require "date"
  def batch
    # 日付取得
    d = Date.today
    # タイムスタンプの場合は、00:00:00が基準
    # ターゲットの日付+1日で考える
    trg_datas = Chat.where("created_at <= ?", d-89)
    ActiveRecord::Base.transaction do
      trg_datas.each do |trg_data|
        trg_data.destroy
      end
    end
  end
end