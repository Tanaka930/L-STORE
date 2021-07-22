import React, { useCallback,useState, useContext } from "react"

import { AuthContext } from "App"
import { useHistory, Link } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import { BorderStyleTwoTone } from "@material-ui/icons"
import { Message } from "interfaces/index"
import { postMessage } from "lib/api/message"
import { getCurrentUser } from "lib/api/auth"
import Cookies from "js-cookie"



const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  },
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))




// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const { setIsSignedIn, isSignedIn, currentUser, setCurrentUser } = useContext(AuthContext)
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(true)
  const [label, setLabel] = useState<File>()

  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const [image, setImage] = useState<File>()

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append("title", title)
    formData.append("body", body)
    if (image) formData.append("image", image)

    return formData
  }

  const handleCreatePost  = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = createFormData()

    const res = await postMessage(data)

    console.log(res)
    
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data = new FormData();
    // const params: Message = {
    //   title: title,
    //   body: body
    // }
    
    // const res = await postMessage(params)

    // console.log(Cookies.get("_access_token"))
    // setIsSignedIn(true)
    // setCurrentUser(res?.data.data)
    // setLoading(false)

  }

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <h2>ようこそ {currentUser?.name}さん</h2>
            <form noValidate autoComplete="off" onSubmit={handleCreatePost}>
            <Card className={classes.card}>
              <CardHeader className={classes.header} title="公式ライン一斉投稿" />
              <CardContent>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="タイトル"
                  value={title}
                  margin="dense"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTitle(e.target.value)
                  }}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="メッセージ"
                  value={body}
                  margin="dense"
                  autoComplete="current-password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBody(e.target.value)
                  }}
                />
                <input
                  accept="image/*"
                  id="icon-button-file" 
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    uploadImage(e)
                  }}
                />
                
                <Button
                  type="submit"
                  // variant="contained"
                  // size="large"
                  // fullWidth
                  // color="default"
                  // disabled={!title || !body ? true : false} // 空欄があった場合はボタンを押せないように
                  // className={classes.submitBtn}
                  // onClick={handleSubmit}
                >
                  送信する
                </Button>
              </CardContent>
            </Card>
          </form>
          </>
        ) : (
          <h1>Not signed in</h1>
        )
      }
    </>
  )
}

export default Home