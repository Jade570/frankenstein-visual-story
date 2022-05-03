import { React, useState } from "react";
import "./frames.css";
import MyModal from "./suggestion/suggestion.js";

const Frames = (props) => {
  const object = props.object.filter((c, index) => {
    return props.object.indexOf(c) === index;
  });
  object.sort();

  const [sugg1, setSugg1] = useState(false);
  const [sugg2, setSugg2] = useState(false);
  const handleSuggestion1 = () => {
    setSugg1(true);
    setSugg2(false);
  };
  const handleSuggestion2 = () => {
    setSugg1(false);
    setSugg2(true);
  };

  return (
    <div className="container">
      <img className="background" src={props.background}></img>
      <img className="objects" src={object[props.frame]}></img>
      <div className="suggestion1" onClick={handleSuggestion1}></div>
      <div className="suggestion2" onClick={handleSuggestion2}></div>
      <MyModal isOpen={sugg1} suggestion={props.suggestion1} />
      <MyModal isOpen={sugg2} suggestion={props.suggestion2} />
    </div>
  );
};

export default Frames;
