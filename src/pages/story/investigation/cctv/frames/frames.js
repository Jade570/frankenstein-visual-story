import { React } from "react";
import "./frames.css";

const Frames = (props) => {
  console.log(props.data.objects[props.frame]);
  return (
    <div className="container">
      <img className="background" src={props.data.background}></img>
      <img className="objects" src={props.data.objects[props.frame]}></img>
    </div>
  );
};

export default Frames;
