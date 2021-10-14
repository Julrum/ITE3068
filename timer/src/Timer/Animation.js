import TrackChangesIcon from "@mui/icons-material/TrackChanges";

let Animation = ({ initialized, activated, paused }) => {
  return (
    <TrackChangesIcon
      className={initialized ? "App-logo" : ""}
      htmlColor="white"
      sx={{
        fontSize: 100,
        animationPlayState: !paused && activated ? "running" : "paused",
      }}
    />
  );
};

export default Animation;
