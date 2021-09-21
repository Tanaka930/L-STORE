import React, { useState } from "react"
import { useHistory , useLocation} from "react-router-dom"
import AlertMessage from "components/utils/AlertMessage"
import { PassResetPostParams } from "types/index"
import {  TextField, Card, CardContent, CardHeader, Button } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"

import client from "lib/api/client"


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




// パスワード再設定登録用ページ
const PassResetPost = () => {
  const classes = useStyles()
  const history = useHistory()
  const searchResult = useLocation()
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // urlに付与されたパラメータを取得
    const query = new URLSearchParams(searchResult.search);

    // url情報からaccess-tokenとclientとuidを取得しheaderに追加
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'access-token': query.get('access-token'),
        'client': query.get('client'),
        'uid': query.get('uid'),
      }
    }

    // FormData形式でフォームデータを取得
    const createFormData = (): FormData => {
      const formData = new FormData()
      formData.append("password", password)
      formData.append("passwordConfirmation", passwordConfirmation)
      return formData
    }

    try {
      const res = await client.patch("auth/password", createFormData(), config)

      if (res.status === 200) {

        alert("パスワードの再設定が完了いたしました。ログイン画面からログインしてください。")

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
          <CardHeader className={classes.header} title="新しいパスワードを入力してください" />
          <CardContent>
          <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード(確認用)"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
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

export default PassResetPost