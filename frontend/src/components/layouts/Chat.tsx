import React, { useCallback, useState, useEffect, useRef, useLayoutEffect, useContext } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { AuthContext } from "App"
import { Paper, TextField, IconButton, Box } from "@material-ui/core"
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary"
import SendIcon from "@material-ui/icons/Send"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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
      height: "60vh",
      maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
      [theme.breakpoints.down("lg")]: {
        height: "50vh",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        alignItems: "start",
      }
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
      height: "50vh",
      display: "flex",
      justifyContent: "center",
      marginTop: 20,
      [theme.breakpoints.down("lg")]: {
        height: "40vh",
      },
      [theme.breakpoints.down("sm")]: {
        height: "60vh",
        alignItems: "start",
        marginTop: 20,
      }
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
      bottom: 9
    },
    wrapText: {
      width: "100%"
    },
    input: {
      display: 'none',
    },
    uploadBtn: {
      marginTop: theme.spacing(1),
      textTransform: "none"
    },
    prevImgArea: {
      textAlign: "center",
      marginTop: 30
    },
    prevImg: {
      width: 300,
      height: 300,
      objectFit: "contain"
    },
    sendBtn: {
      marginTop: theme.spacing(1),
    },
  })
)

const Chat = (props: TabPanelProps) => {
  const classes = useStyles()
  const { value, index, userId } = props
  const [chats, setChats] = useState<any[]>([])
  const [message, setMessage] = useState<string>("")
  const [image, setImage] = useState<File | undefined>()
  const [preview, setPreview] = useState("")
  const [customerIcon, setCustomerIcon] = useState("")
  const scrollBottomRef = useRef<HTMLDivElement>(null)
  const { currentUser } = useContext(AuthContext)

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
    setImage(file)
  }, [])

  const config = {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }

    // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()
    formData.append("body", message)
    if (image) formData.append("image", image)
      return formData
  }

  const getChats = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/chats`, config)
    .then(res => {
      setChats(res.data)
      console.log(res.data)
    })
    .catch(err => console.error(err))
  }

  const getCustomerIcon = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/tokens/${currentUser?.id}/line_customers/${userId}`, config)
    .then(res => {
      setCustomerIcon(res.data.image)
    })
    .catch(err => {
      console.error(err.message)
    })
  }

  const handleMessagePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = createFormData()

    await axios.post(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/chats`, data, config)
    .then(res => {
      console.log(res.data.data) //これがレスポンスのデータ内容
      const postData = res.data.data
      setChats([...chats, postData])
      setMessage("")
      setImage(undefined)
      setPreview("")
      toast.success("送信されました")
    })
    .catch(err => {
      toast.error("送信に失敗しました")
      console.error(err)
    })
  }

  useEffect(() => {
    getCustomerIcon()
    getChats()
    // const interval = setInterval(()=>{
    //   getChats()
    // },30000)
    // return() => clearInterval(interval)
  }, [])

  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView()
  })

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
                      image={chat.chat_image.url}
                    />
                  )}
                  {chat.send_flg === "1" && (
                    <MessageLeft
                      message={chat.body}
                      image={chat.chat_image.url}
                      icon={customerIcon}
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
              <input accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  uploadImage(e)
                }}
              />
              <label htmlFor="icon-button-file">
                <IconButton className={classes.uploadBtn}
                  color="primary"
                  aria-label="upload picture"
                  component="span">
                  <PhotoLibraryIcon />
                </IconButton>
              </label>
              <TextField
                label="メッセージ"
                value={message}
                className={classes.wrapText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMessage(e.target.value)
                }}
              />
              <IconButton
                className={classes.sendBtn}
                color="primary"
                type="submit"
                disabled={!message && !image}
              >
                <SendIcon />
              </IconButton>
            </form>
          </Paper>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
          />
          { preview &&
            <Box className={classes.prevImgArea}>
              <img className={classes.prevImg} src={preview} alt="プレビュー画像" />
            </Box>
          }
        </div>
      )}
    </>
  )
}

export default Chat