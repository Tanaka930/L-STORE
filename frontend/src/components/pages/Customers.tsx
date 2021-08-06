import React, { useState ,useEffect, useContext } from 'react'
import { AuthContext } from "App"
import axios from 'axios'
import Cookies from "js-cookie"
import { CustomerList } from "interfaces/index"
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import { List, ListSubheader, ListItem, ListItemText, ListItemAvatar ,Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 800
  },
  subhead: {
    display: "flex",
  },
  subheadTitle: {
    flex: "1"
  }
}))

const Customers: React.FC = () => {
  const classes = useStyles()

  const [customers, setCustomers] = useState<CustomerList[]>([])
  const { currentUser } = useContext(AuthContext)
  const config = {
    headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
    }
  }

  useEffect(() => {
    axios.get('http://192.168.3.15:3001/api/v1/tokens/' + currentUser?.id + '/line_costmers', config)
      .then(res => {
        console.log(res.data)
        setCustomers(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className={classes.root}>
      <h1>お友達リスト</h1>
      <List subheader={<ListSubheader className={classes.subhead}><span className={classes.subheadTitle}>アカウント名</span><span className={classes.subheadTitle}>アカウント情報</span></ListSubheader>}>
        {customers.map((customer, index) => (
          <ListItem key={index} button>
            <ListItemAvatar>
              {customer.image
                ? <Avatar src={ customer.image }/>
                : <Avatar />
              }
            </ListItemAvatar>
            <ListItemText>{ customer.name }</ListItemText>
            <ListItemText>ここにテキストが入ります。</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Customers