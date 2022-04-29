import { React, useState, forwardRef } from "react";
import Frames from "./frames/frames";
import ProgressBar from "./progressBar/progressBar";
//import "./cctv.css";

const Cctv = (props) => {
  const [frame, setFrame] = useState(0);

  return (
    <div className="Cctv">
      <Frames frame={frame} data={props.data} />
      <ProgressBar
        frame={frame}
        setFrame={setFrame}
        frameNum={props.data.frames}
      />
    </div>
  );
};

export default Cctv;
