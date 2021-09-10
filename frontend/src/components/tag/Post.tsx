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

const  Post  = () => {
  const [group_name, setGroupName] = useState<string>("")

  console.log(group_name)

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append("group_name", group_name)

    return formData
  }

  const handleCreatePost  = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try { 
      const data = createFormData()
      const res = await postTag(data)
      console.log(res)
      if(res.status === 200){
        toast.success("送信されました")
        console.log("ok")
        // おそらくここにリダイレクト処理などを記述する
      } else {
        toast.error("送信に失敗しました")
        console.log(res.status + "error")
      }
    } catch(err) {
      toast.warn("通信に失敗しました")
      console.log(err)
    }
  }

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
