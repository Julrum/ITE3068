import Slider from "@mui/material/Slider";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";

let Timerform = ({ activated, timerValue, helperText, handleChangeSlider }) => {
  return (
    <Container>
      <div style={{ width: "280px" }}>
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
      </div>
    </Container>
  );
};

export default Timerform;
