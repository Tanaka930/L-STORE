import client from "lib/api/client"
import Cookies from "js-cookie"
import { ChatDatas } from "types/index"


// チャット画面一覧取得用
export const getChats = async (setChats: React.Dispatch<React.SetStateAction<ChatDatas[]>>, userId: string) => {
  const config = {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }
  await client.get(`/line_customers/${userId}/chats`, config)
  .then(res => {
    setChats(res.data)
  })
  .catch(err => console.error(err))
}