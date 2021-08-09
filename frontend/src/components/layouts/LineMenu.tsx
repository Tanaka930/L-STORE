import { useState } from "react"
import { AppBar, Tabs, Tab } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1000,
    marginTop: 30
  }
}))

const LineMenu = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0);

  const handleChange = (value: any) => {
    setValue(value)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="アカウント情報" />
          <Tab label="トーク" />
          <Tab label="その他" />
        </Tabs>
      </AppBar>
    </div>
  )
}

export default LineMenu