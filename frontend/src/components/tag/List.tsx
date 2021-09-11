import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Box,
        //  Button,
        //  ButtonGroup,
         Card,
        //  ClickAwayListener,
        //  Grow,
         Hidden,
         IconButton,
        //  Menu,
        //  MenuItem,
        //  MenuList,
        //  Paper,
        //  Popper,
         Table,
         TableHead,
         TableRow,
         TableCell,
         TableBody,
         Typography,
} from "@material-ui/core"
// import MoreVertIcon from '@material-ui/icons/MoreVert';

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

// const ITEM_HEIGHT = 48;

export const List = (props: any) => {
  const { tags, handleEditButton, handleDeleteButton } = props;
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
            {tags.map((tag: Tag) => (
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
                      <IconButton onClick={() => handleEditButton(tag.groupId, tag.groupName)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteButton(tag.groupId)}>
                        <DeleteForeverIcon />
                      </IconButton>
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