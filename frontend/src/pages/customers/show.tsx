import { useState ,useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from "js-cookie"
import axios from "axios"
import { AuthContext } from "App"
import LineMenu from "components/layouts/LineMenu"
import { UserInfo } from "interfaces/index"
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


const CustomerShow: React.FC = () => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const [ userInfo, setUserInfo ] = useState<UserInfo | undefined>()
  const { id } = useParams<{ id: string }>()

  const config = {
    headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
    }
  }

  const getCustomerDetail = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tokens/${currentUser?.id}/line_customers/${id}`, config)
      setUserInfo(res.data)
    } catch(err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getCustomerDetail()
  }, [])
  
  return (
    <>
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
              <>
                <p>データなし</p>
              </>
            )
          }
        </Container>
      </Box>
    </>
  )
}

export default CustomerShow