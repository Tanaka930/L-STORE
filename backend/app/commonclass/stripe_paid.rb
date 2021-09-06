# 支払い処理成功用のクラス
class StripePaid

  def set_parameter(object)

    # stripeのcustomer_idからユーザーを検索
    trg_user = User.where(credit_id: "")

    puts trg_user

    # 今月を取得
    now = Time.current 

    # 来月を取得
    next_month = now.next_month.strftime("%Y-%m")

    # 来月を取得
    next_expiration_date = next_month + "-15 23:59:59"

    puts next_expiration_date

    # trg_user.update(subscription_status: "active", )

  end

end