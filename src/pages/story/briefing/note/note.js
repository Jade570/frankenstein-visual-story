import { React } from "react";
import "./briefing.css";

const BriefNote = (props) => {
  if (props.showBriefNote) {
    return <div className="briefNote"></div>;
  } else {
    return <div></div>;
  }
};

export default BriefNote;
