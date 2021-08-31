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
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "App"
import axios from "axios"

type FriendList = {
  data: { labels: string[]
          datasets: { label: string; data: number[]; backgroundColor: string[]; borderColor: string[]; borderWidth: number; }[];
        }
}

export const Sales = () => {
  const theme = useTheme();
  const [friends, setFriends] = useState<FriendList[]>([])
  const { currentUser } = useContext(AuthContext)

  const getFriends = async () => {
    try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${currentUser?.id}`)
      console.log(res.data)
      setFriends(res.data)
    } catch(err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getFriends()
    const interval = setInterval(()=>{
      getFriends()
    },10000)
    return() => clearInterval(interval)
  }, [])

  // const data: {
  //   datasets: [
  //     {
  //       backgroundColor: colors.lightGreen[100],
  //       data: [100, 105, 111, 130, 135, 140, 144],
  //       label: '登録者数'
  //     },
  //     {
  //       backgroundColor: colors.grey[200],
  //       data: [11, 15, 20, 29, 30, 44, 44],
  //       label: 'ブロックアカウント数'
  //     }
  //   ],
  //   labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug']
  // };

  // console.log(friends)

  const options = {
    animation: true,
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
      <Card>
        <CardHeader
          action={(
            <Button
              endIcon={<ArrowDropDownIcon />}
              size="small"
              variant="text"
            >
              Last 7 days
            </Button>
          )}
          title="Latest Sales"
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 400,
              position: 'relative'
            }}
          >
            <Line
              data={friends}
              options={options}
            />
          </Box>
        </CardContent>
        <Divider />
        <Box
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
        </Box>
      </Card>
    </>
  );
};

export default Sales;
