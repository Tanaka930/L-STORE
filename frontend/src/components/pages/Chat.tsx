import React, { useState ,useEffect, useContext } from "react"
import { AuthContext } from "App"
import axios from "axios"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"
import { CustomerList } from "interfaces/index"
import { Chats } from "interfaces/index"
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

const Chat: React.FC = () => {
  const classes = useStyles()
  // const [customers, setCustomers] = useState<CustomerList[]>([])
  const { currentUser } = useContext(AuthContext)
  
  const config = {
    headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
    }
  }


  return (
    <div className={classes.root}>
    </div>
  )
}

export default Chat