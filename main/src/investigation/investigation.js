import { React } from "react";
import Cctv from "./cctv/cctv.js";
import Notes from "./notes/notes.js";
import "./investigation.css";

const Investigation = (props) => {
  if (props.showInvestigation) {
    return (
      <div className="Investigation">
        <Cctv className="Cctv" />
        <Notes className="Notes" />
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default Investigation;
