import client from "lib/api/client"
import Cookies from "js-cookie"
import { TokenParams } from "interfaces/index"

// 動作確認用
export const execTest = () => {
  return client.get("/test")
}

// Token（新規token作成）
export const token = (params: TokenParams) => {
  const config = { 
    headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }}
  return client.post("/tokens", params, config)
}