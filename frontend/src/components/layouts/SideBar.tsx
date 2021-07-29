import React from 'react'
import { Link } from 'react-router-dom'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Drawer, CssBaseline, Toolbar, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
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
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
)

type Props = {
  isOpen: boolean
  handleSidebarToggle: VoidFunction
}

const SideBar: React.FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        open={props.isOpen}
        onClose={props.handleSidebarToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button component={Link} to="/" >
              <ListItemIcon><Send /></ListItemIcon>
              <ListItemText primary="公式LINE投稿" />
            </ListItem>
            <ListItem button component={Link} to="/manage" >
              <ListItemIcon><RecentActors /></ListItemIcon>
              <ListItemText primary="顧客管理" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  )
}

export default SideBar