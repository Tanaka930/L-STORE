import { useHistory } from 'react-router-dom'
import { CustomersParams } from "interfaces/index"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Box, Card, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Typography, Hidden } from "@material-ui/core"

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

const List: React.FC<{customers: CustomersParams[]}> = ({customers}) => {

  const history = useHistory()
  const classes = useStyles()

  const handleLinkClick = (id: number) => {
    history.push("/customers/" + id)
  }

  return (
    <Card className={classes.root}>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                アカウント名
              </TableCell>
              <Hidden xsDown>
                <TableCell>
                  お名前
                </TableCell>
              </Hidden>
              <Hidden xsDown>
                <TableCell>
                  メールアドレス
                </TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer: any) => (
              <TableRow
                hover
                key={customer.id}
                onClick={() => handleLinkClick(customer.id)}
              >
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    {customer.image
                      ? <Avatar src={ customer.image } />
                      : <Avatar />
                    }
                    <Typography
                      color="textPrimary"
                      variant="body1"
                    >
                      {customer.name}
                    </Typography>
                  </Box>
                </TableCell>
                <Hidden xsDown>
                  <TableCell>
                    {customer.full_name}
                  </TableCell>
                </Hidden>
                <Hidden xsDown>
                  <TableCell>
                    {customer.mail}
                  </TableCell>
                </Hidden>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  )
}

export default List