import React,{ useContext } from "react"
import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement ,injectStripe} from 'react-stripe-elements'
import { AuthContext } from "App"
import Cookies from "js-cookie"
import axios from "axios"

const CheckoutForm = (props: any) => {
  const { currentUser } = useContext(AuthContext)
  async function handleSubmit(e: any) {
    const {token} = await props.stripe.createToken({name: "Name"})
    // clientはuid、プランはフォームから設定できるようにする
    const body = {
      stripeToken: token.id
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
      }
    }

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${currentUser?.id}/create_subscription`, body,config)
    if (response.status === 200) {

    } else {
      console.log('error')
    }
  }
  return (
    <>
      <div className="cardWrapper">
        <legend className="col-form-label">カード番号</legend>
        <CardNumberElement 
          className="cardNum"
        />
        <legend className="col-form-label">有効期限</legend>
        <CardExpiryElement 
          className="cardLimit"
        />
        <legend className="col-form-label">セキュリティーコード</legend>
        <CardCVCElement 
          className="securityCord"
        />
        <legend className="col-form-label">お名前</legend>
        <div>
          <input 
          className="inputName"
          type="text" 
          placeholder="YAMADA TAROU"
          // value={}
          />
        </div>
        <button 
          className="cardSubmit"
          onClick={handleSubmit}
        >
          お支払い情報を更新
        </button>
      </div>
    </>
  )
}

export default injectStripe(CheckoutForm)