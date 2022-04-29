import { React } from "react";
//import "./frames.css";

var ctx = document.createElement("canvas").getContext("2d");

const Frames = (frame) => {
  return (
    <div
      style={{
        width: "63vw",
        height: "42vw",
        maxWidth: "1080px",
        maxHeight: "720px",
        marginRight: "auto",
        border: "3px solid black",
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* <img
        className="frame"
        src={image[frame.frame % 4]}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      ></img> */}
      <img
        src={require("./sample1.png")}
        style={{
          width: "100%",
          height: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          objectFit: "cover",
          zIndex: 2,
          position: "relative",
          top: "-101%",
        }}
      ></img>
    </div>
  );
};

export default Frames;
