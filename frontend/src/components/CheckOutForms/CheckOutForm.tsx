import React,{useContext} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { AuthContext } from "App"
import Cookies from "js-cookie"
import axios from 'axios'

const CheckoutForm = (props: any) => {
  const { currentUser } = useContext(AuthContext)
  async function handleSubmit(e: any) {
    const {token} = await props.stripe.createToken({name: "Name"});
    // clientはuid、プランはフォームから設定できるようにする
    const body={
      stripeToken: token.id,
      client: "kaito.hasegawa@openstore-japan.com",
      plan: "price_1JV4asIrPhnpYWov561BYZdZ"
    }

    const config =     {
      headers: {
        "Content-Type": "application/json",
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
              },
      body: body
    }

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${currentUser?.id}/create_subscription`, config)
    if (response.status === 200) {
      console.log(response)
      console.log('success')
    }else{
      console.log('error')
    }
  }
  return (
    <div>
      checkout
      <CardElement />
      <button onClick={handleSubmit}>チェックアウト</button>
    </div>
  )
}

export default injectStripe(CheckoutForm);