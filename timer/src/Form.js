import Slider from "@mui/material/Slider";
import { Container } from "@mui/material";

let Timerform = ({ activated, timerValue, handleChangeSlider }) => {
  return (
    <Container>
      <div style={{ width: "280px" }}>
        <Slider
          disabled={activated}
          defaultValue={25}
          value={timerValue / 60}
          step={5}
          min={5}
          max={30}
          onChange={handleChangeSlider}
        />
      </div>
    </Container>
  );
};

export default Timerform;
