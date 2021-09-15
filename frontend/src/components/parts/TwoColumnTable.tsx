import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Hidden, IconButton, Table, TableRow, TableCell, TableBody, Typography } from "@material-ui/core"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import { Tag } from "../../interfaces/index"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTableCell-root': {
        padding: "8px",
        paddingLeft: "16px"
      }
    }
  })
)

type TwoColumnTableProps = {
  data: Tag[]
  handleDeleteButton: (id: number) => void
}

const TwoColumnTable = ({ data, handleDeleteButton }: TwoColumnTableProps) => {
  const classes = useStyles()

  return (
    <Table className={classes.root}>
      <TableBody>
        {/* {datas.map((data: any, index: number) => ( */}
          <TableRow
            hover
            // key={index}
            key='1'
          >
            <TableCell>
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {/* {data.name} */}
                タグ1
              </Typography>
            </TableCell>
            <Hidden xsDown>
              <TableCell align='right'>
                {/* <IconButton onClick={() => handleDeleteButton(data.id)}> */}
                <IconButton onClick={() => handleDeleteButton(1)}>
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </Hidden>
          </TableRow>
        {/* ))} */}
      </TableBody>
    </Table>
  )
}

export default TwoColumnTable