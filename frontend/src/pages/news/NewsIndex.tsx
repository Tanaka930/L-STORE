import React, { useContext, useState, useEffect } from "react"
// import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import { Button,
         Card,
         CardHeader,
         Divider,

         Table,
         TableBody,
         TableCell,
         TableRow,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// import Pagination from '@material-ui/lab/Pagination';

import { Container, Box } from "@material-ui/core"
import { AuthContext } from "App"
import { News, Contents } from "../../interfaces/index"
import { microClient } from "../../lib/api/microClient";
import { useHistory } from 'react-router-dom';
import moment from 'moment';


export const fetchAllPosts = () => {
  microClient.get({ endpoint: 'news', })
  .then((res) => console.log(res));

  // console.log(data)


  // if (data.contents) {
  //   const news = data.contents
  //   return news
  // } else {
  //   return
  // }
}


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
      // console.log(data.contents)
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
  

  // console.log(news)

  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  const handleLinkClick = (id: string) => {
    history.push("/news/" + id)
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  //ページ番号

  // const [page, setPage] = useState(1); //ページ番号
  // const [pageCount, setPageCount] = useState(); //ページ数
  // const [allItems, setAllItems] = useState([]); //全データ
  // const [displayedItems, setDisplayedItems] = useState([]); //表示データ
  // const displayNum = 3; //1ページあたりの項目数

  // useEffect(() => {
  //   setAllItems(news);
  //   //ページカウントの計算（今回は3項目/ページなので4ページ）
  //   setPageCount(Math.ceil(news.length/displayNum));
  //   //表示データを抽出
  //   setDisplayedItems(news.slice(((page - 1) * displayNum), page * displayNum))
  // }, [])

  // const handleChange = (event, index) => {
  //   //ページ移動時にページ番号を更新
  //   setPage(index);
  //   //ページ移動時に表示データを書き換える
  //   setDisplayedItems(allItems.slice(((index - 1) * displayNum), index * displayNum))
  // }

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
                    <Box>
                      <Table>
                        <TableBody>
                          {news.map((news) => (
                            <TableRow
                              hover
                              key={news.id}
                            >
                              <TableCell 
                                style={{display: 'block', width: '100%'}}
                                onClick={() => handleLinkClick(news.id)}
                              >
                                {moment(news.publishedAt).format('YYYY/MM/DD')}
                                <br />
                                {news.title}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  {/* <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                padding: 16
                                }}> */}
                    {/* <Pagination 
                      count={10}          //総ページ数
                      color="primary"     //ページネーションの色
                      onChange={(e, page) =>setPage(page)}  //変更されたときに走る関数。第2引数にページ番号が入る
                      page={page}         //現在のページ番号
                    /> */}
                  {/* </div>
                  <Divider /> */}
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