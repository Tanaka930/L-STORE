import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"

type TabPanelProps = {
  index: number
  value: number
  userId: string
}

const Chat = (props: TabPanelProps) => {
  const { value, index, userId } = props
  const [chats, setChats] = useState<any[]>([])

  const getChats = async () => {
    const config = {
      headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
      }
    }

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/chats`, config)
      setChats(res.data)
      console.log(res.data)
    } catch(err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getChats()
    const interval = setInterval(()=>{
      getChats()
    },1000)
    return() => clearInterval(interval)
  }, [])

  return (
    <>
      {value === index && (
        <>
          <h1>トーク画面</h1>
          <h3>ユーザーID：{userId}</h3>
          {chats.map((chat, index) => (
            <p key={index}>チャット文章：{chat.body}</p>
          ))}
        </>
      )}
    </>
  )
}

export default Chat