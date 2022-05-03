import { React, useEffect, useState } from "react";
import "./notes.css";

const App = (props) => {
  const [subject1, setSubject1] = useState("");
  const [subject2, setSubject2] = useState("");

  const click = () => {
    if (myAnswer === props.answer) {
      props.func;
    } else {
      return (
        <p>
          Umm… Maybe I guessed the wrong answer. I should consider the clues
          again.{" "}
        </p>
      );
    }
  };

  useEffect(() => {
    setSubject1(props.notes[0][props.myAnswer[0] - 1]);
  }, [props.myAnswer[0]]);

  useEffect(() => {
    setSubject2(props.notes[1][props.myAnswer[1] - 1]);
  }, [props.myAnswer[1]]);

  return (
    <div className="Notes">
      <div className="Note">
        <p>{subject1}</p>
        <p>{subject2}</p>
      </div>
      <button onClick={click}>continue</button>
    </div>
  );
};

export default App;
