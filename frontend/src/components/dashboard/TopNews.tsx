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
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  // tdLink: {
  //   display: 'block',
  //   width: '100%',
  // },
  container: {
    maxHeight: 440,
  },
});


export const TopNews = () => {

  const [news, setNews] = useState<News[]>([])
  const classes = useStyles();

  const getNews = async () => {
    try {
      const data: Contents = await microClient.get({ endpoint: 'news' });
      // if(data.contents.length > 6){
      //     data.contents.pop(); //3件を超えたら配列の先頭の値を削除
      // }
        console.log(data)

      const topNews = data.contents.slice(0, 6)
      setNews(topNews)
      // console.log(topNews)
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

  const history = useHistory();

  const handleClick = () => {
    history.push('/news');
  };

  return (
    <>
      <Card>
        <CardHeader title="NEWS" />
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
                      <Link to={`/news/${news.id}`} >
                        <TableCell style={{display: 'block', width: '100%'}}>
                          {moment(news.publishedAt).format('YYYY/MM/DD')}
                          <br />
                          {news.title}
                        </TableCell>
                      </Link>
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
            onClick={handleClick}
          >
            View all
          </Button>
        </Box>
      </Card>
    </>
  )
};

export default TopNews;
