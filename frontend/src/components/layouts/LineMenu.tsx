import { useState } from "react"
import { AppBar, Tabs, Tab, Toolbar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useParams } from "react-router-dom"
import Info from "components/layouts/Info"
import Chat from "components/layouts/Chat"
import Others from "components/layouts/Others"

type UserId = {
  id: string
}

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    marginTop: 30
  }
}))

const LineMenu = () => {
  const classes = useStyles()
  const { id } = useParams<UserId>()
  const [value, setValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setValue(value)
  }

  return (
    <>
      <AppBar position="static" color="default" className={classes.container}>
        <Toolbar>
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
        </Toolbar>
      </AppBar>
      <Info value={value} index={0} userId={id} />
      <Chat value={value} index={1} userId={id} />
      <Others value={value} index={2} userId={id} />
    </>
  )
}

export default LineMenu