import { Component } from "react";
import { API, Auth } from "aws-amplify";
import { taskByCreatedAt } from "../graphql/queries";
import { createTask } from "../graphql/mutations";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Remained from "./Remained";
import TimeUp from "./TimeUp";
import TimerControl from "./Control";
import TimerHistory from "./History";
import TimerTitle from "./Title";
import Timerform from "./Form";

let timerValue = 1500;
class TimerPannel extends Component {
  constructor() {
    super();
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

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then((res) => {
        this.setState({ user: { username: res.username, ...res.attributes } });
      })
      .catch((e) => console.log("Auth error", e));
    API.graphql({
      query: taskByCreatedAt,
      variables: { groupId: "001", sortDirection: "ASC" },
    })
      .then((res) => this.setState({ history: res.data.taskByCreatedAt.items }))
      .catch((e) => console.log("API error", e));
  }

  handleStartTimer = () => {
    this.setState((prev) => {
      return {
        initialized: true,
        remained: prev.timerValue,
      };
    });
    this.interval = setInterval(() => {
      this.setState((prev) => {
        if (prev.remained <= 0) {
          clearInterval(this.interval);
          return {
            activated: false,
            initialized: false,
            paused: false,
          };
        } else {
          return {
            activated: true,
            initialized: true,
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
        activated: false,
        initialized: false,
        paused: false,
        remained: timerValue,
        timerValue,
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
            initialized: false,
            paused: false,
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
        remained: e.target.value * 60,
        timerValue: e.target.value * 60,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { history, timerTitle, timerValue } = this.state;

    if (timerTitle === "") {
      this.setState({ errorTextField: true, helperTextField: "Empty Title" });
    } else {
      API.graphql({
        query: createTask,
        variables: {
          input: { groupId: "001", title: timerTitle, duration: timerValue },
        },
      })
        .then((res) => {
          this.setState({ history: [...history, res.data.createTask] });
          this.handleStartTimer();
        })
        .catch((e) => console.log(e));
    }
  };

  render() {
    let {
      activated,
      currentTitle,
      current_task,
      errorTextField,
      helperText,
      helperTextField,
      history,
      initialized,
      paused,
      remained,
      timerTitle,
      timerValue,
    } = this.state;

    return (
      <>
        <Card sx={{ maxWidth: 360 }}>
          <CardMedia
            alt="paella"
            component="img"
            height="140"
            image="https://mui.com/static/images/cards/paella.jpg"
          />
          <CardContent>
            <TimerHistory
              activated={activated}
              current_task={current_task}
              history={history}
              initialized={initialized}
              paused={paused}
              remained={remained}
            />
            <TimerTitle activated={activated} taskTitle={currentTitle} />
            <Remained remained={remained} />
            <Timerform
              activated={activated}
              errorTextField={errorTextField}
              handleChangeSlider={this.handleChangeSlider}
              handleChangeTextField={this.handleChangeTextField}
              handleSubmit={this.handleSubmit}
              helperText={helperText}
              helperTextField={helperTextField}
              timerTitle={timerTitle}
              timerValue={timerValue}
            />
            <TimerControl
              activated={activated}
              handlePauseTimer={this.handlePauseTimer}
              handleResumeTimer={this.handleResumeTimer}
              handleStartTimer={this.handleSubmit}
              handleStopTimer={this.handleStopTimer}
              paused={paused}
            />
          </CardContent>
        </Card>
        <TimeUp open={remained <= 0} handleClose={this.handleStopTimer} />
      </>
    );
  }
}

export default withAuthenticator(TimerPannel);
