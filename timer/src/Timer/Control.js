import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

let Control = (prop) => {
  let {
    handleStartTimer,
    handleStopTimer,
    handlePauseTimer,
    handleResumeTimer,
    activated,
    paused,
  } = prop;

  let fns = [
    handleStopTimer,
    handleStartTimer,
    handlePauseTimer,
    handleResumeTimer,
  ];

  let arr_disabled = [
    false,
    activated,
    paused || !activated,
    !paused || !activated,
  ];
  return (
    <ButtonGroup spacing={2} aria-label="outlined primary button group">
      {["Stop", "Start", "Pause", "Resume"].map((item, index) => (
        <Button
          key={index}
          onClick={fns[index]}
          variant="contained"
          disabled={arr_disabled[index]}
        >
          {item}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Control;
