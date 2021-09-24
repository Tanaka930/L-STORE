import React, { useState, useContext } from "react"
import { useHistory, Link } from "react-router-dom"
import Cookies from "js-cookie"
import { AuthContext } from "App"
import { signOut } from "lib/api/auth"
import { AppBar, Toolbar, Typography, Button, IconButton, Hidden } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { makeStyles, Theme } from "@material-ui/core/styles"
import SideBar from "./SideBar"

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
    fontWeight: "bold"
  },
  linkBtn: {
    textTransform: "none"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  }
}))

const Header = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles()
  const history = useHistory()
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  const handleSidebarToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  const handleSidebarClose = () => {
    setMobileOpen(false)
  }

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        history.push("/signin")
      } else {
        console.error("Failed in sign out")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <Hidden mdDown>
            <Button
              color="inherit"
              className={classes.linkBtn}
              onClick={handleSignOut}
            >
              ログアウト
            </Button>
          </Hidden>
        )
      } else {
        return (
          <>
            <Button
              component={Link}
              to="/signin"
              color="inherit"
              className={classes.linkBtn}
            >
              ログイン
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="inherit"
              className={classes.linkBtn}
            >
              新規登録
            </Button>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h4"
            className={classes.title}
          >
            L-STORE
          </Typography>
          <AuthButtons />
          <Hidden lgUp>
            {isSignedIn &&
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleSidebarToggle}
              >
                <MenuIcon />
              </IconButton>
            }
          </Hidden>
        </Toolbar>
      </AppBar>
      { isSignedIn &&
        <SideBar
          isOpen={mobileOpen}
          handleSidebarToggle={handleSidebarToggle}
          handleSidebarClose={handleSidebarClose}
        />
      }
    </>
  )
}

export default Header