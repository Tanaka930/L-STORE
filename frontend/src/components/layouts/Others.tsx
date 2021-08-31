import { useState, useEffect } from "react"
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import moment from 'moment'
import Cookies from "js-cookie"
import { Box, Container, Card, CardContent, CardHeader, Paper, TextField, Button, Divider, Typography, IconButton} from "@material-ui/core"
import PostAddIcon from '@material-ui/icons/PostAdd';
import CloseIcon from '@material-ui/icons/Close'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AlertMessage from "components/utils/AlertMessage"

type TabPanelProps = {
  index: number
  value: number
  userId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiCardHeader-title': {
        fontSize: 24,
      },
      '& .MuiCardHeader-root': {
        textAlign: "center",
        padding: 0,
        paddingBottom: 9
      },
      '& .MuiPaper-root': {
        marginBottom: 24
      }
    },
  }),
)

const Others = (props: TabPanelProps) => {
  const { value, index, userId } = props
  const [edit, setEdit] = useState(false)
  const [memos, setMemos] =useState<any[]>([])
  const { handleSubmit, control, reset, setValue } = useForm()
  const classes = useStyles()
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const [messageText, setMessageText] = useState<string>("")


  const config = {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }

  const handleNewPostButton = () => {
    setEdit(prevState => !prevState)
    setValue("body", "")
  }

  const handleEditButton = (body: string) => {
    setEdit(true)
    setValue("body", body)
  }

  const handleDeleteButton = (id: number) => {
    if (window.confirm("削除してもよろしいでしょうか？")) {
      console.log("削除完了")
      try {
        axios.delete(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/memos/${id}`, config)
        .then(() => {
          getMemos()
          setMessageText("メモを削除しました。")
          setAlertMessageOpen(true)
        })
        .catch(error => console.error(error))
      } catch(err) {
        console.error(err)
      }
    }
  }

  const getMemos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/memos`, config)
      if (response.status === 200) {
        setMemos(response.data)
      }
    } catch(err) {
      console.error(err)
    }
  }

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/memos`, values, config)
      if (response.status === 200) {
        getMemos()
        setMessageText("メモを投稿しました。")
        setAlertMessageOpen(true)
        setEdit(false)
        reset()
      } else {
        toast.error("更新に失敗しました")
      }
    } catch(err) {
      toast.warn("通信に失敗しました")
      console.error(err)
    }
  }

  useEffect(() => {
    getMemos()
  }, [])

  return (
    <>
      {value === index && (
        <Box py={3} className={classes.root}>
          <Container maxWidth="sm">
            <Card>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  px: 1
                }}
              >
                <IconButton onClick={handleNewPostButton}>
                  { edit ? <CloseIcon /> : <PostAddIcon /> }
                </IconButton>
              </Box>
              <CardHeader
                title="備考欄"
                subheader={edit && "メモ情報がある場合はご記入ください"}
              />
              <Divider variant="middle" />
                { edit ? (
                  <>
                    <CardContent>
                      <form
                        className={classes.root}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <Controller
                          name="body"
                          control={control}
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              name="body"
                              label="備考"
                              variant="outlined"
                              fullWidth
                              multiline
                              rows={9}
                              value={value}
                              onChange={onChange}
                            />
                          )}
                        />
                        <Box sx={{mt: 3}}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            type="submit"
                          >
                            保存
                          </Button>
                        </Box>
                      </form>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <CardContent>
                      {memos.map((memo, index) => (
                        <Paper
                          key={memo.id}
                          elevation={2}
                        >
                          <Box sx={{pt: 2, px:2}}>
                            <Typography
                              color="textPrimary"
                            >
                              {memo.body}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              variant="caption"
                              display="block"
                              align="right"
                            >
                              {moment(memo.updated_at).format('YYYY/MM/DD')}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <IconButton onClick={() => handleEditButton(memo.body)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteButton(memo.id)}>
                              <DeleteForeverIcon />
                            </IconButton>
                          </Box>
                        </Paper>
                      ))}
                    </CardContent>
                    <AlertMessage
                      open={alertMessageOpen}
                      setOpen={setAlertMessageOpen}
                      severity="success"
                      message={messageText}
                      vertical="bottom"
                      horizontal="right"
                    />
                    <ToastContainer
                      position="bottom-right"
                      autoClose={5000}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover={false}
                    />
                  </>
                )}
            </Card>
          </Container>
        </Box>
      )}
    </>
  )
}

export default Others