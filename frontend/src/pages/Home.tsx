import React, { useCallback, useState, useContext } from "react"
import { AuthContext } from "App"
import { TextField, Card, CardContent, CardHeader, Button, Box, IconButton, Container, Grid } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// import { Helmet } from 'react-helmet';
import Budget from 'components/dashboard/Budget';
import LatestOrders from 'components/dashboard//LatestOrders';
import LatestProducts from 'components/dashboard//LatestProducts';
import Sales from 'components/dashboard//Sales';
import TasksProgress from 'components/dashboard//TasksProgress';
import TotalCustomers from 'components/dashboard//TotalCustomers';
import TotalProfit from 'components/dashboard//TotalProfit';
import TrafficByDevice from 'components/dashboard//TrafficByDevice';

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
            <Box
              sx={{
                // backgroundColor: 'background.default',
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
                    <TotalProfit sx={{ height: '100%' }} />
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
                    <TrafficByDevice sx={{ height: '100%' }} />
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    md={6}
                    xl={3}
                    xs={12}
                  >
                    <LatestProducts sx={{ height: '100%' }} />
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