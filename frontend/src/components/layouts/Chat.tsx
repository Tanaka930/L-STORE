import { useState, useEffect, useRef, useLayoutEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { Box, Paper, TextField, Button, Avatar } from "@material-ui/core"
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
      height: "60vh",
      width: "500px",
      padding: 10,
      margin: "20px auto",
      position: "relative",
    },
    paper: {
      height: "50vh",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      overflowY: "scroll",
    },
    msgContainer: {
      display: "flex",
      margin: "0 6px"
    },
    msgBody: {
      margin: 10,
    },
    msgContent: {
      padding: 6,
      margin: 0,
      background: "#F1F1F1"
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
    icon: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    }
  })
)

const Chat = (props: TabPanelProps) => {
  const classes = useStyles()
  const { value, index, userId } = props
  const [chats, setChats] = useState<any[]>([])
  const [message, setMessage] = useState<string>("")
  const scrollBottomRef = useRef<HTMLDivElement>(null)

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
      if(res.status === 200){
        console.log("ok")
        setMessage("")
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

  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView()
  })

  return (
    <>
      { value === index && (
        <Paper className={classes.container} elevation={3}>
          <Paper className={classes.paper} elevation={2}>
            {chats.map((chat, index) => (
              <Box className={classes.msgContainer} key={index}>
                {chat.send_flg === "0" && (
                  <>
                    <Paper className={classes.msgBody}>
                      <p className={classes.msgContent}>{chat.body}</p>
                    </Paper>
                  </>
                )}
                {chat.send_flg === "1" && (
                  <>
                    <Avatar src={chat.image} className={classes.icon}  />
                    <Paper className={classes.msgBody}>
                      <p className={classes.msgContent}>{chat.body}</p>
                    </Paper>
                  </>
                )}
              </Box>
            ))}
            <div ref={scrollBottomRef}/>
          </Paper>
          <form
            noValidate
            onSubmit={handleMessagePost}
            className={classes.wrapForm}
          >
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
      )}
    </>
  )
}

export default Chat