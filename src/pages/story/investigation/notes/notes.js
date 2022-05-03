import { React } from "react";
import "./notes.css";

const App = (props) => {
  const click = () => {
    if (props.myAnswer === props.answer) {
      props.func();
    } else {
      return (
        <p>
          Umm… Maybe I guessed the wrong answer. I should consider the clues
          again.{" "}
        </p>
      );
    }
  };

  return (
    <div className="Notes">
      <div className="Note">
        <p>{props.notes[0][props.myAnswer[0] - 1]}</p>
        <p>{props.notes[1][props.myAnswer[1] - 1]}</p>
      </div>
      <button onClick={click} disabled={props.myAnswer !== [0, 0]}>
        continue
      </button>
    </div>
  );
};

export default App;
