import React, { useCallback, useState, useContext } from "react"
import { AuthContext } from "App"
import { TextField, Card, CardContent, CardHeader, Button, Box, IconButton } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const useStyles = makeStyles((theme: Theme) => ({

}))

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const {isSignedIn, currentUser } = useContext(AuthContext)
  const classes = useStyles()




  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>

          </>
        ) : (
          <>
            <h1>トップページ</h1>
            <p>サインインしてください</p>
          </>
        )
      }
    </>
  )
}

export default Home