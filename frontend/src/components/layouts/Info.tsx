import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

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
          <form noValidate autoComplete="off">
            <TextField
              label="アカウント情報"
              variant="outlined"
              fullWidth
            />
          </form>
        </>
      )}
    </>
  )
}

export default Chat