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
import { Tag } from "../../types/index"

import CloseIcon from "@material-ui/icons/Close"
import AddIcon from "@material-ui/icons/Add"
import ReplayIcon from '@material-ui/icons/Replay';
import MoreMenu from "components/parts/MoreMenu"

import axios from "axios"
import Cookies from "js-cookie"

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
  handleDeleteButton: (groupId: number) => void
  group_name: string
  patch_name: string
  setGroupName: React.Dispatch<React.SetStateAction<string>>
  setPatchName: React.Dispatch<React.SetStateAction<string>>
  handleCreatePost: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  getTags: any
}

const List = ({ tags, handleDeleteButton, group_name, patch_name, setGroupName, setPatchName, handleCreatePost, getTags }: TagListProps) => {
  const classes = useStyles()
  const [state, setState] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean[]>([false]);

  const handleToggleButton = () => {
    setState(prevState => !prevState)
  }

  const handleEditing = (i: number) => {
    const newEdit = isEdit.slice();
    newEdit[i] = !newEdit[i];
    setIsEdit(newEdit);
    // getTags()
  }

  const handleEditButton = (groupId: number, patch_name: string, i: number ) => {
    try {
      // console.log(group_name)
      const config = {
        headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
        }
      }

      const value = {group_name: patch_name}
      axios.put(`${process.env.REACT_APP_API_URL}/l_groups/${groupId}`, value, config)
      .then(() => {
        getTags()
        handleEditing(i)
        console.log('ok')
      })
      .catch(error => console.error(error))
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <Card className={classes.root}>
      <Box>
        <Table>
          <TableHead>
              <TableRow>
                <TableCell>
                  <h3>タグ名</h3>
                </TableCell>
                <Hidden xsDown>
                  <TableCell>
                    アカウント数
                  </TableCell>
                </Hidden>
                <TableCell align='right'>
                  <IconButton onClick={handleToggleButton}>
                  { state ? <CloseIcon /> : <AddIcon /> }
                  </IconButton>
                </TableCell>
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
                        label="Tag Name"
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
                <Hidden xsDown>
                  <TableCell></TableCell>
                </Hidden>
                <TableCell></TableCell>
              </TableRow>
            :
              <></>
            }
            {tags.map((tag: Tag, index) => (
              <TableRow
                hover
                key={index}
              >
                {isEdit[index] ? (
                  <>
                    <TableCell>
                      {/* <form autoComplete="off"> */}
                        <Box style={{ display: 'flex',
                        justifyContent: 'space-between'}}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            required
                            label="Tag Name"
                            defaultValue={tag.groupName}
                            margin="dense"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setPatchName(e.target.value)
                            }}
                          />
                          <Button
                            style={{
                            marginTop: "8px",
                            marginBottom: "4px"
                            }}
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!patch_name}
                            onClick={() => handleEditButton(tag.groupId, patch_name, index)}
                            >
                            更新
                          </Button>
                        </Box>
                      {/* </form> */}
                    </TableCell>
                    <Hidden xsDown>
                      <TableCell>
                        {tag.groupCount}
                      </TableCell>
                    </Hidden>
                    <TableCell align='right'>
                      <IconButton onClick={() => handleEditing(index)}>
                        <ReplayIcon />
                      </IconButton>
                    </TableCell>
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
                    <TableCell align='right'>
                      <MoreMenu
                        handleEditButton={handleEditButton}
                        index={index}
                        handleEditing={handleEditing}
                        handleDeleteButton={handleDeleteButton}
                        groupId={tag.groupId}
                      />
                    </TableCell>
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