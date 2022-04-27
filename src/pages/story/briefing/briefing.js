import { React, useState } from "react";
import "./briefing.css";
import BriefNote from "./note/note.js";

const Briefing = (props) => {
  const noteJson = props.json.briefing;
  const [showBriefNote, setShowBriefNote] = useState(false);
  const buttonFunc = () => {
    if (showBriefNote === false) {
      setShowBriefNote(true);
    } else {
      props.func();
    }
  };
  if (props.showBriefing) {
    return (
      <div className="briefing">
        <div className="greeting">
          Good day, Ind. investigator! <br />I have briefly analyzed today's
          case for you.
        </div>
        <BriefNote showBriefNote={showBriefNote} json={noteJson} />
        <button onClick={buttonFunc}>Continue</button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Briefing;
