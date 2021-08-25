import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { red } from '@material-ui/core/colors';

import { CustomerList } from "interfaces/index"
// import { Length } from "interfaces/index"
// type Props = {
//   props: any
// }

type Total = {
  total: number;
}


export const BlockCustomers = (props: Total) => {
  const { total } = props;
  // const totalAnswer = total == 0 ? "" | total
  return (
    <>
      <Card
        style={{ height: '100%' }}

      >
        <CardContent>
          <Grid
            container
            spacing={3}
            style={{ justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                BLOCK CUSTOMERS
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                
                {total}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                style={{
                  backgroundColor: red[600],
                  height: 56,
                  width: 56
                }}
              >
                <PeopleIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            style={{
              paddingTop: 16,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ArrowDownwardIcon style={{ color: red[900] }} />
            <Typography
              // mr={1}
              style={{
                color: red[900],
                marginRight: 8
              }}
              variant="body2"
            >
              12%
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
            >
              Since last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  )
};

export default BlockCustomers;
