import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { Box, Paper, TextField, Button } from "@material-ui/core"
import SendIcon from "@material-ui/icons/Send"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

type TabPanelProps = {
  index: number
  value: number
  userId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "500px",
      padding: 10
    },
    paper: {
      height: "60vh",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    msgBody: {
      margin: 10,
      overflowY: "scroll",
    },
    msgContent: {
      padding: 0,
      margin: 0
    },
    wrapForm : {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`,
      position: "absolute",
      bottom: 9
    },
    wrapText: {
      width: "100%"
    },
  })
)

const Chat = (props: TabPanelProps) => {
  const classes = useStyles()
  const { value, index, userId } = props
  const [chats, setChats] = useState<any[]>([])
  const [message, setMessage] = useState<string>("")

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
    } catch(err) {
      console.error(err.message)
    }
  }

  const handleMessagePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = {
      body : message
    }

    const config = {
      headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
      }
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/chats`, data, config)
      console.log(res)
      if(res.status === 200){
        console.log("ok")
      } else {
        console.log(res.status + "error")
      }
    } catch(err) {
      console.error(err)
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
        <Box mx="auto" className={classes.container}>
          <Paper className={classes.paper} elevation={3}>
            <Paper className={classes.msgBody}>
              {chats.map((chat, index) => (
                <p className={classes.msgContent} key={index}>{chat.body}</p>
              ))}
            </Paper>
            <form className={classes.wrapForm} noValidate onSubmit={handleMessagePost}>
              <TextField
                label="メッセージ"
                value={message}
                className={classes.wrapText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMessage(e.target.value)
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                <SendIcon />
              </Button>
            </form>
          </Paper>
        </Box>
      )}
    </>
  )
}

export default Chat