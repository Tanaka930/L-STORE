import React, { useContext, useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import Cookies from "js-cookie"
import axios from "axios"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Box, Button, Card, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Typography, Hidden } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiAvatar-root': {
        marginRight: 16
      },
      '& .MuiTableRow-root': {
        cursor: "pointer"
      }
    }
  })
)

export const List = () => {
  const [tags, setTags] = useState<any[]>([])

  const config = {
    headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
    }
  }

  const getTags = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/l_groups`, config)
      setTags(res.data.groupNameList)
      console.log(res.data.groupNameList)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getTags()
    // const interval = setInterval(()=>{
    // getTags()
    // },1000)
    // return() => clearInterval(interval)
    }, [])

  
  console.log(tags)

  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Box>
        <Table>
          <TableHead>
              <TableRow>
                <TableCell>
                  タグ名
                </TableCell>
                <Hidden xsDown>
                  <TableCell>
                    アカウント数
                  </TableCell>
                </Hidden>
                <Hidden xsDown>
                  <TableCell>
                  </TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
            {tags.map((tag: any) => (
              <TableRow
                hover
                key={tag.id}
              >
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <Typography
                      color="textPrimary"
                      variant="body1"
                    >
                      {tag.groupName}
                    </Typography>
                  </Box>
                </TableCell>
                <Hidden xsDown>
                  <TableCell>
                    33
                    {/* {customer.full_name} */}
                  </TableCell>
                </Hidden>
                <Hidden xsDown>
                  <TableCell align='right'>
                    <Button
                      // onClick={edit}
                      variant="contained"
                      color="secondary"
                      type="submit">
                      edit
                    </Button>
                  </TableCell>
                </Hidden>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  )
}

export default List