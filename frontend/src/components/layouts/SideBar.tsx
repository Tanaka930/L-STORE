import React from 'react'
import { Link } from 'react-router-dom'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Drawer, CssBaseline, Toolbar, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@material-ui/core'
import { Send, RecentActors } from '@material-ui/icons'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      [theme.breakpoints.down('sm')]: {
        width: 200
      }
    },
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.down('sm')]: {
        width: 200
      }
    },
    drawerContainer: {
      overflow: 'auto',
      [theme.breakpoints.down('sm')]: {
        fontSize: 10
      }
    },
  }),
)

type Props = {
  isOpen: boolean
  handleSidebarToggle: VoidFunction
  handleSidebarClose: VoidFunction
}

const SideBar: React.FC<Props> = (props) => {
  const classes = useStyles()

  const drawer = (
    <div className={classes.drawerContainer}>
      <List>
        <ListItem button onClick={props.handleSidebarClose} component={Link} to="/" >
          <ListItemIcon><Send /></ListItemIcon>
          <ListItemText primary="公式LINE投稿" />
        </ListItem>
        <ListItem button onClick={props.handleSidebarClose} component={Link} to="/manage" >
          <ListItemIcon><RecentActors /></ListItemIcon>
          <ListItemText primary="顧客管理" />
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