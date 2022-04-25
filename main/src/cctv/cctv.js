import { React, useState, forwardRef } from "react";
import Frames from "./frames/frames";
import ProgressBar from "./progressBar/progressBar";

const Cctv = forwardRef((props, ref) => {
  const [frame, setFrame] = useState(0);

  if (props.showCctv) {
    return (
      <div ref={ref}>
        <Frames frame={frame} />
        <ProgressBar frame={frame} setFrame={setFrame} />
      </div>
    );
  } else {
    return <div ref={ref}></div>;
  }
});

export default Cctv;
