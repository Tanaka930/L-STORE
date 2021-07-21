import client from "lib/api/client"
import Cookies from "js-cookie"

import { Message } from "interfaces/index"




// サインアップ（新規アカウント作成）
export const postMessage = (params: Message) => {
  return client.post("messages", params,{ 
    headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}