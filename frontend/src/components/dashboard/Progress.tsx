import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from "@material-ui/core"
import { orange } from "@material-ui/core/colors"
import PeopleIcon from "@material-ui/icons/PeopleOutlined"

type TasksProgressProps = {
  validAccount: number
}

const TasksProgress = ({ validAccount }: TasksProgressProps) => {

  return (
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
              有効アカウント
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {validAccount + '%'}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              style={{
                backgroundColor: orange[600],
                height: 56,
                width: 56
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box style={{ paddingTop: '24px' }}>
          <LinearProgress
            value={validAccount}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default TasksProgress
