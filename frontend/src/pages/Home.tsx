import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "App"
import { Container, Box, Grid } from "@material-ui/core"
// import { Theme } from "@material-ui/core/styles"

// import { Helmet } from 'react-helmet';
import BlockCustomers from 'components/dashboard/Block';
import LatestOrders from 'components/dashboard/TopNews';
// import LatestProducts from 'components/dashboard//LatestProducts';
import Sales from 'components/dashboard//Sales';
import TasksProgress from 'components/dashboard/Progress';
import TotalCustomers from 'components/dashboard/Total';
// import TotalProfit from 'components/dashboard//TotalProfit';
// import TrafficByDevice from 'components/dashboard//TrafficByDevice';


import { Follower } from "interfaces/index"
// import Cookies from "js-cookie"
import axios from "axios"

// とりあえず認証済みユーザーの名前やメールアドレスを表示

const Home = () => {
  const {isSignedIn, currentUser } = useContext(AuthContext)
  const [follower, setFollower] = useState<Follower>({
    follow_count: 0,
    gain_follow: 0,
    gain_unfollow: 0,
    pre_follow_count: 0,
    pre_unfollow_count: 0,
    unfollow_count: 0,
    valid_account: 0
  })

  const getFollower = async () => {
    try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${currentUser?.id}/follow_data`)
      setFollower(res.data)
      // console.log(res.data)
    } catch(err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getFollower()
    // const interval = setInterval(()=>{
    //   getFollower()
    // },100000)
    // return() => clearInterval(interval)
  }, [])

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
                    <TotalCustomers followCount={follower.follow_count} gainFollow={follower.gain_follow} />
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    sm={6}
                    xl={4}
                    xs={12}
                  >
                    <BlockCustomers unfollowCount={follower.unfollow_count} gainUnfollow={follower.gain_unfollow} />
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xl={4}
                    xs={12}
                  >
                    <TasksProgress validAccount={follower.valid_account}/>
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