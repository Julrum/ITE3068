import TrackChangesIcon from "@mui/icons-material/TrackChanges";

let TimerAnimation = ({ initialized, activated, paused }) => {
  return (
    <TrackChangesIcon
      className={initialized ? "App-logo" : ""}
      htmlColor="red"
      sx={{
        fontSize: 100,
        animationPlayState: !paused && activated ? "running" : "paused",
      }}
    />
  );
};

export default TimerAnimation;
