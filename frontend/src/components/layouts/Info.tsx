import { useState, useEffect, useContext } from "react"
import { useForm, Controller } from 'react-hook-form'
import { AuthContext } from "App"
import axios from 'axios'
import Cookies from "js-cookie"
import { Box, Container, Grid, Card, CardContent, CardHeader, TextField, MenuItem, InputLabel, Button, Divider, IconButton, Typography } from "@material-ui/core"
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
      '& .MuiCardContent-root': {
        padding: 24,
      },
      '& .MuiCardHeader-root': {
        textAlign: "center",
        padding: 0,
        paddingBottom: 9
      },
    },
  }),
)

const Info = (props: TabPanelProps) => {
  const { value, index, userId } = props
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const { handleSubmit, control } = useForm()
  const [customerInfo, setCustomerInfo] = useState<any>({})
  const [edit, setEdit] = useState<boolean>(false)
  
  const forRange = (a: number, z: number) => {
    const lst = []
    for (let i = a; i <= z; i++) {
      lst.push(i)
    }
    return lst
  }
  
  const years = forRange(1920, 2021)
  const months = forRange(1, 12)
  const days = forRange(1, 31)
  const ages = forRange(9, 99)

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

  const getCustomerInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tokens/${currentUser?.id}/line_customers/${userId}`, config)
      if (response.status === 200) {
        setCustomerInfo(response.data)
      }
    } catch(err) {
      console.error(err)
    }
  }

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/tokens/${currentUser?.id}/line_customers/${userId}`, values, config)
      if (response.status === 200) {
        getCustomerInfo()
        toast.success("更新しました。")
        setEdit(false)
      } else {
        toast.error("更新に失敗しました")
      }
    } catch(err) {
      toast.warn("通信に失敗しました")
      console.error(err)
    }
  }

  useEffect(() => {
    getCustomerInfo()
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
                title="アカウント情報"
                subheader={edit && "お客様情報をご入力ください"}
              />
              <Divider variant="middle" />
              { edit ? (
                <>
                  <CardContent>
                    <form
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <Grid container spacing={3}>
                        <Grid container item spacing={1}>
                          <Grid item xs={12}>
                            <InputLabel>名前</InputLabel>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Controller
                              name="lastName"
                              control={control}
                              defaultValue={customerInfo.lastName}
                              render={({ field: { onChange, value } }) => (
                                <TextField
                                  name="lastName"
                                  label="姓"
                                  variant="outlined"
                                  fullWidth
                                  value={value}
                                  onChange={onChange}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Controller
                              name="firstName"
                              control={control}
                              defaultValue={customerInfo.firstName}
                              render={({ field: { onChange, value } }) => (
                                <TextField
                                  name="firstName"
                                  label="名"
                                  variant="outlined"
                                  fullWidth
                                  value={value}
                                  onChange={onChange}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                        <Grid container item spacing={1}>
                          <Grid item xs={12}>
                            <InputLabel>生年月日</InputLabel>
                          </Grid>
                          <Grid item xs={4}>
                            <Controller
                              name="year"
                              control={control}
                              defaultValue={customerInfo.year}
                              render={({ field: { onChange, value } }) => (
                                <TextField
                                  name="year"
                                  label="年"
                                  variant="outlined"
                                  fullWidth
                                  select
                                  value={value}
                                  onChange={onChange}
                                >
                                  {years.map((year, index) => (
                                    <MenuItem key={index} value={year}>
                                      {year}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              )}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Controller
                              name="month"
                              control={control}
                              defaultValue={customerInfo.month}
                              render={({ field: { onChange, value } }) => (
                                <TextField
                                  name="month"
                                  label="月"
                                  variant="outlined"
                                  fullWidth
                                  select
                                  value={value}
                                  onChange={onChange}
                                >
                                  {months.map((month, index) => (
                                    <MenuItem key={index} value={month}>
                                      {month}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              )}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Controller
                              name="day"
                              control={control}
                              defaultValue={customerInfo.day}
                              render={({ field: { onChange, value } }) => (
                                <TextField
                                  name="day"
                                  label="日"
                                  variant="outlined"
                                  fullWidth
                                  select
                                  value={value}
                                  onChange={onChange}
                                >
                                  {days.map((day, index) => (
                                    <MenuItem key={index} value={day}>
                                      {day}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              )}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={6}>
                          <Controller
                            name="age"
                            control={control}
                            defaultValue={customerInfo.age}
                            render={({ field: { onChange, value } }) => (
                              <TextField
                                name="age"
                                label="年齢"
                                variant="outlined"
                                fullWidth
                                select
                                value={value}
                                onChange={onChange}
                              >
                                { ages.map((age, index) => (
                                  <MenuItem key={index} value={age}>
                                    {age}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Controller
                            name="sex"
                            control={control}
                            defaultValue={customerInfo.sex}
                            render={({ field: { onChange, value } }) => (
                              <TextField
                                name="sex"
                                label="性別"
                                variant="outlined"
                                fullWidth
                                select
                                value={value}
                                onChange={onChange}
                              >
                                <MenuItem value={0}>男</MenuItem>
                                <MenuItem value={1}>女</MenuItem>
                              </TextField>
                            )}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Controller
                            name="address"
                            control={control}
                            defaultValue={customerInfo.address}
                            render={({ field: { onChange, value } }) => (
                              <TextField
                                name="address"
                                label="住所"
                                variant="outlined"
                                fullWidth
                                value={value}
                                onChange={onChange}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Controller
                            name="tel"
                            control={control}
                            defaultValue={customerInfo.tel}
                            render={({ field: { onChange, value } }) => (
                              <TextField
                                name="tel"
                                label="電話番号"
                                variant="outlined"
                                helperText="ハイフン無しで入力してください"
                                value={value}
                                onChange={onChange}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Controller
                            name="email"
                            control={control}
                            defaultValue={customerInfo.email}
                            render={({ field: { onChange, value } }) => (
                              <TextField
                                name="email"
                                label="メールアドレス"
                                variant="outlined"
                                fullWidth
                                value={value}
                                onChange={onChange}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            type="submit"
                          >
                            保存
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardContent>
                    <Box sx={{p: 1}}>
                      <Grid container spacing={3}>
                        <Grid container item spacing={1}>
                          <Grid item xs={12}>
                            <Typography color="textSecondary">
                              名前
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography color="textPrimary">
                              {customerInfo.lastName} {customerInfo.firstName}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container item spacing={1}>
                          <Grid item xs={12}>
                            <Typography color="textSecondary">
                              生年月日
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography color="textPrimary">
                              {customerInfo.year}年 {customerInfo.month}月 {customerInfo.day}日
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container item spacing={1}>
                          <Grid item xs={12}>
                            <Typography color="textSecondary">
                              年齢
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>
                              {customerInfo.age}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container item spacing={1}>
                          <Grid item xs={12}>
                            <Typography color="textSecondary">
                              性別
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>
                              {customerInfo.sex === 0 ? "男" : "女"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container item spacing={1}>
                          <Grid item xs={12}>
                            <Typography color="textSecondary">
                              住所
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>
                              {customerInfo.address}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container item spacing={1}>
                          <Grid item xs={12}>
                            <Typography color="textSecondary">
                              電話番号
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>
                              {customerInfo.tel}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container item spacing={1}>
                          <Grid item xs={12}>
                            <Typography color="textSecondary">
                              メールアドレス
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>
                              {customerInfo.email}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
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

export default Info