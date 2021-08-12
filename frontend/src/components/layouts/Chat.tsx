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
      width: "500px"
    }
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
          <Paper elevation={3}>
            <Paper>
              {chats.map((chat, index) => (
                <p key={index}>チャット文章：{chat.body}</p>
              ))}
            </Paper>
            <form noValidate onSubmit={handleMessagePost}>
              <TextField
                fullWidth
                label="メッセージ"
                value={message}
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