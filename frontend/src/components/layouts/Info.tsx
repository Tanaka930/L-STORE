import { useState, useEffect, useContext } from "react"
import { AuthContext } from "App"
import axios from 'axios'
import Cookies from "js-cookie"
import { Box, Container, Grid, Card, CardContent, CardHeader, TextField, MenuItem, InputLabel, Button, Divider } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

type TabPanelProps = {
  index: number
  value: number
  userId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
)

const Info = (props: TabPanelProps) => {
  const { value, index, userId } = props
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)

  const [lastName, setLastName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [age, setAge] = useState("")
  const [sex, setSex] = useState("")
  const [address, setAddress] = useState("")
  const [tel, setTel] = useState("")
  const [email, setEmail] = useState("")
  const [customerInfo, setCustomerInfo] = useState([])

  const createFormData = (): FormData => {
    const formData = new FormData()
    formData.append("last_name", lastName)
    formData.append("first_name", firstName)
    formData.append("year", year)
    formData.append("month", month)
    formData.append("day", day)
    formData.append("age", age)
    formData.append("sex", sex)
    formData.append("address", address)
    formData.append("tel_num", tel)
    formData.append("mail", email)
    return formData
  }
  
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

  const getCustomerInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tokens/${currentUser?.id}/line_customers/${userId}`, config)
      if (response.status === 200) {
        setCustomerInfo(response.data)
        console.log(response.data)
      }
    } catch(err) {
      console.error(err)
    }
  }
  
  const handleInfoPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = createFormData()
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/tokens/${currentUser?.id}/line_customers/${userId}`, data, config)
      if (response.status === 200) {
        console.log("送信成功")
        console.log(response.data)
      }
    } catch(err) {
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
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleInfoPost}
            >
              <Card>
                <CardHeader
                  title="アカウント情報"
                  subheader="お客様情報を入力することができます"
                />
                <Divider variant="middle" />
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid container item spacing={1}>
                      <Grid item xs={12}>
                        <InputLabel>名前</InputLabel>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          label="姓"
                          variant="outlined"
                          fullWidth
                          value={lastName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setLastName(e.target.value)
                          }}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          label="名"
                          variant="outlined"
                          fullWidth
                          value={firstName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFirstName(e.target.value)
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container item spacing={1}>
                      <Grid item xs={12}>
                        <InputLabel>生年月日</InputLabel>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="年"
                          variant="outlined"
                          fullWidth
                          select
                          value={year}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setYear(e.target.value)
                          }}
                        >
                          { years.map((year, index) => (
                            <MenuItem key={index} value={year}>
                              {year}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="month"
                          label="月"
                          variant="outlined"
                          fullWidth
                          select
                          value={month}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setMonth(e.target.value)
                          }}
                        >
                          { months.map((month, index) => (
                            <MenuItem key={index} value={month}>
                              {month}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="日"
                          variant="outlined"
                          fullWidth
                          select
                          value={day}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setDay(e.target.value)
                          }}
                        >
                          { days.map((day, index) => (
                            <MenuItem key={index} value={day}>
                              {day}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="年齢"
                        variant="outlined"
                        fullWidth
                        select
                        value={age}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setAge(e.target.value)
                        }}
                      >
                        { ages.map((age, index) => (
                          <MenuItem key={index} value={age}>
                            {age}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="性別"
                        variant="outlined"
                        fullWidth
                        select
                        value={sex}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSex(e.target.value)
                        }}
                      >
                        <MenuItem value="men">男</MenuItem>
                        <MenuItem value="women">女</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="住所"
                        variant="outlined"
                        fullWidth
                        value={address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setAddress(e.target.value)
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        label="電話番号"
                        variant="outlined"
                        helperText="ハイフン無しで入力してください"
                        value={tel}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setTel(e.target.value)
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="メールアドレス"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </Grid>
                    <Grid container item xs={12} justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                      >
                        保存
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </form>
          </Container>
        </Box>
      )}
    </>
  )
}

export default Info