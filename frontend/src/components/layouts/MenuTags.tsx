import { useState, useEffect } from "react"
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import moment from 'moment'
import Cookies from "js-cookie"
import { Box, Container, Card, CardContent, CardHeader, Grid, Paper, TextField, Button, Divider, Typography, IconButton} from "@material-ui/core"
import { Tag } from '../../interfaces/index'
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
      }
    },
    formControl: {
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
)

// function getStyles(name: string, personName: string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

type TabPanelProps = {
  index: number
  value: number
  userId: string
}

const MenuTags = (props: TabPanelProps) => {
  const { value, index, userId } = props
  const classes = useStyles()
  const { handleSubmit } = useForm()
  // const [edit, setEdit] = useState(false)
  const [tags, setTags] =useState<Tag[]>([])
  const [tagId, setTagId] = useState('')

  const handleChange = (e: React.ChangeEvent<{ value: unknown; }>) => {
    setTagId(e.target.value as string);
  };

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
        console.log(response.data.groupNameList)
      }
    } catch(err) {
      console.error(err)
    }
  }

  console.log(tagId)

  const onSubmit = async (data: any) => {
    try {
      console.log('onSubmit')
      console.log(data)
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/line_customer_l_groups
      `, data, config)
      if (response.status === 200) {
        getTags()
        console.log('post')
      } else {
        console.log('not-post')
      }
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
        <Box py={3} className={classes.root}>
          {/* <Container> */}
            <Card style={{padding: '16px'}}>
              <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container spacing={10}>
                  <Grid item xs={10}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">タグ</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select-outlined"
                        value={tagId}
                        onChange={handleChange}
                        // label="Tag"
                      >
                        {tags.map((tag, index) => (
                          <MenuItem key={index} value={tag.groupId}>{tag.groupName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Box sx={{ height: '100%', width: '100%'}}>
                      <Button
                        variant="contained"
                        color='primary'
                        type="submit"
                        size="large"
                        style={{ height: '100%', width: '100%'}} >
                          submit
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>

            </Card>
          {/* </Container> */}
        </Box>
      )}
    </>
  )
}

export default MenuTags