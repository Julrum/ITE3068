import { Component } from "react";

import Timer from "./Timer";
import TimerAnimation from "./TimerAnimation";
import TimerControl from "./TimerControl";

let remainedTime = 3;
class TimerPannel extends Component {
  constructor() {
    super();
    this.state = {
      remained: remainedTime,
      initialized: false,
      activated: false,
      paused: false,
    };
  }

  handleStartTimer = () => {
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
        remained: remainedTime,
        activated: false,
        pause: false,
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
        return { paused: false, remained: prev.remained - 1 };
      });
    }, 1000);
  };

  render() {
    let { remained, initialized, activated, paused } = this.state;
    return (
      <div>
        <TimerAnimation
          remained={remained}
          initialized={initialized}
          activated={activated}
          paused={paused}
        />
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
