import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Box,
         Button,
         ButtonGroup,
         Card,
         ClickAwayListener,
         Grow,
         Hidden,
         IconButton,
         Menu,
         MenuItem,
         MenuList,
         Paper,
         Popper,
         Table,
         TableHead,
         TableRow,
         TableCell,
         TableBody,
         Typography,
} from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Tag } from '../../interfaces/index'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'

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

const ITEM_HEIGHT = 48;

export const List = () => {
  const classes = useStyles()
  const [tags, setTags] = useState<Tag[]>([])
  const [edit, setEdit] = useState(false)
  const [memoId, setMemoId] = useState<number | undefined>()

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

    const handleEditButton = (id: number, groupName: string) => {

    }

    const handleDeleteButton = (groupId: number) => {
      console.log(groupId)
      if (window.confirm("削除してもよろしいでしょうか？")) {
        try {
          axios.delete(`${process.env.REACT_APP_API_URL}/l_groups/${groupId}`, config)
          .then(() => {
            getTags()
            toast.success("削除しました")
          })
          .catch(error => console.error(error))
        } catch(err) {
          console.error(err)
        }
      }
    }

    useEffect(() => {
      getTags()
      }, [])

  console.log(tags)


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



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
            {tags.map((tag) => (
              <TableRow
                hover
                key={tag.groupId}
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
                    {tag.groupId}
                  </TableCell>
                </Hidden>
                <Hidden xsDown>
                  <TableCell align='right'>
                  {/* <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: '8ch',
                        },
                      }}
                    >
                      <MenuItem onClick={() => handleEditButton(tag.groupId, tag.groupName)}>編集</MenuItem>
                      <MenuItem onClick={() => handleDeleteButton(tag.groupId)}>削除</MenuItem>
                    </Menu> */}
                    <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                      <IconButton onClick={() => handleEditButton(tag.groupId, tag.groupName)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteButton(tag.groupId)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </ButtonGroup>
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