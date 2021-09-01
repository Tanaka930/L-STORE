import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "App"
import { Container, Box, Grid } from "@material-ui/core"
// import { Theme } from "@material-ui/core/styles"

// import { Helmet } from 'react-helmet';
import BlockCustomers from 'components/dashboard/BlockCustomers';
import LatestOrders from 'components/dashboard//LatestOrders';
// import LatestProducts from 'components/dashboard//LatestProducts';
import Sales from 'components/dashboard//Sales';
import TasksProgress from 'components/dashboard//TasksProgress';
import TotalCustomers from 'components/dashboard//TotalCustomers';
// import TotalProfit from 'components/dashboard//TotalProfit';
// import TrafficByDevice from 'components/dashboard//TrafficByDevice';


import { CustomerList, FriendList } from "interfaces/index"
import Cookies from "js-cookie"
import axios from "axios"

// とりあえず認証済みユーザーの名前やメールアドレスを表示

const Home = () => {
  // const [customers, setCustomers] = useState<CustomerList[]>([])
  const {isSignedIn, currentUser } = useContext(AuthContext)
  // const config = {
  //   headers: {
  //     "access-token": Cookies.get("_access_token"),
  //     "client": Cookies.get("_client"),
  //     "uid": Cookies.get("_uid")
  //   }
  // }

  //   const getCustomers = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_API_URL}/tokens/${currentUser?.id}/line_customers`, config)
  //     // console.log(res.data)
  //     setCustomers(res.data)
  //   } catch(err) {
  //     console.error(err.message)
  //   }
  // }

  // useEffect(() => {
  //   getCustomers()
  //   const interval = setInterval(()=>{
  //     getCustomers()
  //   },100000)
  //   return() => clearInterval(interval)
  // }, [])


  // const [friends, setFriends] = useState<FriendList[]>([])

  // const getFriends = async () => {
  //   try {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${currentUser?.id}`)
  //     setFriends(res.data)
  //     // console.log(res.data.datasets[0].data)
  //   } catch(err) {
  //     console.error(err.message)
  //   }
  // }

  // useEffect(() => {
  //   getFriends()
  //   const interval = setInterval(()=>{
  //     getFriends()
  //   },100000)
  //   return() => clearInterval(interval)
  // }, [])

  // // // friends.index.map(item => (
  //   console.log(friends)
  // ))

  // const animalsList3 = customers.slice(blockflg.value == 1);
  // console.log(animalsList3)
  // const blockTotal = customers.blockflg == 0

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>

            <Box
              style={{
                backgroundColor:'background.default',
              }}
              sx={{
                minHeight: '100%',
              }}
            >
              <Container maxWidth={false}>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    lg={4}
                    sm={6}
                    xl={4}
                    xs={12}
                  >
                    {/* <TotalCustomers total={customers.length} /> */}
                    <TotalCustomers total={1280} />
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    sm={6}
                    xl={4}
                    xs={12}
                  >
                    {/* <BlockCustomers total={customers.length} /> */}
                    <BlockCustomers total={54} />
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xl={4}
                    xs={12}
                  >
                    <TasksProgress total={75.5}/>
                  </Grid>
                  {/* <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                  > */}
                    {/* <LatestOrders /> */}
                    {/* <TotalProfit />
                  </Grid> */}
                  <Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                  >
                    <Sales />
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    md={12}
                    xl={3}
                    xs={12}
                  >
                    <LatestOrders />
                    {/* <TrafficByDevice  /> */}
                  </Grid>
                  {/* <Grid
                    item
                    lg={4}
                    md={6}
                    xl={3}
                    xs={12}
                  >
                    <LatestProducts  />
                  </Grid>
                  <Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                  > */}
                    {/* <LatestOrders /> */}
                  {/* </Grid> */}
                </Grid>
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
  )
}

export default Home