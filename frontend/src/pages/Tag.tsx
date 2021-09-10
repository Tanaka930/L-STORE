import React, { useContext, useState, useEffect } from "react"
// import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import { Button,
         Box,
         Container,
         Card,
         CardHeader,
         Divider,

         Table,
         TableBody,
         TableCell,
         TableRow,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import  Post from "components/tag/Post"
import TagList from "components/tag/List"
import axios from "axios"
import Cookies from "js-cookie"
import { CustomersParams } from "interfaces/index"
import { AuthContext } from "App"

const Tag = () => {
  const {isSignedIn, currentUser } = useContext(AuthContext)
  const [customers, setCustomers] = useState<CustomersParams[]>([])

  const config = {
    headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
    }
  }

  const getCustomers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/l_groups`, config)
      setCustomers(res.data)
      console.log(res.data)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getCustomers()
    // const interval = setInterval(()=>{
    //   getCustomers()
    // },10000)
    // return() => clearInterval(interval)
  }, [])

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <Box sx={{ minHeight: '100%' }}>
              <Container maxWidth={false}>
                <Post customers={customers} />
                <Box sx={{ pt: 3 }}>
                  <TagList customers={customers} />
                </Box>
              </Container>
            </Box>
          </>
        ) : (
          <>
            <h1>トップページ</h1>
            <p>サインインしてください</p>
          </>
        )
      }
    </>
  );
};


export default Tag