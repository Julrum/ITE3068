let TimerControl = (prop) => {
  let { handleStartTimer, handleStopTimer } = prop;
  return (
    <div>
      <button onClick={handleStopTimer}>Stop</button>
      <button onClick={handleStartTimer}>Start</button>
    </div>
  );
};

export default TimerControl;
