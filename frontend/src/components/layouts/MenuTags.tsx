import { useState, useEffect } from "react"
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import moment from 'moment'
import Cookies from "js-cookie"
import { Box, Container, Card, CardContent, CardHeader, Paper, TextField, Button, Divider, Typography, IconButton} from "@material-ui/core"
import PostAddIcon from '@material-ui/icons/PostAdd';
import CloseIcon from '@material-ui/icons/Close'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import { Tag } from '../../interfaces/index'
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { AnyNaptrRecord } from "dns"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };



type TabPanelProps = {
  index: number
  value: number
  userId: string
}

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

  const onSubmit = async (value: any) => {
    // ↓↓↓↓↓↓↓↓↓ 新規投稿処理 ↓↓↓↓↓↓↓↓↓
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/line_customers/${userId}/line_customer_l_groups
      `, value, config)
      if (response.status === 200) {
        getTags()
        // toast.success("メモを投稿しました")
      } else {
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
      <form autoComplete="off" onSubmit={onSubmit}>
      <FormControl variant="outlined" className={classes.formControl} >
      <InputLabel id="demo-simple-select-outlined-label">タグ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={handleChange}
          label="Tag"
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {tags.map((tag: Tag) => (
            <MenuItem value={tag.groupId}>{tag.groupName}</MenuItem>
          ))}
        </Select>
        <Button type="submit">submit</Button>
      </FormControl>
      </form>
    </>
  )
}

export default MenuTags