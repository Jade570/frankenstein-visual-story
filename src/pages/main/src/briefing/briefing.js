import { React } from "react";
import "./briefing.css";

const Briefing = (props) => {
  if (props.showBriefing) {
    return (
      <div className="briefing">
        <div>
          briefing contents blah blah blah lorem ipsum whatever blahblah{" "}
        </div>
        <button onClick={props.func}>Continue</button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Briefing;
