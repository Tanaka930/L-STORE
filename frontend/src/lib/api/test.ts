import client from "lib/api/client"
import { TokenParams } from "types/index"
import { config } from "./config"

// 動作確認用
export const execTest = () => {
  return client.get("/test")
}

// Token（新規token作成）
export const token = (params: TokenParams) => {
  return client.post("/tokens", params, config)
}