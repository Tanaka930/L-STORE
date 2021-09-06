import React, { useContext, useState, useEffect } from "react"
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import { Button,
         Card,
         CardHeader,
         Divider,
         Paper,
         Table,
         TableBody,
         TableCell,
         TableContainer,
         TableHead,
         TableFooter,
         TablePagination,
         TableRow,
         IconButton } from '@material-ui/core';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { Container, Box } from "@material-ui/core"
import { AuthContext } from "App"
import { News, Contents } from "../interfaces/index"
import { microClient } from "../lib/api/microClient";
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';



const NewsIndex = () => {
  const {isSignedIn, currentUser } = useContext(AuthContext)

  const [news, setNews] = useState<News[]>([])

  const getNews = async () => {
    try {
      const data: Contents = await microClient.get({ endpoint: 'news' });
      // if(data.contents.length > 6){
      //     data.contents.pop(); //3件を超えたら配列の先頭の値を削除
      // }
      setNews(data.contents)
      console.log(data.contents)
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

  console.log(news)

  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <Box sx={{ minHeight: '100%' }}>
              <Container maxWidth={false}>
              <Card>
        <CardHeader title="NEWS一覧" />
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
            // size="small"
            variant="text"
            onClick={handleClick}
          >
            戻る
          </Button>
        </Box>
      </Card>
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
    );
};


export default NewsIndex