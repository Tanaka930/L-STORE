import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"

import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"
import { token } from "lib/api/test"
import { TokenParams } from "interfaces/index"

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
  }
}))

// トークン用ページ
const Token: React.FC = () => {
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
              <CardHeader className={classes.header} title="Create Token" />
              <CardContent>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="chanel_id"
                  value={chanel_id}
                  margin="dense"
                  onChange={event => setChanelId(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="chanel_secret"
                  value={chanel_secret}
                  margin="dense"
                  onChange={event => setChanelSecret(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="messaging_token"
                  value={messaging_token}
                  margin="dense"

                  onChange={event => setMessagingToken(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="login_token"
                  value={login_token}
                  margin="dense"

                  onChange={event => setLoginToken(event.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  color="default"
                  disabled={!chanel_id || !chanel_secret || !messaging_token || !login_token}
                  onClick={handleSubmit}
                >
                  Submit
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
      />
    </>
  )
}

export default Token