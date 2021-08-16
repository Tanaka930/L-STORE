import { Container, Grid } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Header from "components/layouts/Header"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  })
)

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <>
      <Grid container>
        <Header />
        <Grid item sm={9} xs={12}>
          <main>
            <Container maxWidth="lg" className={classes.container}>
              <div className={classes.toolbar} />
              <Grid container justifyContent="center">
                <Grid item xs={12}>
                  {children}
                </Grid>
              </Grid>
            </Container>
          </main>
        </Grid>
      </Grid>
    </>
  )
}

export default CommonLayout