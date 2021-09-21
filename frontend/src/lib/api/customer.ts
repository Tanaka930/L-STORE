import client from "lib/api/client"
import Cookies from "js-cookie"
import { CustomersParams, User, UserInfo } from "types/index"


// お友達リスト一覧取得用
export const getCustomers = async ( setCustomers: React.Dispatch<React.SetStateAction<CustomersParams[]>>, currentUser: User | undefined ) => {
  const config = {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }
  try {
    const res = await client.get(`/tokens/${currentUser?.id}/line_customers`, config)
    setCustomers(res.data)
  } catch(err) {
    console.error(err)
  }
}


// 詳細情報取得用
export const getCustomerDetail = async ( setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>, currentUser: User | undefined, id: string ) => {
  const config = {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }
  try {
    const res = await client.get(`/tokens/${currentUser?.id}/line_customers/${id}`, config)
    setUserInfo(res.data)
  } catch(err) {
    console.error(err)
  }
}