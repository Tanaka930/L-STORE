import { Box, Container, Grid, TextField, MenuItem, InputLabel, Button } from "@material-ui/core"
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
    },
  }),
)

const Chat = (props: TabPanelProps) => {
  const { value, index, userId } = props
  const classes = useStyles()

  const forRange = (a: number, z: number) => {
    const lst = []
    for (let i = a; i <= z; i++) {
      lst.push(i)
    }
    return lst
  }

  const years = forRange(1920, 2021)
  const months = forRange(1, 12)
  const days = forRange(1, 31)
  const ages = forRange(9, 99)
  
  return (
    <>
      {value === index && (
        <Box py={3} className={classes.root}>
          <Container maxWidth="sm">
            <form noValidate autoComplete="off">
              <Grid container spacing={4}>
                <Grid container item spacing={1}>
                  <Grid item xs={12}>
                    <InputLabel>名前</InputLabel>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      label="姓"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      label="名"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={1}>
                  <Grid item xs={12}>
                    <InputLabel>生年月日</InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="年"
                      variant="outlined"
                      fullWidth
                      select
                    >
                      { years.map((year, index) => (
                        <MenuItem key={index} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="月"
                      variant="outlined"
                      fullWidth
                      select
                    >
                      { months.map((month, index) => (
                        <MenuItem key={index} value={month}>
                          {month}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="日"
                      variant="outlined"
                      fullWidth
                      select
                    >
                      { days.map((day, index) => (
                        <MenuItem key={index} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="年齢"
                    variant="outlined"
                    fullWidth
                    select
                  >
                    { ages.map((age, index) => (
                      <MenuItem key={index} value={age}>
                        {age}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="性別"
                    variant="outlined"
                    fullWidth
                    select
                  >
                    <MenuItem value="men">男</MenuItem>
                    <MenuItem value="women">女</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="住所"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    label="電話番号"
                    variant="outlined"
                    helperText="ハイフン無しで入力してください"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="メールアドレス"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid container item xs={12} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    保存
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Box>
      )}
    </>
  )
}

export default Chat