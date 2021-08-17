import { useState, useEffect, useRef, useLayoutEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { Paper, TextField, Button } from "@material-ui/core"
import SendIcon from "@material-ui/icons/Send"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { MessageLeft, MessageRight } from "./Message"

type TabPanelProps = {
  index: number
  value: number
  userId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    container: {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    messagesBody: {
      backgroundColor: "#7494C0",
      width: "calc( 100% - 20px )",
      margin: 10,
      padding: 5,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    },
    wrapForm : {
      display: "flex",
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
    // const interval = setInterval(()=>{
    //   getChats()
    // },1000)
    // return() => clearInterval(interval)
  }, [])

  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView()
  }, [])

  return (
    <>
      { value === index && (
        <div className={classes.container}>
          <Paper className={classes.paper}>
            <Paper id="style-1" className={classes.messagesBody}>
              {chats.map((chat, index) => (
                <span key={index}>
                  {chat.send_flg === "0" && (
                    <MessageRight
                      message={chat.body}
                    />
                  )}
                  {chat.send_flg === "1" && (
                    <MessageLeft
                      message={chat.body}
                      photoURL={chat.image}
                    />
                  )}
                </span>
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
                disabled={!message && true}
              >
                <SendIcon />
              </Button>
            </form>
          </Paper>
        </div>
      )}
    </>
  )
}

export default Chat