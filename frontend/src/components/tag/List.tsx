import { useState } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Box,
         Button,
         Card,
         Hidden,
         IconButton,
         Table,
         TableHead,
         TableRow,
         TableCell,
         TableBody,
         TextField,
         Typography,
} from "@material-ui/core"
import "react-toastify/dist/ReactToastify.css"
import { Tag } from "../../types/index"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import EditIcon from "@material-ui/icons/Edit"
import CloseIcon from "@material-ui/icons/Close"
import AddIcon from "@material-ui/icons/Add"

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

type TagListProps = {
  tags: Tag[]
  handleEditButton: (groupId: number, groupName: string) => void
  handleDeleteButton: (groupId: number) => void
  group_name: string
  setGroupName: React.Dispatch<React.SetStateAction<string>>
  handleCreatePost: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const List = ({ tags, handleEditButton, handleDeleteButton, group_name, setGroupName, handleCreatePost }: TagListProps) => {
  const classes = useStyles()
  const [state, setState] = useState<boolean>(false)

  const handleToggleButton = () => {
    setState(prevState => !prevState)
  }

  const handleEditing = (editing: boolean) => {
    editing = true;
    return
  }

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
                  <TableCell align='right'>
                    <IconButton onClick={handleToggleButton}>
                    { state ? <CloseIcon /> : <AddIcon /> }
                    </IconButton>
                  </TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
            { state ?
              <TableRow>
                <TableCell style={{ paddingRight: 0,
                paddingTop: 8,
                paddingBottom: 8,
                 }} >
                  <form autoComplete="off" onSubmit={handleCreatePost}>
                    <Box style={{ display: 'flex',
                   justifyContent: 'space-between'}}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        required
                        label="新規タグ名称"
                        value={group_name}
                        margin="dense"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setGroupName(e.target.value)
                        }}
                      />
                    <Button
                      style={{
                        marginTop: "8px",
                        marginBottom: "4px"
                      }}
                      variant="contained"
                      color="primary"
                      type="submit">
                      追加
                    </Button>
                  </Box>
                  </form>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            :
              <></>
            }
            {tags.map((tag: Tag) => (
              <TableRow
                hover
                key={tag.groupId}
              >
                {tag.editing ? (
                  <>
                    <TableCell>
                    <form autoComplete="off" onSubmit={handleCreatePost}>
                    <Box style={{ display: 'flex',
                   justifyContent: 'space-between'}}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        required
                        label="新規タグ名称"
                        value={tag.groupName}
                        margin="dense"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setGroupName(e.target.value)
                        }}
                      />
                    <Button
                      style={{
                        marginTop: "8px",
                        marginBottom: "4px"
                      }}
                      variant="contained"
                      color="primary"
                      type="submit">
                      登録
                    </Button>
                  </Box>
                  </form>
                    </TableCell>
                    <Hidden xsDown>
                      <TableCell>
                        {tag.groupId}
                      </TableCell>
                    </Hidden>
                    <Hidden xsDown>
                      <TableCell align='right'>
                        <IconButton onClick={() => handleEditing(tag.editing)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </Hidden>
                  </>
                ):(
                  <>
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
                        {tag.groupCount}
                      </TableCell>
                    </Hidden>
                    <Hidden xsDown>
                      <TableCell align='right'>
                        {/* <IconButton onClick={() => handleEditButton(tag.groupId, tag.groupName)}> */}
                        <IconButton onClick={() => handleEditing(tag.editing)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteButton(tag.groupId)}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </TableCell>
                    </Hidden>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  )
}

export default List