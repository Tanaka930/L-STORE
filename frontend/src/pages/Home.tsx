import React, { useContext } from "react"
import { AuthContext } from "App"
import { Container, Box, Grid } from "@material-ui/core"
// import { Theme } from "@material-ui/core/styles"


// import { Helmet } from 'react-helmet';
import Budget from 'components/dashboard/Budget';
import LatestOrders from 'components/dashboard//LatestOrders';
import LatestProducts from 'components/dashboard//LatestProducts';
import Sales from 'components/dashboard//Sales';
import TasksProgress from 'components/dashboard//TasksProgress';
import TotalCustomers from 'components/dashboard//TotalCustomers';
import TotalProfit from 'components/dashboard//TotalProfit';
import TrafficByDevice from 'components/dashboard//TrafficByDevice';

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const {isSignedIn, currentUser } = useContext(AuthContext)


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
                    <Budget />
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                  >
                    <TotalCustomers />
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                  >
                    <TasksProgress />
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                  >
                    <TotalProfit  />
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