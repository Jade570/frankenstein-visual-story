import { React } from "react";
import Cctv from "./cctv/cctv.js";
import Notes from "./notes/notes.js";
import "./investigation.css";

const Investigation = (props) => {
  if (props.showInvestigation) {
    return (
      <div className="Investigation">
        <div className="Cctv">
          <Cctv
            className="Cctv"
            data={props.data}
            background={props.background}
            object={props.object}
            suggestion1={props.suggestion1}
            suggestion2={props.suggestion2}
          />
        </div>

        <Notes className="Notes" data={props.data.notes} func={props.func} />
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default Investigation;
