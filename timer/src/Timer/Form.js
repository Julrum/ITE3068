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
  console.log(timerTitle);
  return (
    <Container>
      <div style={{ width: "280px" }}>
        <form onSubmit={handleSubmit}>
          <Textfield
            error={errorTextField}
            helperText={helperTextField}
            sx={{ width: "100%", my: "10px" }}
            id="timer-title"
            value={timerTitle}
            label={errorTextField ? "Error" : "Required"}
            onChange={handleChangeTextField}
          />
          <Typography color="error">{helperText}</Typography>
          <Slider
            disabled={activated}
            defaultValue={25}
            value={timerValue / 60}
            step={5}
            min={0}
            max={30}
            onChange={handleChangeSlider}
          />
        </form>
      </div>
    </Container>
  );
};

export default Timerform;
