import Slider from "@mui/material/Slider";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Textfield from "@mui/material/TextField";

let Timerform = ({
  activated,
  errorTextField,
  timerValue,
  timerTitle,
  helperText,
  helperTextField,
  handleChangeSlider,
  handleChangeTextField,
  handleSubmit,
}) => {
  let marks = [
    { value: 5, label: "5 min." },
    { value: 30, label: "30min." },
  ];
  console.log(timerTitle);
  return (
    !activated && (
      <Container>
        <div style={{ width: "280px" }}>
          <form onSubmit={handleSubmit}>
            <Textfield
              error={errorTextField}
              helperText={helperTextField}
              sx={{ width: "100%", my: "10px" }}
              id="timer-title"
              value={timerTitle}
              label={errorTextField ? "Error" : "New Event"}
              variant="standard"
              onChange={handleChangeTextField}
            />
            <Typography color="error">{helperText}</Typography>
            <Slider
              disabled={activated}
              defaultValue={25}
              value={timerValue / 60}
              marks={marks}
              step={5}
              min={0}
              max={30}
              onChange={handleChangeSlider}
            />
          </form>
        </div>
      </Container>
    )
  );
};

export default Timerform;
