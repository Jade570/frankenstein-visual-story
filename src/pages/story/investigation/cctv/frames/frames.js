import { React } from "react";
import "./frames.css";

const Frames = (props) => {
  const object = props.object.filter((c, index) => {
    return props.object.indexOf(c) === index;
  });
  object.sort();
  console.log(object);
  return (
    <div className="container">
      <img className="background" src={props.background}></img>
      <img className="objects" src={object[props.frame]}></img>
      <div className="subject"></div>
    </div>
  );
};

export default Frames;
