import { useHistory } from "react-router-dom"
import { Box, Card, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Typography, Hidden } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { CustomersParams } from "types/index"

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

type CustomerListProps = {
  customers: CustomersParams[]
  searchKeyword: string
}

const List = ({ customers, searchKeyword }: CustomerListProps) => {
  const history = useHistory()
  const classes = useStyles()

  const handleLinkClick = (id: number) => {
    history.push("/customers/" + id)
  }
  
  let _customers = customers
  let search = searchKeyword.trim().toLowerCase()

  if (search.length > 0) {
    _customers = _customers.filter((customer) => {
      return customer.name.toLowerCase().match(search)
        || customer.fullName.toLowerCase().match(search)
        || customer.mail.toLowerCase().match(search)
    })
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
              <Hidden xsDown>
                <TableCell>
                  電話番号
                </TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {_customers.map((customer) => (
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
                    {customer.fullName}
                  </TableCell>
                </Hidden>
                <Hidden xsDown>
                  <TableCell>
                    {customer.mail}
                  </TableCell>
                </Hidden>
                <Hidden xsDown>
                  <TableCell>
                    {customer.telNum}
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