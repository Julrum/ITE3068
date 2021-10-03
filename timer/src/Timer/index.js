import { Component } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Remained from "./Remained";
import TimerAnimation from "./Animation";
import TimerControl from "./Control";
import TimeUp from "./TimeUp";
import Timerform from "./Form";

let timerValue = 1500;
class TimerPannel extends Component {
  constructor() {
    super();
    this.state = {
      remained: timerValue,
      initialized: false,
      activated: false,
      paused: false,
      timerValue,
    };
  }

  handleStartTimer = () => {
    this.setState((prev) => {
      return {
        remained: prev.timerValue,
        initialized: true,
      };
    });
    this.interval = setInterval(() => {
      this.setState((prev) => {
        if (prev.remained <= 0) {
          clearInterval(this.interval);
          return {
            activated: false,
            paused: false,
            initialized: false,
          };
        } else {
          return {
            initialized: true,
            activated: true,
            remained: prev.remained - 1,
          };
        }
      });
    }, 1000);
  };
  handleStopTimer = () => {
    this.setState(() => {
      clearInterval(this.interval);
      return {
        initialized: false,
        remained: timerValue,
        timerValue,
        activated: false,
        paused: false,
      };
    });
  };

  handlePauseTimer = () => {
    this.setState(() => {
      clearInterval(this.interval);
      return { paused: true };
    });
  };

  handleResumeTimer = () => {
    this.interval = setInterval(() => {
      this.setState((prev) => {
        if (prev.remained <= 0) {
          clearInterval(this.interval);
          return {
            activated: false,
            paused: false,
            initialized: false,
          };
        } else {
          return { paused: false, remained: prev.remained - 1 };
        }
      });
    }, 1000);
  };

  handleChangeSlider = (e) => {
    this.setState({
      remained: e.target.value * 60,
      timerValue: e.target.value * 60,
    });
  };

  render() {
    let { remained, timerValue, initialized, activated, paused } = this.state;
    console.log(this.state);
    return (
      <>
        <Card sx={{ maxWidth: 360 }}>
          <CardMedia
            component="img"
            height="140"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="paella"
          />
          <CardContent>
            <TimerAnimation
              remained={remained}
              initialized={initialized}
              activated={activated}
              paused={paused}
            />
            <Remained remained={remained} />
            <Timerform
              activated={activated}
              timerValue={timerValue}
              handleChangeSlider={this.handleChangeSlider}
            />
            <TimerControl
              activated={activated}
              paused={paused}
              handleStartTimer={this.handleStartTimer}
              handleStopTimer={this.handleStopTimer}
              handlePauseTimer={this.handlePauseTimer}
              handleResumeTimer={this.handleResumeTimer}
            />
          </CardContent>
        </Card>
        <TimeUp open={remained <= 0} handleClose={this.handleStopTimer} />
      </>
    );
  }
}

export default TimerPannel;
