import { useState, useEffect, useContext } from "react"
import { useForm, Controller } from 'react-hook-form'
import { AuthContext } from "App"
import axios from 'axios'
import { config } from 'lib/api/config'
import { getTags } from "lib/api/tag"
import { Box, TextField, MenuItem, Button } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { CustomersParams, GetTagsParams } from "types/index"

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

type SearchTagValue = {
  groupId: number
}

type SearchTagProps = {
  handleSearchTag: (data: CustomersParams[]) => void
}

const SearchTag = ({handleSearchTag}: SearchTagProps) => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const [tags, setTags] = useState<GetTagsParams[]>([])
  const { handleSubmit, control } = useForm()

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
    getTags(setTags)
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
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              name="groupId"
              label="タグ検索"
              variant="outlined"
              fullWidth
              select
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
