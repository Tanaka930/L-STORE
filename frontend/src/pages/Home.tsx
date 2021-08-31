import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "App"
import { Container, Box, Grid } from "@material-ui/core"
// import { Theme } from "@material-ui/core/styles"

// import { Helmet } from 'react-helmet';
import BlockCustomers from 'components/dashboard/BlockCustomers';
import LatestOrders from 'components/dashboard//LatestOrders';
import LatestProducts from 'components/dashboard//LatestProducts';
import Sales from 'components/dashboard//Sales';
import TasksProgress from 'components/dashboard//TasksProgress';
import TotalCustomers from 'components/dashboard//TotalCustomers';
import TotalProfit from 'components/dashboard//TotalProfit';
import TrafficByDevice from 'components/dashboard//TrafficByDevice';

import { CustomerList } from "interfaces/index"
// import { Length } from "interfaces/index"
import Cookies from "js-cookie"
import axios from "axios"

// とりあえず認証済みユーザーの名前やメールアドレスを表示
// const Home = () => {
const Home = () => {
  const {isSignedIn, currentUser } = useContext(AuthContext)
  const [customers, setCustomers] = useState<CustomerList[]>([])
  const config = {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }

  //   const getCustomers = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_API_URL}/tokens/${currentUser?.id}/line_customers`, config)
  //     console.log(res.data)
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

  const [total, setTotal] = useState()
  const [blockTotal, setblockTotal] = useState()

customers.forEach(customer => {
  console.log(customer)
})

  // const animalsList3 = customers.slice(blockflg.value == 1);
  // console.log(animalsList3)
  // const blockTotal = customers.blockflg == 0

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <Box
              style={{backgroundColor:'background.default'}}
              sx={{
                minHeight: '100%',
                py: 3
              }}
            >
              <Container maxWidth={false}>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                  >
                    {/* <TotalCustomers total={customers.length} /> */}
                    <TotalCustomers total={1280} />
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                  >
                    {/* <BlockCustomers total={customers.length} /> */}
                    <BlockCustomers total={54} />
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                  >
                    <TasksProgress total={1226}/>
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                  >
                    {/* <LatestOrders /> */}
                    <TotalProfit />
                  </Grid>
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
                    md={6}
                    xl={3}
                    xs={12}
                  >
                    <TrafficByDevice  />
                  </Grid>
                  <Grid
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
                  >
                    <LatestOrders />
                  </Grid>
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