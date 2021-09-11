import { useState ,useEffect } from "react"
import { CustomersParams } from "interfaces/index"
import { Box,
         Button,
         Card,
         CardContent,
         TextField,
         InputAdornment,
         SvgIcon
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import escapeStringRegexp from "escape-string-regexp"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { postTag } from "lib/api/tag"

const  Post  = ( props: any ) => {
  const { group_name, setGroupName, handleCreatePost } = props;

  return (
    <form autoComplete="off" onSubmit={handleCreatePost}>
      <Card>
        <CardContent
          style={{ display: 'flex',
                   justifyContent: 'space-between'}}
        >
          <Box sx={{ width: '500px', maxWidth: 500 }}>
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
          </Box>
          <Button
            // className={classes.submitBtn}
            variant="contained"
            color="primary"
            type="submit">
            投稿する
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

export default  Post
