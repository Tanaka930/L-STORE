import { useState, useEffect } from "react"
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import moment from 'moment'
import Cookies from "js-cookie"
import { Box, Container, Card, CardContent, CardHeader, Paper, TextField, Button, Divider, Typography, IconButton} from "@material-ui/core"
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
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
)

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

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
  // const [edit, setEdit] = useState(false)
  const [tags, setTags] =useState<any[]>([])
  const classes = useStyles();
  const [personName, setPersonName] = useState('');

  const handleChange = (event: React.ChangeEvent<{ personName?: string | undefined; value: unknown; }>) => {
    console.log(event.target.personName)
    setPersonName(event.target.personName as string);
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

  console.log(personName)

  const onSubmit = async (personName: any) => {
    // ↓↓↓↓↓↓↓↓↓ 新規投稿処理 ↓↓↓↓↓↓↓↓↓
    try {
      console.log('onSubmit')
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/line_customer_l_groups
      `, personName, config)
      if (response.status === 200) {
        // getTags()
        console.log('post')
        // toast.success("メモを投稿しました")
      } else {
        console.log('not-post')
        // toast.error("投稿に失敗しました")
      }
    } catch(err) {

      // toast.warn("通信に失敗しました")
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
          <Container maxWidth="sm">
            <Card>
            <form autoComplete="off" onSubmit={onSubmit}>
              <FormControl variant="outlined" className={classes.formControl} >
              <InputLabel id="demo-simple-select-outlined-label">タグ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-outlined"
                  value={personName}
                  onChange={handleChange}
                  label="Tag"
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  {tags.map((tag: Tag) => (
                    <MenuItem key={tag.groupId} value={tag.groupId}>{tag.groupName}</MenuItem>
                  ))}
                </Select>
                <Button type="submit">submit</Button>
              </FormControl>
            </form>
          </Card>
        </Container>
      </Box>
      )}
    </>
  )
}

export default MenuTags