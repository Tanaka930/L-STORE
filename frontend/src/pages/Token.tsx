import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"
import { token } from "lib/api/test"
import { TokenParams } from "interfaces/index"
import { TextField, Card, CardContent, CardHeader, Button } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"


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
    margin: "0 auto",
    padding: theme.spacing(2),
    maxWidth: 400,
    marginTop: 40
  }
}))

// トークン用ページ
const Token = () => {
  const classes = useStyles()
  const histroy = useHistory()

  const { isSignedIn, currentUser } = useContext(AuthContext)

  const [chanel_id, setChanelId] = useState<string>("")
  const [chanel_secret, setChanelSecret] = useState<string>("")
  const [messaging_token, setMessagingToken] = useState<string>("")
  const [login_token, setLoginToken] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: TokenParams = {
      chanel_id: chanel_id,
      chanel_secret: chanel_secret,
      messaging_token: messaging_token,
      login_token: login_token
    }

    try {
      const res = await token(params)
      console.log(res)

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        // Cookies.set("_access_token", res.headers["access-token"])
        // Cookies.set("_client", res.headers["client"])
        // Cookies.set("_uid", res.headers["uid"])

        // setIsSignedIn(true)
        // setCurrentUser(res.data.data)


        histroy.push("/")

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <form noValidate autoComplete="off">
            <Card className={classes.card}>
              <CardHeader className={classes.header} title="トークン登録" />
              <CardContent>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="チャネルID"
                  value={chanel_id}
                  margin="dense"
                  onChange={event => setChanelId(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="チャネルシークレット"
                  value={chanel_secret}
                  margin="dense"
                  onChange={event => setChanelSecret(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="チャネルアクセストークン"
                  value={messaging_token}
                  margin="dense"

                  onChange={event => setMessagingToken(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="ログイントークン"
                  value={login_token}
                  margin="dense"

                  onChange={event => setLoginToken(event.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  color="primary"
                  className={classes.submitBtn}
                  disabled={!chanel_id || !chanel_secret || !messaging_token || !login_token}
                  onClick={handleSubmit}
                >
                  登録
                </Button>
              </CardContent>
            </Card>
          </form>
        ) : (
          <h1>Not signed in</h1>
        )
      }
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid id or tokens"
        vertical="top"
        horizontal="center"
      />
    </>
  )
}

export default Token