import { React, useState } from "react";
import "./briefing.css";

const Briefing = (props) => {
  const [showBriefNote, setShowBriefNote] = useState(false);
  if (props.showBriefing) {
    return (
      <div className="briefing">
        <div className="greeting">
          Good day, Ind. investigator! <br />I have briefly analyzed today's
          case for you.
        </div>
        <button onClick={props.func}>Continue</button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Briefing;
