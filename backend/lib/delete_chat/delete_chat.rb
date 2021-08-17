module DeleteChat::DeleteChat extend self
  # date型を取り扱うのでインポート
  require "date"
  def batch
    # 日付取得
    d = Date.today
    # タイムスタンプの場合は、00:00:00が基準
    # ターゲットの日付+1日で考える
    Chat.where("created_at <= ?", d+1).find_each do |trg_datas|
      # 対象データを削除
      trg_datas.destroy
    end
  end
end