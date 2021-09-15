import React, { useContext } from "react"
import { useHistory, Link } from "react-router-dom"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import Cookies from "js-cookie"
import { signOut } from "lib/api/auth"
import { Drawer, CssBaseline, Toolbar, List, ListItem, ListItemIcon, ListItemText, Hidden, Divider } from "@material-ui/core"
import { RecentActors } from "@material-ui/icons"
import HomeIcon from "@material-ui/icons/Home"
import { AuthContext } from "App"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PaymentIcon from '@material-ui/icons/Payment'
import EmailIcon from '@material-ui/icons/Email'
import LoyaltyIcon from '@material-ui/icons/Loyalty';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
    drawerContainer: {
      background: "primary",
      overflow: "auto",
    },
    currentUser: {
      justifyContent: "center",
      fontSize: 20,
    }
  })
)

type Props = {
  isOpen: boolean
  handleSidebarToggle: VoidFunction
  handleSidebarClose: VoidFunction
}

const SideBar = (props: Props) => {
  const { currentUser, setIsSignedIn } = useContext(AuthContext)
  const history = useHistory()
  const classes = useStyles()

  const handleSignOut = async () => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        history.push("/signin")
      } else {
        console.error("Failed in sign out")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const drawer = (
    <div className={classes.drawerContainer}>
      <List>
        <ListItem className={classes.currentUser} >
          {currentUser?.name}
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={props.handleSidebarClose} component={Link} to="/" >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="HOME" />
        </ListItem>
        <ListItem button onClick={props.handleSidebarClose} component={Link} to="/customers" >
          <ListItemIcon><RecentActors /></ListItemIcon>
          <ListItemText primary="お友達リスト" />
        </ListItem>
        <ListItem button onClick={props.handleSidebarClose} component={Link} to="/message" >
          <ListItemIcon><EmailIcon /></ListItemIcon>
          <ListItemText primary="公式LINE投稿" />
        </ListItem>
        <ListItem button onClick={props.handleSidebarClose} component={Link} to="/tag" >
          <ListItemIcon><LoyaltyIcon /></ListItemIcon>
          <ListItemText primary="タグ管理" />
        </ListItem>
        <ListItem button onClick={props.handleSidebarClose} component={Link} to="/checkout" >
          <ListItemIcon><PaymentIcon /></ListItemIcon>
          <ListItemText primary="お支払い情報" />
        </ListItem>
        <Hidden lgUp>
          <Divider variant="middle" />
          <List>
            <ListItem button onClick={handleSignOut} >
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="ログアウト" />
            </ListItem>
          </List>
        </Hidden>
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Hidden smUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          open={props.isOpen}
          onClose={props.handleSidebarToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="persistent"
          open
          onClose={props.handleSidebarToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  )
}

export default SideBar