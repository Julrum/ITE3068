import TrackChangesIcon from "@mui/icons-material/TrackChanges";

let TimerAnimation = ({ remained, initialized, activated, paused }) => {
  return (
    <TrackChangesIcon
      className={initialized ? "App-logo" : ""}
      htmlColor="red"
      sx={{
        fontSize: 100,
        animationPlayState:
          !paused && activated && remained > 0 ? "running" : "paused",
      }}
    />
  );
};

export default TimerAnimation;
