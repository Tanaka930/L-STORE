import { useCallback, useState, useContext, useEffect } from "react"
import { AuthContext } from "App"
import { postMessage } from "lib/api/message"
import { getTags } from "lib/api/tag"
import { Container, TextField, Card, CardContent, CardHeader, Button, Box, IconButton, MenuItem } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { GetTagsParams } from "types/index"

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
  welcome: {
    textAlign: "center"
  },
  header: {
    textAlign: "center"
  },
  card: {
    margin: "0 auto",
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
  },
  prevImgArea: {
    textAlign: "center",
    marginTop: 30
  },
  prevImg: {
    width: 300,
    height: 300,
    objectFit: "contain"
  }
}))

const Message = () => {
  const {isSignedIn, currentUser } = useContext(AuthContext)
  const classes = useStyles()
  const [title, setTitle] = useState<string>("")
  const [tagList, setTagList] = useState<GetTagsParams[]>([])
  const [groupId, setGroupId] = useState<string>("0")
  const [body, setBody] = useState<string>("")
  const [image, setImage] = useState<File>()
  const [preview, setPreview] = useState("")

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
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
      const res = await postMessage(data, groupId)
      if(res.status === 200) {
        toast.success("送信されました")
        setBody("")
      } else {
        toast.error("送信に失敗しました")
        console.error(res.status + "error")
      }
    } catch(err) {
      toast.warn("通信に失敗しました")
      console.error(err)
    }
  }

  useEffect(() => {
    getTags(setTagList)
  }, [])

  const initialTagData = {
    groupId: 0,
    groupName: "全体",
    groupCount: 0,
  }
  
  const initialTagList = [initialTagData, ...tagList]

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <Container maxWidth={false}>
              <form autoComplete="off" onSubmit={handleCreatePost}>
                <Card className={classes.card}>
                  <CardHeader className={classes.header} title="公式ライン投稿" />
                  <CardContent>
                    {/* <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="タイトル"
                      value={title}
                      margin="dense"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTitle(e.target.value)
                      }}
                    /> */}
                    <TextField
                      name="groupId"
                      label="送信先(タグ指定)"
                      variant="outlined"
                      fullWidth
                      select
                      value={groupId}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setGroupId(e.target.value)
                      }}
                    >
                      {initialTagList.map((list) => (
                        <MenuItem key={list.groupId} value={list.groupId}>
                          {list.groupName}
                        </MenuItem>
                      ))}
                    </TextField>
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
            </Container>
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

export default Message