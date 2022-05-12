import { React, useState, useEffect, useRef } from "react";
import "./frames.css";
import MyModal from "./suggestion/suggestion.js";

const Frames = (props) => {
  const object = props.object.filter((c, index) => {
    return props.object.indexOf(c) === index;
  });
  object.sort();

  const [sugg1, setSugg1] = useState(false);
  const [sugg2, setSugg2] = useState(false);

  const [showHidden, setShowHidden] = useState(false);
  const timeout = useRef(null);

  const handleDay5Suggestion = () => {
    setSugg1(true);
    setSugg2(false);
    timeout.current = setTimeout(() => {
      setShowHidden(true);
    }, 16000);
  };

  const handleSuggestion1 = () => {
    setSugg1(true);
    setSugg2(false);
  };
  const handleSuggestion2 = () => {
    setSugg1(false);
    setSugg2(true);
  };
  const closeAll = () => {
    setSugg1(false);
    setSugg2(false);
    props.setClueState(-1);
  };

  useEffect(() => {
    if (sugg1) {
      props.setClueState(0);
    }
  }, [sugg1]);

  useEffect(() => {
    if (sugg2) {
      props.setClueState(1);
    }
  }, [sugg2]);

  if (parseInt(props.day.day) === 5) {
    return (
      <div>
        <div className="container">
          <img className="background" src={props.background}></img>
          <img
            className="objects"
            src={object[props.frame]}
            onClick={closeAll}
          ></img>
          <div
            className="suggestion1"
            onClick={handleDay5Suggestion}
            style={{
              gridColumn: props.grid1[props.frame].column,
              gridRow: props.grid1[props.frame].row,
            }}
          ></div>
        </div>
        <MyModal
          isOpen={sugg1}
          suggestion={props.suggestion1}
          myAnswer={props.myAnswer}
          setMyAnswer={props.setMyAnswer}
          number={parseInt(0)}
          closeAll={closeAll}
          func={props.func}
          showHidden={showHidden}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className="container">
          <img className="background" src={props.background}></img>
          <img
            className="objects"
            src={object[props.frame]}
            onClick={closeAll}
          ></img>
          <div
            className="suggestion1"
            onClick={handleSuggestion1}
            style={{
              gridColumn: props.grid1[props.frame].column,
              gridRow: props.grid1[props.frame].row,
            }}
          ></div>
          <div
            className="suggestion2"
            onClick={handleSuggestion2}
            style={{
              gridColumn: props.grid2[props.frame].column,
              gridRow: props.grid2[props.frame].row,
            }}
          ></div>
        </div>
        <MyModal
          isOpen={sugg1}
          suggestion={props.suggestion1}
          myAnswer={props.myAnswer}
          setMyAnswer={props.setMyAnswer}
          number={parseInt(0)}
          closeAll={closeAll}
        />
        <MyModal
          isOpen={sugg2}
          suggestion={props.suggestion2}
          myAnswer={props.myAnswer}
          setMyAnswer={props.setMyAnswer}
          number={parseInt(1)}
          closeAll={closeAll}
        />
      </div>
    );
  }
};

export default Frames;
