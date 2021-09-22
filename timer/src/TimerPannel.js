import { Component } from "react";
import Timer from "./Timer";
import TimerControl from "./TimerControl";

class TimerPannel extends Component {
  constructor() {
    super();
    this.state = { remained: 1500, activated: false, paused: false };
  }

  handleStartTimer = () => {
    this.interval = setInterval(() => {
      this.setState((prev) => {
        return { activated: true, remained: prev.remained - 1 };
      });
    }, 1000);
  };
  handleStopTimer = () => {
    this.setState(() => {
      clearInterval(this.interval);
      return { remained: 1500, activated: false, pause: false };
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
        return { paused: false, remained: prev.remained - 1 };
      });
    }, 1000);
  };

  render() {
    let { remained, activated, paused } = this.state;
    return (
      <div>
        <Timer remained={remained} />
        <TimerControl
          activated={activated}
          paused={paused}
          handleStartTimer={this.handleStartTimer}
          handleStopTimer={this.handleStopTimer}
          handlePauseTimer={this.handlePauseTimer}
          handleResumeTimer={this.handleResumeTimer}
        />
      </div>
    );
  }
}

export default TimerPannel;
