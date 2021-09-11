import { useHistory } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Box, Button, Card, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Typography, Hidden } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiAvatar-root': {
        marginRight: 16
      },
      '& .MuiTableRow-root': {
        cursor: "pointer"
      }
    }
  })
)

const List: React.FC<{tags: any}> = ({tags}) => {


  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Box>
        <Table>
          <TableHead>
              <TableRow>
                <TableCell>
                  タグ名
                </TableCell>
                <Hidden xsDown>
                  <TableCell>
                    アカウント数
                  </TableCell>
                </Hidden>
                <Hidden xsDown>
                  <TableCell>
                  </TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
            {/* {tags.map((tag: any) => ( */}
              <TableRow
                hover
                // key={tag.id}
              >
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <Typography
                      color="textPrimary"
                      variant="body1"
                    >
                      おしゃかちゃま
                      {/* {customer.name} */}
                    </Typography>
                  </Box>
                </TableCell>
                <Hidden xsDown>
                  <TableCell>
                    33
                    {/* {customer.full_name} */}
                  </TableCell>
                </Hidden>
                <Hidden xsDown>
                  <TableCell align='right'>
                    <Button
                      // onClick={edit}
                      variant="contained"
                      color="primary"
                      type="submit">
                      edit
                    </Button>
                  </TableCell>
                </Hidden>
              </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </Box>
    </Card>
  )
}

export default List