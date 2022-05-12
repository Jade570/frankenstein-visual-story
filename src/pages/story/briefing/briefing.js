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

  const startingMsgFunc = () => {
    if (parseInt(props.day) === 1) {
      return "Good day, investigator. I am your AI assistant. \n I am here to help you investigate cases. \n I can find and analyze key images and videos. \n I hope I could help you a lot with your investigation.";
    } else {
      return "Good day, Ind. investigator! \n I have briefly analyzed today's case for you.";
    }
  };

  const startingMsg = startingMsgFunc();

  if (props.showBriefing) {
    return (
      <div className="briefing">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fai%2FAI_talking(no_background).gif?alt=media&token=26c39abd-275e-40df-876c-cb0212d1f290"
          style={{ width: "4em", height: "4em", objectFit: "cover" }}
        ></img>
        <div className="greeting">{startingMsg}</div>
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
