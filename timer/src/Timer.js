import Typography from "@mui/material/Typography";

let Timer = ({ remained }) => (
  <div>
    <Typography variant="h3" sx={{ fontWeight: 700 }}>
      {remained / 60 < 10 ? "0" : ""}
      {Math.floor(remained / 60)} : {remained % 60 < 10 ? "0" : ""}
      {remained % 60}
    </Typography>
  </div>
);

export default Timer;
