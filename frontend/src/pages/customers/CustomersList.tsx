import React, { useState ,useEffect, useContext } from "react"
import { AuthContext } from "App"
import axios from "axios"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"
import { CustomerList } from "interfaces/index"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { List, ListSubheader, ListItem, ListItemText, ListItemAvatar ,Avatar } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    subhead: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      }
    },
    subheadName: {
      width: "30%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      }
    },
    subheadInfo: {
      width: "70%",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      }
    },
    accountName: {
      width: "25%"
    },
    accountInfo: {
      width: "70%",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      }
    }
  }),
)

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
      <List
        subheader={
          <ListSubheader className={classes.subhead}>
            <span className={classes.subheadName}>アカウント名</span>
            <span className={classes.subheadInfo}>アカウント情報</span>
          </ListSubheader>
        }
      >
        {customers.map((customer, index) => (
          <ListItem
            key={index}
            button
            component={Link}
            to={"/customers/" + customer.id}
          >
            <ListItemAvatar>
              {customer.image
                ? <Avatar src={ customer.image }/>
                : <Avatar />
              }
            </ListItemAvatar>
            <ListItemText className={classes.accountName}>{customer.name}</ListItemText>
            <ListItemText className={classes.accountInfo}>ここにテキストが入ります。</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default CustomersList