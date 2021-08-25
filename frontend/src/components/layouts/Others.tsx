import { useState } from "react"
import { Box, Container, Grid, Card, CardContent, CardHeader, Paper, TextField, MenuItem, InputLabel, Button, Divider, Typography, IconButton } from "@material-ui/core"
import SettingsIcon from '@material-ui/icons/Settings'
import CloseIcon from '@material-ui/icons/Close'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

type TabPanelProps = {
  index: number
  value: number
  userId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiCardHeader-title': {
        fontSize: 24,
      },
      '& .MuiCardHeader-root': {
        textAlign: "center",
        padding: 0,
        paddingBottom: 9
      },
    },
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
        <Box py={3} className={classes.root}>
          <Container maxWidth="sm">
            <Card>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  px: 1
                }}
              >
                <IconButton onClick={handleToggleButton}>
                  { edit ? <CloseIcon /> : <SettingsIcon /> }
                </IconButton>
              </Box>
              <CardHeader
                title="備考欄"
                subheader={edit && "メモ情報がある場合はご記入ください"}
              />
              <Divider variant="middle" />
                { edit ? (
                  <>
                    <CardContent>
                      <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                          label="備考"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={9}
                          defaultValue="ここに備考メモが入ります。"
                        />
                        <Box sx={{mt: 3}}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            type="submit"
                          >
                            保存
                          </Button>
                        </Box>
                      </form>
                    </CardContent>
                  </>
                ) : (
                  <CardContent>
                    <Box sx={{p: 1}}>
                      <Typography
                        color="textPrimary"
                      >
                        ここに備考メモが入ります。
                      </Typography>
                    </Box>
                  </CardContent>
                )}
            </Card>
          </Container>
        </Box>
      )}
    </>
  )
}

export default Others