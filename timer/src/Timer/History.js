import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Typography from "@mui/material/Typography";
import TimerAnimation from "./Animation";

let TimerHistory = ({
  history,
  activated,
  current_task,
  initialized,
  paused,
}) => {
  return (
    <Timeline>
      {history &&
        history.map((item) =>
          current_task && current_task.id === item.id ? (
            <TimelineItem key={"task_" + item.id}>
              <TimelineOppositeContent />
              <TimelineSeparator>
                <TimelineDot color="error">
                  <TimerAnimation
                    initialized={initialized}
                    activated={activated}
                    paused={paused}
                  />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "15px" }} />
            </TimelineItem>
          ) : (
            <TimelineItem key={"task_" + item.id}>
              <TimelineOppositeContent sx={{ py: "15px" }}>
                <Typography color="text.secondary" variant="h6">
                  {item.duration / 60 < 10 ? "0" : ""}
                  {Math.floor(item.duration / 60)} :{" "}
                  {item.duration % 60 < 10 ? "0" : ""}
                  {item.duration % 60}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>
                  <AccessAlarmIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "15px" }}>
                <Typography color="text.secondary" variant="h6">
                  {item.title}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          )
        )}
    </Timeline>
  );
};

export default TimerHistory;
