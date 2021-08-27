import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import AlertMessage from "components/utils/AlertMessage"
import { passReset } from "lib/api/auth"
import { PassResetParams } from "interfaces/index"
import {  TextField, Card, CardContent, CardHeader, Button, Box } from "@material-ui/core"
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
  },
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))

// サインイン用ページ
const PassReset: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const [email, setEmail] = useState<string>("")
  const [redirect, setRedirect] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)




  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // メールのリンクを踏んだ後のリダイレクト先を指定
    const location = "http://localhost:3000/password_reset_post";

    // パラメータ定義
    const params: PassResetParams = {
      email: email,
      redirect_url: location
    }

    try {
      const res = await passReset(params)
      console.log(res)

      if (res.status === 200) {

        history.push("/")

      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      // 例外処理
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="パスワード再設定" />
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
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              送信
            </Button>
          </CardContent>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="このメールアドレスは登録されておりません"
      />
    </>
  )
}

export default PassReset