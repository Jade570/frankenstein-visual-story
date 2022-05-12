import { React, useState, useEffect } from "react";
import Cctv from "./cctv/cctv.js";
import Notes from "./notes/notes.js";
import "./investigation.css";

const Investigation = (props) => {
  const [myAnswer, setMyAnswer] = useState([-1, -1]);
  useEffect(() => {
    if (parseInt(props.day.day) === 5) {
      setMyAnswer([-1]);
    }
  }, []);

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
            day={props.day}
            myAnswer={myAnswer}
            setMyAnswer={setMyAnswer}
            clueState={props.clueState}
            setClueState={props.setClueState}
          />
        </div>

        <Notes
          className="Notes"
          notes={props.data.notes}
          func={props.func}
          myAnswer={myAnswer}
          setMyAnswer={setMyAnswer}
          answer={props.data.answer}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default Investigation;
