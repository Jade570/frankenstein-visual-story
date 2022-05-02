import { React, useState, forwardRef } from "react";
import Frames from "./frames/frames";
import ProgressBar from "./progressBar/progressBar";

const Cctv = (props) => {
  const [frame, setFrame] = useState(0);

  return (
    <div>
      <Frames
        frame={frame}
        data={props.data}
        background={props.background}
        object={props.object}
      />
      <ProgressBar
        frame={frame}
        setFrame={setFrame}
        frameNum={props.data.frames}
      />
    </div>
  );
};

export default Cctv;
