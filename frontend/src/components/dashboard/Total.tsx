import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

import React, { useState, useEffect, useContext } from "react"
import { Follower } from "interfaces/index"
import { AuthContext } from "App"
import axios from "axios"

export const TotalCustomers = () => {

  const { currentUser } = useContext(AuthContext)
  const [follower, setFollower] = useState<any>([])

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
    const interval = setInterval(()=>{
      getFollower()
    },100000)
    return() => clearInterval(interval)
  }, [])

  return (
    <>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
            style={{ justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                お友達アカウント
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {follower.follow_count}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                style={{
                  backgroundColor: '#06c755',
                  height: 56,
                  width: 56
                }}
              >
                <PeopleIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            style={{
              alignItems: 'center',
              display: 'flex',
              paddingTop: 16
            }}
          >
            <ArrowUpwardIcon style={{ color: green[900] }} />
            <Typography
              variant="body2"
              style={{
                color: green[900],
                marginRight: 8
              }}
            >
              {follower.gain_follow}
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
            >
              Since last day
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  )
};

export default TotalCustomers;
