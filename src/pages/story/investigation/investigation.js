import { React } from "react";
import Cctv from "./cctv/cctv.js";
import Notes from "./notes/notes.js";
import "./investigation.css";

const Investigation = (props) => {
  if (props.showInvestigation) {
    return (
      <div className="Investigation">
        <div className="Cctv">
          <Cctv className="Cctv" data={props.data.cctv} />
        </div>

        <Notes className="Notes" data={props.data.notes} />
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default Investigation;
