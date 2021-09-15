import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Header from "components/layouts/Header"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(5),
    },
  })
)

type CommonLayoutProps = {
  children: React.ReactElement
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default CommonLayout