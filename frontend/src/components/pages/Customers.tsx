import React, { useState ,useEffect, useContext } from "react"
import { AuthContext } from "App"
import axios from "axios"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"
import { CustomerList } from "interfaces/index"
import { makeStyles } from "@material-ui/core/styles"
import { List, ListSubheader, ListItem, ListItemText, ListItemAvatar ,Avatar } from "@material-ui/core"

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

  const getCustomers = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/v1/tokens/${currentUser?.id}/line_costmers`, config)
      setCustomers(res.data)
      console.log(res.data)
    } catch(err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getCustomers()
    const interval = setInterval(()=>{
      getCustomers()
    },10000)
    return() => clearInterval(interval)
  }, [])

  return (
    <div className={classes.root}>
      <h1>お友達リスト</h1>
      <List subheader={<ListSubheader className={classes.subhead}><span className={classes.subheadTitle}>アカウント名</span><span className={classes.subheadTitle}>アカウント情報</span></ListSubheader>}>
        {customers.map((customer, index) => (
          <ListItem key={index} button component={Link} to="/">
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