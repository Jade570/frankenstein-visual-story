import { React } from "react";
//import "./frames.css";

const image = [
  require("./rabbit/1.jpg"),
  require("./rabbit/2.jpg"),
  require("./rabbit/3.jpg"),
  require("./rabbit/4.jpg"),
];

var ctx = document.createElement("canvas").getContext("2d");

const onclick = (event) => {
  // Get click coordinates
  var x = event.pageX - this.offsetLeft,
    y = event.pageY - this.offsetTop,
    w = (ctx.canvas.width = this.width),
    h = (ctx.canvas.height = this.height),
    alpha;

  // Draw image to canvas
  // and read Alpha channel value
  ctx.drawImage(this, 0, 0, w, h);
  alpha = ctx.getImageData(x, y, 1, 1).data[3]; // [0]R [1]G [2]B [3]A

  // If pixel is transparent,
  // retrieve the element underneath and trigger it's click event
  if (alpha === 0) {
  } else {
    console.log("LOGO clicked!");
  }
};

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
      <img
        className="frame"
        src={image[frame.frame % 4]}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      ></img>
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
