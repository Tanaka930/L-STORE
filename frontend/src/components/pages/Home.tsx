import React, { useCallback,useState, useContext } from "react"

import { AuthContext } from "App"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import { postMessage } from "lib/api/message"
import Box from "@material-ui/core/Box"
import IconButton from '@material-ui/core/IconButton';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  uploadBtn: {
    marginTop: theme.spacing(2),
    textTransform: "none"
  },
  submitBtn: {
    marginLeft: theme.spacing(2),
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
  },
  input: {
    display: 'none',
  }
}))

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const {isSignedIn, currentUser } = useContext(AuthContext)
  const classes = useStyles()

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

    try {
      const data = createFormData()
      const res = await postMessage(data)
      console.log(res)
      if(res.status === 200){
        console.log("ok")
        // おそらくここにリダイレクト処理などを記述する
      }else{
        console.log(res.status + "error")
      }
    } catch (err){
      console.log(err)
    }
    
  }

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <h2>ようこそ {currentUser?.name}さん</h2>
            <form noValidate autoComplete="off" onSubmit={handleCreatePost}>
              <Card className={classes.card}>
                <CardHeader className={classes.header} title="公式ライン投稿" />
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
                    id="outlined-multiline-static"
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows={10}
                    label="メッセージ"
                    value={body}
                    margin="dense"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setBody(e.target.value)
                    }}
                  />
                  <Box display="flex" >
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
                    
                    <Button
                      className={classes.submitBtn}
                      variant="contained"
                      color="primary"
                      type="submit">
                      投稿する
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </form>
          </>
        ) : (
          <>
            <h1>トップページ</h1>
            <p>サインインしてください</p>
          </>
        )
      }
    </>
  )
}

export default Home