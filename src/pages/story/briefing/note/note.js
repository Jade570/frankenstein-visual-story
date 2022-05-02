import { React } from "react";

const BriefNote = (props) => {
  if (props.showBriefNote) {
    return (
      <div className="briefNote">
        <div>Case Summary: {props.data.description}</div>
        <div>Scene: {props.data.scene}</div>
        <div>Type of the crime: {props.data.type}</div>
        <div>Associated people: {props.data.people}</div>
        <div>
          <div>CCTV location: {props.data.source.location}</div>
          <img src={props.image}></img>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default BriefNote;
