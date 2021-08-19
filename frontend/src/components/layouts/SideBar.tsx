import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import { Drawer, CssBaseline, Toolbar, List, ListItem, ListItemIcon, ListItemText, Hidden, Divider } from "@material-ui/core"
import { Send, RecentActors } from "@material-ui/icons"
import HomeIcon from '@material-ui/icons/Home';
import { AuthContext } from "App"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      width: 240,
      flexShrink: 0,
      [theme.breakpoints.down("sm")]: {
        width: 200
      }
    },
    drawerPaper: {
      width: 240,
      [theme.breakpoints.down("sm")]: {
        width: 200
      }
    },
    drawerContainer: {
      overflow: "auto",
      [theme.breakpoints.down("sm")]: {
        fontSize: 10
      }
    },
    drawerHeader: {
      backgroundColor: "#3f51b5",
      color: "white",
      fontSize: 20,
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    currentUser: {
      justifyContent: "center",
      fontSize: 20,
      // [theme.breakpoints.up("sm")]: {
      //   display: "none"
      // }
    }
  })
)

type Props = {
  isOpen: boolean
  handleSidebarToggle: VoidFunction
  handleSidebarClose: VoidFunction
}

const SideBar: React.FC<Props> = (props) => {
  const { currentUser } = useContext(AuthContext)
  const classes = useStyles()

  const drawer = (
    <div className={classes.drawerContainer}>
      <Toolbar className={classes.drawerHeader}>
        L-store
      </Toolbar>
      <Divider />
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
          <ListItemIcon><Send /></ListItemIcon>
          <ListItemText primary="公式LINE投稿" />
        </ListItem>
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
      <Hidden xsDown implementation="css">
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