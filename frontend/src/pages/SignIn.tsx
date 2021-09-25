import React, { useState, useContext } from "react"
import { useHistory, Link } from "react-router-dom"
import Cookies from "js-cookie"
import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"
import { signIn } from "lib/api/auth"
import { SignInParams } from "types/index"
import { Typography, TextField, Card, CardContent, CardHeader, Button, Box } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    fontWeight: "bold"
  },
  header: {
    textAlign: "center",
  },
  card: {
    margin: "0 auto",
    padding: theme.spacing(2),
    maxWidth: 400,
    marginTop: 40
  },
  box: {
    marginTop: "2rem"
  },
  link: {
    color: "#007cff",
    textDecoration: "none"
  }
}))

// サインイン用ページ
const SignIn = () => {
  const classes = useStyles()
  const history = useHistory()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignInParams = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(params)

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        history.push("/")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.error(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <div style={{margin:'0 16px'}}>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="ログイン"/>
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              placeholder="6文字以上で入力してください"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              サインイン
            </Button>
            <Box textAlign="center" className={classes.box}>
              <Typography variant="body2">
                アカウントをお持ちでないですか？ <br />
                <Link to="/signup" className={classes.link}>
                  新規登録
                </Link>
                <br />
                パスワードを忘れた方はこちら <br />
                <Link to="/password" className={classes.link}>
                  再設定
                </Link>
                <div>
                  <a href="https://sites.google.com/openstore-japan.com/l-store--manual/%E3%83%9B%E3%83%BC%E3%83%A0" target="_blank">
                    操作マニュアルについて
                  </a>
                </div>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールアドレスまたはパスワードが異なります。"
        vertical="top"
        horizontal="center"
      />
    </div>
  )
}

export default SignIn