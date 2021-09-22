import { Component } from "react";
import Timer from "./Timer";
import TimerControl from "./TimerControl";

class TimerPannel extends Component {
  constructor() {
    super();
    this.state = { remained: 1500 };
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
      return { remained: 1500 };
    });
  };

  render() {
    let { remained } = this.state;
    return (
      <div>
        <Timer remained={remained} />
        <TimerControl
          handleStartTimer={this.handleStartTimer}
          handleStopTimer={this.handleStopTimer}
        />
      </div>
    );
  }
}

export default TimerPannel;
