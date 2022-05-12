import { React, useEffect, useState } from "react";
import "./notes.css";

const App = (props) => {
  const [allowClick, setAllowClick] = useState(false);
  const [showError, setShowError] = useState(false);

  let note1;
  let note2;

  const click = () => {
    let AnswerCheck = new Array(props.answer.length).fill(false);
    const checkAnswer = (ans) => {
      return ans === true;
    };
    props.myAnswer.forEach((item, idx) => {
      if (item === props.answer[idx]) AnswerCheck[idx] = true;
    });
    if (AnswerCheck.every(checkAnswer)) {
      props.func();
    } else {
      setShowError(true);
    }
  };

  const reset1 = () => {
    props.setMyAnswer((prevShowNote) => {
      prevShowNote[0] = -1;
      return prevShowNote;
    });
  };

  const reset2 = () => {
    props.setMyAnswer((prevShowNote) => {
      prevShowNote[1] = -1;
      return prevShowNote;
    });
    console.log(props.myAnswer);
  };

  useEffect(() => {
    setShowError(false);
    const checkNull = (myAns) => {
      return myAns !== -1;
    };

    if (props.myAnswer[0] !== -1) {
      note1 = props.notes[0][props.myAnswer[0] - 1];
    } else {
      note1 = "";
    }

    if (props.myAnswer.every(checkNull)) {
      setAllowClick(true);
    }
    console.log(note1);
  }, [props.myAnswer]);

  return (
    <div className="Notes">
      <div className="Note">
        <p onClick={reset1}>{note1}</p>
        <p onClick={reset2}>{props.notes[1] ? note2 : ""}</p>
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
                opacity: 1,
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
