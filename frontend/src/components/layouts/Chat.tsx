import { useState, useEffect, useContext } from "react"
import axios from "axios"

type TabPanelProps = {
  index: any
  value: any
  userId: any
}

const Chat = (props: TabPanelProps) => {
  const { value, index, userId } = props

  useEffect(() => {
  }, [])

  return (
    <>
      {value === index && (
        <>
          <h1>トーク画面</h1>
          <p>ユーザーID：{userId}</p>
        </>
      )}
    </>
  )
}

export default Chat