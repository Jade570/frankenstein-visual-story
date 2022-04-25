import { React, forwardRef } from "react";
import "./briefing.css";

const Briefing = forwardRef((props, ref) => {
  if (props.showBriefing) {
    return (
      <div ref={ref} className="briefing">
        <div>
          briefing contents blah blah blah lorem ipsum whatever blahblah{" "}
        </div>
        <button onClick={props.func}>Continue</button>
      </div>
    );
  } else {
    return <div ref={ref}></div>;
  }
});

export default Briefing;
