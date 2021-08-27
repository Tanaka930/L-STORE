import { useState, useEffect } from "react"
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import Cookies from "js-cookie"
import { Box, Container, Card, CardContent, CardHeader, TextField, Button, Divider, Typography, IconButton } from "@material-ui/core"
import SettingsIcon from '@material-ui/icons/Settings'
import CloseIcon from '@material-ui/icons/Close'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
    },
  }),
)

const Others = (props: TabPanelProps) => {
  const { value, index, userId } = props
  const [edit, setEdit] = useState(false)
  const [memos, setMemos] =useState<any[]>([])
  const { handleSubmit, control, reset } = useForm()
  const classes = useStyles()


  const config = {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }

  const handleToggleButton = () => {
    setEdit(prevState => !prevState)
  }

  const getMemos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/chats`, config)
      if (response.status === 200) {
        setMemos(response.data)
      }
    } catch(err) {
      console.error(err)
    }
  }

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/chats`, values, config)
      if (response.status === 200) {
        getMemos()
        toast.success("更新しました。")
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
                <IconButton onClick={handleToggleButton}>
                  { edit ? <CloseIcon /> : <SettingsIcon /> }
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
                        <Box key={index} sx={{p: 1}}>
                          <Typography
                            color="textPrimary"
                          >
                            {memo.body}
                          </Typography>
                        </Box>
                      ))}
                    </CardContent>
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