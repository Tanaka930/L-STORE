import React, { useState ,useEffect, useContext } from "react"
import { AuthContext } from "App"
import axios from "axios"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"
import { CustomerList } from "interfaces/index"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { List, ListSubheader, ListItem, ListItemText, ListItemAvatar ,Avatar } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
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

const CustomersList: React.FC = () => {
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
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tokens/${currentUser?.id}/line_customers`, config)
      setCustomers(res.data)
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
          <ListItem key={index} button component={Link} to={"/customers/" + customer.id}>
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

export default CustomersList