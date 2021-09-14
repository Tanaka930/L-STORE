import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Box,
         Button,
        //  ButtonGroup,
         Card,
         Hidden,
         IconButton,
         Table,
         TableHead,
         TableRow,
         TableCell,
         TableBody,
         TextField,
         Typography,
} from "@material-ui/core"

import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // '& .MuiAvatar-root': {
      //   marginRight: 16
      // },
      '& .MuiTableCell-root': {
        padding: "8px",
        paddingLeft: "16px"
      }
    }
  })
)



export const TwoColumnTable = (props: any) => {
  const classes = useStyles()
  const { datas, handleDeleteButton } = props;

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
                <IconButton onClick={() => handleDeleteButton('1')}>
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