import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
// import LaptopMacIcon from "@mui/icons-material/LaptopMac";
// import HotelIcon from "@mui/icons-material/Hotel";
// import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";

let TimerHistory = ({ history }) => (
  <Timeline>
    {history &&
      history.map((item) => (
        <TimelineItem key={"task_" + item.id}>
          <TimelineOppositeContent sx={{ py: "24px" }}>
            9:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <FastfoodIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "20px", px: 2 }}>
            <Typography variant="h6" component="span">
              Eat
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
  </Timeline>
);

export default TimerHistory;
