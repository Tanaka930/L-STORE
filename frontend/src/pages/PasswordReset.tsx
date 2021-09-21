import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import AlertMessage from "components/utils/AlertMessage"
import { passReset } from "lib/api/auth"
import { PassResetParams } from "types/index"
import {  TextField, Card, CardContent, CardHeader, Button } from "@material-ui/core"
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

// パスワード再設定用ページ
const PassReset = () => {
  const classes = useStyles()
  const history = useHistory()
  const [email, setEmail] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // メールのリンクを踏んだ後のリダイレクト先を指定
    const redirectUrl = window.location.hostname;

    // パラメータ定義
    const params: PassResetParams = {
      email: email,
      redirect_url: redirectUrl
    }

    try {
      const res = await passReset(params)

      if (res.status === 200) {

        alert("入力されたメールアドレスにパスワード再設定のご案内をお送りいたしました。")

        history.push("/")

      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      // 例外処理
      console.error(err)
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
        vertical="top"
        horizontal="center"
      />
    </>
  )
}

export default PassReset