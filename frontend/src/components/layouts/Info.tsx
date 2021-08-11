interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

const Chat = (props: TabPanelProps) => {
  const { value, index } = props

  return (
    <>
      {value === index && (
        <h1>アカウント情報画面</h1>
      )}
    </>
  )
}

export default Chat