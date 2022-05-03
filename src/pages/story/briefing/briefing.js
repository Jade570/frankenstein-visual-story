import { React, useEffect, useState } from "react";
import "./briefing.css";
import BriefNote from "./note/note.js";

const Briefing = (props) => {
  const data = props.data;
  const [showBriefNote, setShowBriefNote] = useState(false);
  const buttonFunc = () => {
    if (showBriefNote === false) {
      setShowBriefNote(true);
      props.playBrief();
    } else {
      props.stopAll();
      props.func();
    }
  };

  if (props.showBriefing) {
    return (
      <div className="briefing">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fai%2FAI_talking(no_background).gif?alt=media&token=26c39abd-275e-40df-876c-cb0212d1f290"
          style={{ width: "4em", height: "4em", objectFit: "cover" }}
        ></img>
        <div className="greeting">
          Good day, Ind. investigator! <br />I have briefly analyzed today's
          case for you.
        </div>
        <BriefNote
          showBriefNote={showBriefNote}
          data={data}
          image={props.image}
        />
        <button onClick={buttonFunc}>Continue</button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Briefing;
