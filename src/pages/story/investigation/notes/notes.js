import { React, useEffect, useState } from "react";
import "./notes.css";

const App = (props) => {
  const [allowClick, setAllowClick] = useState(false);
  const [showError, setShowError] = useState(false);
  const [note1, setNote1] = useState(null);
  const [note2, setNote2] = useState(null);

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
    setNote1(null);
    setAllowClick(false);
  };

  const reset2 = () => {
    props.setMyAnswer((prevShowNote) => {
      prevShowNote[1] = -1;
      return prevShowNote;
    });
    setNote2(null);
    console.log(props.myAnswer);
    setAllowClick(false);
  };

  useEffect(() => {
    setShowError(false);
    const checkNull = (myAns) => {
      return myAns !== -1;
    };

    if (props.myAnswer[0] !== -1) {
      setNote1(props.notes[0][props.myAnswer[0] - 1]);
    } else {
      setNote1(null);
    }
    if (props.myAnswer[1] !== -1 && props.myAnswer[1]) {
      setNote2(props.notes[1][props.myAnswer[1] - 1]);
    } else {
      setNote2(null);
    }

    if (props.myAnswer.every(checkNull)) {
      setAllowClick(true);
    } else {
      setAllowClick(false);
    }
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
