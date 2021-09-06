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
import moment from 'moment';


import { Container,
         Box,
         Button,
         Card,
         CardContent,
         CardHeader,
         Divider
        } from "@material-ui/core"

import { AuthContext } from "App"
import { News } from "../interfaces/index"
import { microClient } from "../lib/api/microClient";
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 16
  },
  container: {
    maxHeight: 440,
  },
});

const NewsDetail = ()  => {

  const params = useParams<{ id: string }>();
  const history = useHistory();
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

  const handleClick = () => {
    history.goBack();
  };

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <Box
              sx={{
                minHeight: '100%',
              }}
            >
              <Container maxWidth={false}>
                <Card className={classes.root}>
                  { news !== undefined ? (
                    <>
                      <CardHeader
                        title={news.title}
                        subheader={moment(news.publishedAt).format('YYYY/MM/DD')}
                      >
                      </CardHeader>
                      <Divider />
                      <CardContent>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `${news.body}`
                          }}
                        />
                      </CardContent>
                      <Divider />
                      <CardContent>
                        <div style={{ float: 'right' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            onClick={handleClick}
                          >
                            戻る
                          </Button>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    '記事がありません。'
                    
                  )}
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
}

export default NewsDetail