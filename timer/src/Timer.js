let Timer = ({ remained }) => (
  <div>
    <h1>
      {Math.floor(remained / 60)} : {remained % 60 < 10 ? "0" : ""}
      {remained % 60}
    </h1>
  </div>
);

export default Timer;
