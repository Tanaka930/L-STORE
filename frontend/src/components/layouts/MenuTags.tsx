import { useState, useEffect } from "react"
import { useForm, Controller } from 'react-hook-form'
// import Cookies from "js-cookie"
import axios from 'axios'
import { Box,
         Card,
         Grid,
         Button,
         IconButton,
         InputLabel,
         MenuItem,
         FormControl,
         Select,
         TextField
} from "@material-ui/core"
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Tag, CurrentTag, TabPanelProps } from '../../types/index'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import { config } from "lib/api/config"
import Cookies from "js-cookie"
import TwoColumnTable from "components/parts/TwoColumnTable"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiCardHeader-title': {
        fontSize: 24,
      },
      '& .MuiCardHeader-root': {
        textAlign: "center",
        padding: 0,
        paddingBottom: 9
      },
      '& .MuiPaper-root': {
        marginBottom: 24
      },
    },
    formControl: {
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
)

const MenuTags = ({ value, index, userId }: TabPanelProps) => {
  const classes = useStyles()
  const { handleSubmit, control, reset } = useForm()
  const [tags, setTags] =useState<Tag[]>([])
  const [cTags, setCTags] =useState<CurrentTag[]>([])


  const onSubmit = async (value: any) => {
    const config = { 
      headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }}
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/line_customer_l_groups
      `, value, config)
      if (response.status === 200) {
        getTags()
        reset()
      } else {
        console.error('not-post')
      }
    } catch(err) {
      console.error(err)
    }
  }

  const getTags = async () => {
    const config = { 
      headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }}
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/line_customer_l_groups`, config)
      if (response.status === 200) {
        setTags(response.data.groups)
        setCTags(response.data.nowGroupList)
      }
    } catch(err) {
      console.error(err)
    }
  }

  const handleDeleteButton = (id: number) => {
    const config = {
      headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }}
    try {
      axios.delete(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/line_customer_l_groups/${id} `, config)
      .then(() => {
        getTags()
      })
      .catch(error => console.error(error))
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <>
      {value === index && (
        <Box style={{padding: '16px', backgroundColor: '#fff', marginTop: '24px' }}>
          <Box sx={{ mb: 3 }}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  {/* <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">タグ</InputLabel> */}
                    <Controller
                      name="l_group_id"
                      control={control}
                      defaultValue=''
                      render={({ field: { onChange, value } }) => (
                      <TextField
                        name="l_group_id"
                        label="Add Tags"
                        variant="outlined"
                        fullWidth
                        select
                        value={value}
                        onChange={onChange}
                      >
                        {tags.map((tag, index) => (
                          <MenuItem key={index} value={tag.groupId}>
                            {tag.groupName}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                    />
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ height: '100%', width: '100%'}}>
                    {/* <Button
                      variant="contained"
                      color='primary'
                      type="submit"
                      size="large"
                      style={{ height: '100%', width: '100%'}} >
                        追加
                    </Button> */}
                    <IconButton
                      style={{ height: '100%', padding: 0}} 
                      
                      color='primary'
                      type='submit'
                    >
                      <AddBoxIcon style={{ fontSize: 56 }}/>
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
          <TwoColumnTable
            datas={cTags}
            handleDeleteButton={handleDeleteButton}
          />
        </Box>
      )}
    </>
  )
}

export default MenuTags