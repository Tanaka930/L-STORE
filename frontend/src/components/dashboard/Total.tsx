import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from "@material-ui/core"
import { green } from "@material-ui/core/colors"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import PeopleIcon from "@material-ui/icons/PeopleOutlined"

type TotalCustomersProps = {
  followCount: number
  gainFollow: number
}

export const TotalCustomers = ({ followCount, gainFollow}: TotalCustomersProps) => {
  return (
    <Card>
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
              お友達アカウント
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {followCount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              style={{
                backgroundColor: '#06c755',
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
            alignItems: 'center',
            display: 'flex',
            paddingTop: 16
          }}
        >
          <ArrowUpwardIcon style={{ color: green[900] }} />
          <Typography
            variant="body2"
            style={{
              color: green[900],
              marginRight: 8
            }}
          >
            {gainFollow}
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
  )
}

export default TotalCustomers
