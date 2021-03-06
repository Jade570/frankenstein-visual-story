import { React, useState, useEffect } from "react";
import "./progressBar.css";

const ProgressBar = ({ frame, setFrame, frameNum }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const frameRate = 300;

  const reset = () => {
    setTime(0);
    setFrame(0);
    setRunning(false);
  };

  if (time === frameNum) {
    setRunning(false);
    setTime((prevTime) => prevTime + 1);
  }

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => parseInt(prevTime) + 1);
        setFrame((prevFrame) => parseInt(prevFrame) + 1);
      }, frameRate);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="progressBar">
      <div className="slider">
        <input
          type="range"
          min={0}
          max={frameNum}
          step={1}
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
            setFrame(e.target.value);
          }}
        />
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            if (frame === frameNum) {
              reset();
            }
            setRunning(true);
          }}
        >
          Start
        </button>
        <button onClick={() => setRunning(false)}>Pause</button>
        <button onClick={() => reset()}>Stop</button>
      </div>
      <div>frame {parseInt(frame) + 1} in CCTV</div>
    </div>
  );
};

export default ProgressBar;
