# 支払い処理成功用のクラス
class StripePaid
  @object = nil
  @trg_user = nil


  def set_parameter(object)
    # パラメータをセット
    @object = object

    puts @object

    trg_user = User.find(1)

  end

end