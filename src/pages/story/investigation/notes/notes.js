import { React, useEffect, useState } from "react";
import "./notes.css";

const App = (props) => {
  const [allowClick, setAllowClick] = useState(false);
  const [showError, setShowError] = useState(false);
  const click = () => {
    if (
      props.myAnswer[0] === props.answer[0] &&
      props.myAnswer[1] === props.answer[1]
    ) {
      props.func();
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    setShowError(false);
    if (props.myAnswer[0] !== -1 && props.myAnswer[1] !== -1) {
      setAllowClick(true);
    }
  }, [props.myAnswer]);

  return (
    <div className="Notes">
      <div className="Note">
        <p>{props.notes[0][props.myAnswer[0] - 1]}</p>
        <p>{props.notes[1][props.myAnswer[1] - 1]}</p>
      </div>
      <button
        onClick={() => {
          if (allowClick) {
            click();
          }
        }}
        style={
          !allowClick
            ? {
                backgroundColor: "#ccc",
                cursor: "default",
              }
            : {}
        }
      >
        continue
      </button>
      {showError && (
        <p>
          Umm… Maybe I guessed the wrong answer. I should consider the clues
          again.
        </p>
      )}
    </div>
  );
};

export default App;
