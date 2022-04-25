import { React } from "react";
import "./frames.css";

const image = [
  require("./rabbit/1.jpg"),
  require("./rabbit/2.jpg"),
  require("./rabbit/3.jpg"),
  require("./rabbit/4.jpg"),
];

const Frames = (frame) => {
  return (
    <div className="frame">
      <img src={image[frame.frame % 4]}></img>
    </div>
  );
};

export default Frames;
