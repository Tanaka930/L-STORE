import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { red } from '@material-ui/core/colors';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

type BlockCustomersProps = {
  unfollowCount: number
  gainUnfollow: number
}

export const BlockCustomers = ({ unfollowCount, gainUnfollow}: BlockCustomersProps) => {

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
                ブロックアカウント
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                
                {unfollowCount}
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
            <ArrowUpwardIcon style={{ color: red[900] }} />
            <Typography
              style={{
                color: red[900],
                marginRight: 8
              }}
              variant="body2"
            >
              {gainUnfollow}
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
            >
              Since last day
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  )
};

export default BlockCustomers;
