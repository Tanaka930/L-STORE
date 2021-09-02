import { Line } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import React, { useState, useEffect, useContext } from "react"
import { FriendList } from "interfaces/index"
import { AuthContext } from "App"
import axios from "axios"


export const Sales = () => {
  // const { data } = props;
  const theme = useTheme();
  const { currentUser } = useContext(AuthContext)
  const [friends, setFriends] = useState<FriendList[]>([])


  const getFriends = async () => {
    try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${currentUser?.id}`)
      setFriends(res.data)
    } catch(err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getFriends()
    const interval = setInterval(()=>{
      getFriends()
    },100000)
    return() => clearInterval(interval)
  }, [])

  // console.log(friends)

  const [button, setButton] = useState(0)

  const chartChange = () => {

  }

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <>
      <Card style={{height: '100%'}}>
        <CardHeader
          action={(
            <Button
              onClick={chartChange}
              endIcon={<ArrowDropDownIcon />}
              size="small"
              color="primary"
              variant="text"
            >
              Last 7 days
              {/* Last 7 weeks */}
            </Button>
          )}
          title="Customers Transition"
        />
        <Divider />
        <CardContent >
          <Box
            sx={{
              height: 450,
              position: 'relative'
            }}
          >
            <Line
              data={friends}
              options={options}
            />
          </Box>
        </CardContent>
        {/* <Divider /> */}
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 16
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            Overview
          </Button>
        </Box> */}
      </Card>
    </>
  );
};

export default Sales;
