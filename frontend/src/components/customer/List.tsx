import { useHistory } from 'react-router-dom'
import { CustomersParams } from "interfaces/index"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Box, Card, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiAvatar-root': {
        marginRight: 16
      },
      '& .MuiTableRow-root': {
        cursor: "pointer"
      }
    },
    mobile: {
      [theme.breakpoints.down('sm')]: {
        display: "none"
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
              <TableCell className={classes.mobile}>
                お名前
              </TableCell>
              <TableCell className={classes.mobile}>
                メールアドレス
              </TableCell>
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
                <TableCell className={classes.mobile}>
                  {customer.full_name}
                </TableCell>
                <TableCell className={classes.mobile}>
                  {customer.mail}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  )
}

export default List