import { useState } from "react"
import { AppBar, Tabs, Tab, Toolbar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useParams } from "react-router-dom"
import Info from "./Info"
import Chat from "./Chat"
import Others from "./Others"
import MenuTags from "./MenuTags"

type UserId = {
  id: string
}

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    marginTop: 30,
    zIndex: 1
  }
}))

const LineMenu = () => {
  const classes = useStyles()
  const { id } = useParams<UserId>()
  const [value, setValue] = useState(0)

  const handleChange = (e: React.ChangeEvent<{}>, value: number) => {
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
            <Tab label="顧客情報" />
            <Tab label="トーク" />
            <Tab label="タグ管理" />
            <Tab label="メモ" />
          </Tabs>
        </Toolbar>
      </AppBar>
      {(() => {
        switch(value) {
          case 0:
            return <Info userId={id} />
          case 1:
            return <Chat userId={id} />
          case 2:
            return <MenuTags userId={id} />
          case 3:
            return <Others userId={id} />
        }
      })()}
      {/* <Info value={value} index={0} userId={id} />
      <Chat value={value} index={1} userId={id} />
      <MenuTags value={value} index={2} userId={id} />
      <Others value={value} index={3} userId={id} /> */}
    </>
  )
}

export default LineMenu