import { Typography } from "@mui/material";

let TimerTitle = ({ activated, taskTitle }) =>
  activated && (
    <Typography variant="h3" sx={{ fontWeight: 700 }}>
      {taskTitle}
    </Typography>
  );

export default TimerTitle;
