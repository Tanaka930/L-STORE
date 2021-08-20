import { useState } from "react"
import { Box, Container, Grid, TextField, Button } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

type TabPanelProps = {
  index: number
  value: number
  userId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(3),
        width: 600,
        display: "block"
      },
    },
    textContainer: {
      height: 250,
      width: 600,
    }
  }),
)

const Others = (props: TabPanelProps) => {
  const { value, index, userId } = props
  const [edit, setEdit] = useState(false)
  const classes = useStyles()

  const handleToggleButton = () => {
    setEdit(prevState => !prevState)
  }

  return (
    <>
      {value === index && (
        <>
          <Box>
            { edit ? (
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    label="備考"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={9}
                    defaultValue="ここに備考メモが入ります。"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleToggleButton}
                  >
                    保存
                  </Button>
                </form>
              ) : (
                <Box sx={{p: 3}}>
                  <p className={classes.textContainer}>ここに備考メモが入ります。</p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleToggleButton}
                  >
                    編集
                  </Button>
                </Box>
              )
            }
          </Box>
        </>
      )}
    </>
  )
}

export default Others