import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import { getCurrentUser } from "lib/api/auth"
import { User } from "interfaces/index"
import theme from "./theme"
import { ThemeProvider } from '@material-ui/core'
import 'react-perfect-scrollbar/dist/css/styles.css';

// import { alpha } from '@material-ui/core/styles';


// import { spacing } from '@material-ui/system'

import GlobalStyles from 'components/GlobalStyles';
import CommonLayout from "components/layouts/CommonLayout"
import Home from "pages/Home"
import SignUp from "pages/SignUp"
import SignIn from "pages/SignIn"
import Token from "pages/Token"
import Message from "pages/Message"
import CustomerIndex from "pages/customers"
import CustomerDetail from "pages/customers/CustomerDetail"
import PasswordReset from "pages/PasswordReset"
import PasswordResetPost from "pages/PasswordResetPost"
import NotFound from "pages/404"
import CheckOut from "pages/CheckOut"
import NewsIndex from "pages/NewsIndex"
import NewsDetail from "pages/NewsDetail"

// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])


  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Redirect to="/signin" />
      }
    } else {
      return <></>
    }
  }

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <CommonLayout>
            <Switch>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/password" component={PasswordReset} />
              <Route exact path="/reset_password_post" component={PasswordResetPost} />
              <Private>
                <>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/tokens" component={Token} />
                  <Route exact path="/message" component={Message} />
                  <Route exact path="/customers" component={CustomerIndex} />
                  <Route exact path="/customers/:id" component={CustomerDetail} />
                  <Route exact path="/checkout" component={CheckOut} />
                  <Route exact path="/news" component={NewsIndex} />
                  <Route exact path="/news/:id" component={NewsDetail} />
                </>
              </Private>
              <Route component={NotFound} />
            </Switch>
          </CommonLayout>
        </ThemeProvider>
      </AuthContext.Provider>
    </Router>
  )
}

export default App