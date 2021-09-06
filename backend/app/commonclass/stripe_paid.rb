# 支払い処理成功用のクラス
class StripePaid

  def set_parameter(object)

    # stripeのcustomer_idからユーザーを検索
    trg_user = User.find_by(credit_id: object.customer)

    trg_user.update()

  end

end