import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

let TimerControl = (prop) => {
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
  // return (
  //   <Stack spacing={2} direction="row">
  //     <Button variant="contained" onClick={handleStopTimer}>
  //       Stop
  //     </Button>
  //     {!activated ? (
  //       <Button variant="contained" onClick={handleStartTimer}>
  //         Start
  //       </Button>
  //     ) : !paused ? (
  //       <Button variant="contained" onClick={handlePauseTimer}>
  //         Pause
  //       </Button>
  //     ) : (
  //       <Button variant="contained" onClick={handleResumeTimer}>
  //         Resume
  //       </Button>
  //     )}
  //   </Stack>
  // );
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

export default TimerControl;
