let TimerControl = (prop) => {
  let {
    handleStartTimer,
    handleStopTimer,
    handlePauseTimer,
    handleResumeTimer,
    activated,
    paused,
  } = prop;
  return (
    <div>
      <button onClick={handleStopTimer}>Stop</button>
      {!activated ? (
        <button onClick={handleStartTimer}>Start</button>
      ) : !paused ? (
        <button onClick={handlePauseTimer}>Pause</button>
      ) : (
        <button onClick={handleResumeTimer}>Resume</button>
      )}
    </div>
  );
};

export default TimerControl;
