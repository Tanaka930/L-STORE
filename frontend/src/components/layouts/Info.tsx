type TabPanelProps = {
  children?: React.ReactNode
  index: any
  value: any
  userId: any
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