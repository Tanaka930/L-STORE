import { useState ,useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "App"
import { getCustomerDetail } from "lib/api/customer"
import LineMenu from "components/layouts/LineMenu"
import { UserInfo } from "types/index"
import { Box, Avatar, Container, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  account: {
    display: "flex",
    textAlign: "center",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  name: {
    marginLeft: 30,
    fontSize: 30,
  }
}))

const CustomerShow = () => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const [ userInfo, setUserInfo ] = useState<UserInfo | undefined>()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    getCustomerDetail( setUserInfo, currentUser, id )
  }, [])
  
  return (
    <Box sx={{ minHeight: '100%' }}>
      <Container maxWidth={false}>
        {
          userInfo ? (
            <>
              <Box className={classes.account}>
                <Avatar src={userInfo.image} className={classes.large}/>
                <p className={classes.name}>{userInfo.name}</p>
              </Box>
              <LineMenu />
            </>
          ) : (
            <p>データなし</p>
          )
        }
      </Container>
    </Box>
  )
}

export default CustomerShow