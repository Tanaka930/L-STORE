import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import moment from "moment"
import { microClient } from "../../lib/api/microClient"
import { Box, Button, Card, CardHeader, Divider, Table, TableBody, TableCell, TableRow,} from "@material-ui/core"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"
import { News, Contents } from "../../types/index"
// import { v4 as uuid } from "uuid"
// import PerfectScrollbar from "react-perfect-scrollbar"

export const TopNews = () => {
  const [news, setNews] = useState<News[]>([])

  const history = useHistory()

  const handleClick = () => {
    history.push('/news')
  }

  const handleLinkClick = (id: string) => {
    history.push("/news/" + id)
  }

  const getNews = async () => {
    try {
      const data: Contents = await microClient.get({ endpoint: 'news' })
      // if(data.contents.length > 6){
      //     data.contents.pop(); //3件を超えたら配列の先頭の値を削除
      // }
      const topNews = data.contents.slice(0, 6)
      setNews(topNews)
      // console.log(topNews)
    } catch(err) {
      console.error(err)
    }
  }
  
  useEffect(() => {
    getNews()
  }, [])

  return (
    <Card>
      <CardHeader title="NEWS" />
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
  )
}

export default TopNews
