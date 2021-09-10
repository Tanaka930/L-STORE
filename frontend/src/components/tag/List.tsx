import { useHistory } from 'react-router-dom'
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

const List: React.FC<{tags: any}> = ({tags}) => {


  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Box>
        <Table>
          <TableBody>
            {tags.map((tag: any) => (
              <TableRow
                hover
                key={tag.id}
                // onClick={() => handleLinkClick(customer.id)}
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
                      {tag.group_name}
                    </Typography>
                  </Box>
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