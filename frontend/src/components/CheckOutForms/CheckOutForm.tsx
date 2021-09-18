import React,{ useContext } from "react"
import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement ,injectStripe} from 'react-stripe-elements'
import { AuthContext } from "App"
import Cookies from "js-cookie"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { Icon } from '@iconify/react';

const CheckoutForm = (props: any) => {
  const { currentUser } = useContext(AuthContext)
  async function handleSubmit(e: any) {
    
    try{
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
      console.log(response.status)
      if (response.status === 200) {
        toast.success("情報を更新しました")
      } else {
        toast.error("サーバーでエラーが発生しました")
      }
    }catch(e){
      if (e instanceof TypeError){
        toast.error("入力情報をご確認ください")
      }else{
        toast.error("サーバーでエラーが発生しました")
        console.log(e)
      }
    }
  }
  return (
    <>
      <div className="cardWrapper">
        <div className="paymentTitle">お支払い情報</div>
        <legend className="col-form-label">カード番号</legend>
        <CardNumberElement 
          className="cardNum"
        />
        <div className="cardInfo">
          <div className="cardInfoTitle">
            お取り扱いできるカード
          </div>
          <Icon 
            icon="logos:visa"
            className="cardMark"
            width="30"
            />
          <Icon 
            icon="logos:mastercard"
            className="cardMark"
            width="30"
            />
          <Icon 
            icon="logos:amex" 
            className="cardMark"
            width="30"
            />
          <Icon 
            icon="logos:jcb" 
            className="cardMark"
            width="30"
            />
        </div>
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  )
  

}

export default injectStripe(CheckoutForm)