type TabPanelProps = {
  index: number
  value: number
  userId: string
}

const Chat = (props: TabPanelProps) => {
  const { value, index, userId } = props

  return (
    <>
      {value === index && (
        <>
          <h1>アカウント情報画面</h1>
          <p>ユーザーID：{userId}</p>
        </>
      )}
    </>
  )
}

export default Chat