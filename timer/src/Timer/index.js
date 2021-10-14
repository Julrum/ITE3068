import { Component } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Remained from "./Remained";
import TimeUp from "./TimeUp";
import TimerControl from "./Control";
import TimerTitle from "./Title";
import Timerform from "./Form";
import TimerHistory from "./History";

let timerValue = 1500;
class TimerPannel extends Component {
  constructor() {
    super();
    axios
      .post(
        "http://localhost:4000/graphql",
        { query: "{tasks {id title duration}}", variables: null },
        { "Content-Type": "application/json" }
      )
      .then((res) => this.setState({ history: res.data.data.tasks }))
      .catch((e) => console.log(e));
    this.state = {
      activated: false,
      currentTitle: "",
      current_task: {},
      errorTextField: false,
      helperText: "",
      helperTextField: "",
      history: [],
      initialized: false,
      paused: false,
      remained: timerValue,
      timerTitle: "",
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

  handleChangeTextField = (e) => {
    if (e.target.value && e.target.value.length > 25) {
      this.setState({
        errorTextField: true,
        helperTextField: "Title cannot exceeds 25 char.",
        timerTitle: e.target.value,
      });
    } else {
      this.setState({
        errorTextField: false,
        helperTextField: "",
        timerTitle: e.target.value,
      });
    }
  };

  handleChangeSlider = (e) => {
    if (e.target.value < 5) {
      this.setState({ helperText: "Timer value cannot be 0", timerValue: 300 });
    } else {
      this.setState({
        helperText: "",
        timerValue: e.target.value * 60,
        remained: e.target.value * 60,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { history, timerTitle, timerValue } = this.state;
    if (timerTitle === "") {
      this.setState({ errorTextField: true, helperTextField: "Empty Title" });
    } else {
      let new_task = {
        id: history.length,
        title: timerTitle,
        duration: timerValue,
      };
      this.setState((prev) => {
        return {
          currentTitle: timerTitle,
          current_task: new_task,
          history: [...prev.history, "a", new_task],
          remained: timerValue,
          timerTitle: "",
          timerValue,
        };
      });

      this.handleStartTimer();
    }
  };

  render() {
    let {
      remained,
      timerValue,
      initialized,
      activated,
      paused,
      helperText,
      history,
      currentTitle,
      current_task,
      timerTitle,
      errorTextField,
      helperTextField,
    } = this.state;

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
            <TimerHistory
              history={history}
              activated={activated}
              current_task={current_task}
              remained={remained}
              initialized={initialized}
              paused={paused}
            />
            <TimerTitle activated={activated} taskTitle={currentTitle} />
            <Remained remained={remained} />
            <Timerform
              activated={activated}
              timerValue={timerValue}
              timerTitle={timerTitle}
              helperText={helperText}
              errorTextField={errorTextField}
              helperTextField={helperTextField}
              handleChangeSlider={this.handleChangeSlider}
              handleChangeTextField={this.handleChangeTextField}
              handleSubmit={this.handleSubmit}
            />
            <TimerControl
              activated={activated}
              paused={paused}
              handleStartTimer={this.handleSubmit}
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
