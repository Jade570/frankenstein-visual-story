import { React, useState, forwardRef } from "react";
import Frames from "./frames/frames";
import ProgressBar from "./progressBar/progressBar";
//import "./cctv.css";

const Cctv = () => {
  const [frame, setFrame] = useState(0);

  return (
    <div className="Cctv">
      <Frames frame={frame} />
      <ProgressBar frame={frame} setFrame={setFrame} />
    </div>
  );
};

export default Cctv;
