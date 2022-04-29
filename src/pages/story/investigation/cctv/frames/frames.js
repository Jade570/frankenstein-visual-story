import { React } from "react";
//import "./frames.css";

const Frames = (props) => {
  console.log(props.frame);
  return (
    <div
      style={{
        width: "63vw",
        height: "42vw",
        maxWidth: "1080px",
        maxHeight: "720px",
        marginRight: "auto",
        border: "3px solid white",
        position: "relative",
        zIndex: 0,
      }}
    >
      <img
        className="frame"
        src={props.data.background}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      ></img>
      <img
        src={props.data.objects[props.frame]}
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
