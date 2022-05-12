import { React, useState } from "react";
import Frames from "./frames/frames";
import ProgressBar from "./progressBar/progressBar";

const Cctv = (props) => {
  const [frame, setFrame] = useState(0);

  return (
    <div>
      <Frames
        frame={frame}
        data={props.data.cctv}
        background={props.background}
        object={props.object}
        suggestion1={props.suggestion1}
        suggestion2={props.suggestion2}
        grid1={props.data.grid.suggestion1}
        grid2={props.data.grid.suggestion2}
        myAnswer={props.myAnswer}
        setMyAnswer={props.setMyAnswer}
        clueState={props.clueState}
        setClueState={props.setClueState}
        day={props.day}
      />
      <ProgressBar
        frame={frame}
        setFrame={setFrame}
        frameNum={props.data.cctv.frames - 1}
      />
    </div>
  );
};

export default Cctv;
