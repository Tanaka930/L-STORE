import React, { useCallback, useState, useContext } from "react"
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { makeStyles, Theme } from "@material-ui/core/styles"
const useStyles = makeStyles((theme: Theme) => ({

}))
// type Props = {
//   props: number
// }

export const TasksProgress: React.FC = () => {
  return (
    <>
      <Card
        style={{ height: '100%' }}
        // {...props}
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
                TASKS PROGRESS
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                75.5%
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
                <InsertChartIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box style={{ paddingTop: 3 }}>
            <LinearProgress
              value={75.5}
              variant="determinate"
            />
          </Box>
        </CardContent>
      </Card>
    </>
  )
};

export default TasksProgress;
