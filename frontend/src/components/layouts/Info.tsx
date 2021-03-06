import { useState, useEffect, useContext } from "react"
import { useForm, Controller } from 'react-hook-form'
import { AuthContext } from "App"
import axios from "axios"
import Cookies from "js-cookie"
import { Box, Container, Grid, Card, CardContent, CardHeader, TextField, MenuItem, InputLabel, Button, Divider, IconButton, Typography } from "@material-ui/core"
import SettingsIcon from '@material-ui/icons/Settings'
import CloseIcon from '@material-ui/icons/Close'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiContainer-root': {
        padding: 0,
      },
      '& .MuiCardHeader-title': {
        fontSize: 24,
      },
      '& .MuiCardHeader-root': {
        textAlign: "center",
        padding: 0,
        paddingBottom: 9
      },
    },
    age: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 18
    },
  }),
)

type InfoFormValues = {
  firstName: string
  lastName: string
  address: string
  year: number
  month: number
  day: number
  email: string
  sex: number | undefined
  tel: string
}

type Props = {
  userId: string
}

const Info = ({ userId }: Props) => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const { handleSubmit, control, watch, reset } = useForm()
  const [customerInfo, setCustomerInfo] = useState<any>({})
  const [edit, setEdit] = useState<boolean>(false)
  let [y, m, d] = watch(["year", "month", "day"])

  const forRange = (a: number, z: number) => {
    const list = []
    for (let i = a; i <= z; i++) {
      list.push(i)
    }
    return list
  }
  
  const years = forRange(1920, 2021)
  const months = forRange(1, 12)
  const days = forRange(1, 31)
  // const ages = forRange(9, 99)

  const birthday = {
    year: y,
    month: m,
    day: d
  }

  const getAge = (birthday: any) => {
    const today = new Date()
    const thisYearsBirthday = new Date(today.getFullYear(), birthday.month-1, birthday.day)
    let age = today.getFullYear() - birthday.year
    if(today < thisYearsBirthday){
      age--
    }
    return age
  }

  const ageData = getAge(birthday)

  const config = {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }

  const handleToggleButton = () => {
    setEdit(prevState => !prevState)
    reset()
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

  const onSubmit = async (values: InfoFormValues) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/tokens/${currentUser?.id}/line_customers/${userId}`, values, config)
      if (response.status === 200) {
        if(response.data === "success") {
          // ?????????????????????????????????
          getCustomerInfo()
          setEdit(false)
          toast.success("?????????????????????????????????")
        } else {
          // ?????????????????????????????????
          setEdit(false)
          toast.error(response.data)
        }
      } else {
        toast.error("???????????????????????????")
      }
    } catch(err) {
      toast.warn("???????????????????????????")
      console.error(err)
    }
  }

  useEffect(() => {
    getCustomerInfo()
  }, [])

  return (
    <>
      {
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
                title="????????????"
                subheader={edit && "???????????????????????????????????????"}
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
                            <InputLabel>??????</InputLabel>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Controller
                              name="lastName"
                              control={control}
                              defaultValue={customerInfo.lastName}
                              render={({ field: { onChange, value } }) => (
                                <TextField
                                  name="lastName"
                                  label="???"
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
                                  label="???"
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
                            <InputLabel>????????????</InputLabel>
                          </Grid>
                          <Grid item xs={4}>
                            <Controller
                              name="year"
                              control={control}
                              defaultValue={customerInfo.year}
                              render={({ field: { onChange, value } }) => (
                                <TextField
                                  name="year"
                                  label="???"
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
                          <Grid item xs={3}>
                            <Controller
                              name="month"
                              control={control}
                              defaultValue={customerInfo.month}
                              render={({ field: { onChange, value } }) => (
                                <TextField
                                  name="month"
                                  label="???"
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
                          <Grid item xs={3}>
                            <Controller
                              name="day"
                              control={control}
                              defaultValue={customerInfo.day}
                              render={({ field: { onChange, value } }) => (
                                <TextField
                                  name="day"
                                  label="???"
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
                          <Grid item xs={2} className={classes.age}>
                            {isNaN(ageData) ?
                              (`/ ${customerInfo.age}???`)
                            :
                              (`/ ${ageData}???`)
                            }
                          </Grid>
                        </Grid>
                        {/* <Grid item xs={6}>
                          <Controller
                            name="age"
                            control={control}
                            defaultValue={customerInfo.age}
                            render={({ field: { onChange, value } }) => (
                              <TextField
                                name="age"
                                label="??????"
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
                        </Grid> */}
                        <Grid item xs={6}>
                          <Controller
                            name="sex"
                            control={control}
                            defaultValue={customerInfo.sex}
                            render={({ field: { onChange, value } }) => (
                              <TextField
                                name="sex"
                                label="??????"
                                variant="outlined"
                                fullWidth
                                select
                                value={value}
                                onChange={onChange}
                              >
                                <MenuItem value={0}>???</MenuItem>
                                <MenuItem value={1}>???</MenuItem>
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
                                label="??????"
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
                                label="????????????"
                                variant="outlined"
                                helperText="?????????????????????????????????????????????"
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
                                label="?????????????????????"
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
                            ??????
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
                              ??????
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
                              ????????????
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography color="textPrimary">
                              {customerInfo.year}??? {customerInfo.month}??? {customerInfo.day}???
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container item spacing={1}>
                          <Grid item xs={12}>
                            <Typography color="textSecondary">
                              ??????
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
                              ??????
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>
                              {customerInfo.sex === 0 ? "???" : "???"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container item spacing={1}>
                          <Grid item xs={12}>
                            <Typography color="textSecondary">
                              ??????
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
                              ????????????
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
                              ?????????????????????
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
      }
    </>
  )
}

export default Info