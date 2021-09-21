import client from "lib/api/client"
import Cookies from "js-cookie"
import { CustomersParams, User } from "types/index"


// お友達リスト一覧取得用
export const getCustomers = async (setCustomers: React.Dispatch<React.SetStateAction<CustomersParams[]>>, currentUser: User | undefined) => {
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
