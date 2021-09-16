import { useState, useEffect, useContext } from "react"
import { useForm, Controller } from 'react-hook-form'
import { AuthContext } from "App"
import axios from 'axios'
import Cookies from "js-cookie"
import { Grid, TextField, MenuItem, Button } from "@material-ui/core"

type TagsParams = {
  groupId: number
  groupName: string
}

const SearchTag = () => {
  const { currentUser } = useContext(AuthContext)
  const [tags, setTags] = useState<TagsParams[]>([])
  const { handleSubmit, control } = useForm()

  const config = {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }

  const getTags = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/l_groups`, config)
      if (response.status === 200) {
        setTags(response.data.groupNameList)
      }
    } catch(err) {
      console.error(err)
    }
  }

  const onSubmit = async (values: any) => {
    console.log(values.groupId)
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/line_customer/${currentUser?.id}/search/group/${values.groupId}`, config)
      if (response.status === 200) {
        console.log(response.data)
      }
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <Grid item md={4} xs={12}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="groupId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              name="groupId"
              label="タグ検索"
              variant="outlined"
              fullWidth
              select
              defaultValue=""
              value={value}
              onChange={onChange}
            >
              {tags.map((tag) => (
                <MenuItem key={tag.groupId} value={tag.groupId}>
                  {tag.groupName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          検索
        </Button>
      </form>
    </Grid>
  )
}

export default SearchTag
