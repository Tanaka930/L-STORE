import {TextField} from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

type TabPanelProps = {
  index: number
  value: number
  userId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(3),
        display: "block"
      },
    },
  }),
)

const Chat = (props: TabPanelProps) => {
  const { value, index, userId } = props
  const classes = useStyles()

  return (
    <>
      {value === index && (
        <>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              label="名前"
              variant="outlined"
            />
            <TextField
              label="生年月日"
              variant="outlined"
            />
            <TextField
              label="年齢"
              variant="outlined"
            />
            <TextField
              label="性別"
              variant="outlined"
            />
            <TextField
              label="住所"
              variant="outlined"
            />
            <TextField
              label="電話番号"
              variant="outlined"
            />
            <TextField
              label="メールアドレス"
              variant="outlined"
            />
          </form>
        </>
      )}
    </>
  )
}

export default Chat