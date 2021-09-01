import React, { useState, useEffect } from "react"
import moment from 'moment';
// import { v4 as uuid } from 'uuid';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { News, Contents } from "../../interfaces/index"
import { microClient } from "../../lib/api/microClient";

export const LatestOrders = () => {
  const [news, setNews] = useState<News[]>([])

  const getNews = async () => {
    try {
      const data: Contents = await microClient.get({ endpoint: 'news' });
      setNews(data.contents)
    } catch(err) {
      console.error(err.message)
    }
  }
  
  useEffect(() => {
    getNews()
    const interval = setInterval(()=>{
      getNews()
    },10000)
    return() => clearInterval(interval)
  }, [])

  return (
    <>
      <Card>
        <CardHeader title="新着お知らせ" />
        <Divider />
        {/* <PerfectScrollbar> */}
          <Box>
            <Table>
              {/* <TableHead> */}
                {/* <TableRow>
                  <TableCell>
                    Order Ref
                  </TableCell> */}
                  {/* <TableCell>
                    Customer
                  </TableCell> */}
                  {/* <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell> */}
                  {/* <TableCell>
                    Status
                  </TableCell> */}
                {/* </TableRow> */}
              {/* </TableHead> */}
              <TableBody>
                {news.map((news) => (
                  <TableRow
                    hover
                    key={news.id}
                  >
                    <TableCell>
                    {moment(news.publishedAt).format('YYYY/MM/DD')}
                    <br />
                      {news.title}
                    </TableCell>
                    {/* <TableCell> */}
                      {/* {news.body} */}
                    {/* </TableCell> */}
                    {/* <TableCell>
                      {moment(news.publishedAt).format('YYYY/MM/DD')}
                    </TableCell> */}
                    <TableCell>
                      {/* <Chip
                        color="primary"
                        label={news.status}
                        size="small"
                      /> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        {/* </PerfectScrollbar> */}
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
            View all
          </Button>
        </Box>
      </Card>
    </>
  )
};

export default LatestOrders;
