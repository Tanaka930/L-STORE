import { Line } from 'react-chartjs-2';

import {
  Box,
  // Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  // colors,
  Select,
  MenuItem 
} from '@material-ui/core';

import React, { useState, useEffect, useContext } from "react"
import { Chart } from "interfaces/index"
import { AuthContext } from "App"
import axios from "axios"
import Cookies from "js-cookie"

export const Sales = () => {
  // const { data } = props;
  const theme = useTheme();
  const { currentUser } = useContext(AuthContext)
  const [chart, setChart] = useState<Chart>()

  const config = {
    headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
    }
  }


  const getChart = async () => {
    try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${currentUser?.id}/last_seven_day`, config)
      setChart(res.data)
    } catch(err) {
      console.error(err)
    }
  }


  useEffect(() => {
    getChart()
    // getWeek()
    // const interval = setInterval(()=>{
    //   getFriends()
    // },100000)
    // return() => clearInterval(interval)
  }, [])

  // console.log(chart)

  // const [weekChart, setWeekChart] = useState<Chart>()


  const getWeek = async () => {
    try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${currentUser?.id}/last_seven_week`, config)
      setChart(res.data)
    } catch(err) {
      console.error(err)
    }
  }

  const chartChange = (e: any) => {
    console.log(e.target.value)
    if (e.target.value === 1) { return getChart() }
    if (e.target.value === 2) { return getWeek() }
    // e.target.value == 2 ? getWeek() : getChart()
  }

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
      <Card style={{height: '100%'}}>
        <CardHeader
          action={(
            <Select
              defaultValue={1}
              color="primary"
              disableUnderline
              onChange={(e) => { chartChange(e) }}
            >
              <MenuItem value={1}>Last 7 days</MenuItem>
              <MenuItem value={2}>Last week</MenuItem>
              <MenuItem value={3}>Last month</MenuItem>
            </Select>
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
              data={chart}
              options={options}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Sales;
