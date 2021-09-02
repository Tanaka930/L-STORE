import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { red } from '@material-ui/core/colors';

import React, { useState, useEffect, useContext } from "react"
import { Follower } from "interfaces/index"
import { AuthContext } from "App"
import axios from "axios"

export const BlockCustomers = () => {
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
      <Card
        style={{ height: '100%' }}

      >
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
                ブロックアカウント
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                
                {follower.unfollow_count}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                style={{
                  backgroundColor: red[600],
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
              paddingTop: 16,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ArrowDownwardIcon style={{ color: red[900] }} />
            <Typography
              style={{
                color: red[900],
                marginRight: 8
              }}
              variant="body2"
            >
              {follower.gain_unfollow}
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

export default BlockCustomers;
