import { useState, useEffect, useContext } from "react"
import { useForm, Controller } from 'react-hook-form'
import { AuthContext } from "App"
import axios from 'axios'
import Cookies from "js-cookie"
import { Box, TextField, MenuItem, Button } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { CustomersParams } from "interfaces/index"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        marginRight: 6
      },
      '& .MuiButton-root': {
        width: 124
      }
    }
  })
)

type TagsParams = {
  groupId: number
  groupName: string
}

type SearchTagValue = {
  groupId: number
}

type SearchTagProps = {
  handleSearchTag: (data: CustomersParams[]) => void
}

const SearchTag = ({handleSearchTag}: SearchTagProps) => {
  const classes = useStyles()
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

  const onSubmit = async (values: SearchTagValue) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/line_customer/${currentUser?.id}/search/group/${values.groupId}`, config)
      if (response.status === 200) {
        handleSearchTag(response.data)
      }
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={classes.root}
    >
      <Box sx={{ display: 'flex'}}>
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
          タグ検索
        </Button>
      </Box>
    </form>
  )
}

export default SearchTag
