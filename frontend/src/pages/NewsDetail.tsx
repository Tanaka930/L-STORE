import React, { useContext, useState, useEffect } from "react"
// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { Container, Box } from "@material-ui/core"
import { AuthContext } from "App"
import { News } from "../interfaces/index"
import { microClient } from "../lib/api/microClient";
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const NewsDetail = ()  => {

  const params = useParams<{ id: string }>();

  const {isSignedIn, currentUser } = useContext(AuthContext)
  const [news, setNews] = useState<News>()
  const classes = useStyles();

  console.log(params.id)

  const getNews = async () => {
    try {
      const data: News = await microClient.get({ endpoint: 'news',contentId: `${params.id}`, });

        console.log(data)
        setNews(data)
      // console.log(topNews)
    } catch(err) {
      console.error(err.message)
    }
  }
  
  useEffect(() => {
    getNews()
    // const interval = setInterval(()=>{
    //   getNews()
    // },10000)
    // return() => clearInterval(interval)
  }, [])

  if (news !== undefined) {
    console.log(news)
  }

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <Box
              // style={{
              //   backgroundColor:'background.default',
              // }}
              sx={{
                minHeight: '100%',
              }}
            >
              <Container maxWidth={false}>
                <Paper className={classes.root}>

                  { news !== undefined ?
                    (news.title) : ('ハズレ')}
                </Paper>
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
}

export default NewsDetail