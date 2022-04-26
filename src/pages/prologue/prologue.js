import { React, useState } from "react";

const btnStyle = {
  cursor: "pointer",
};

const box_active = {
  width: "100%",
  height: "100%",
  position: "absolute",
  background: "grey",
  opacity: "1",
  transition: "opacity 1500ms, visibility 1500ms",
};

const box_hidden = {
  width: "100%",
  height: "100%",
  position: "absolute",
  background: "grey",
  visibility: "hidden",
  opacity: "0",
  transition: "opacity 1500ms,visibility 1500ms",
};

const FadeInOut = () => {
  const [click, setClick] = useState(parseInt(0));
  const handleClick = () => {
    setClick((click) => (click += 1));
  };
  return (
    <div>
      <div className="section1">
        <div onClick={handleClick} style={btnStyle}>
          <img
            src={require("./rabbit/1.jpg")}
            style={click === 0 ? box_active : box_hidden}
          ></img>
          <img
            src={require("./rabbit/2.jpg")}
            style={click === 1 ? box_active : box_hidden}
          ></img>
          <img
            src={require("./rabbit/3.jpg")}
            style={click === 2 ? box_active : box_hidden}
          ></img>
          <img
            src={require("./rabbit/4.jpg")}
            style={click === 3 ? box_active : box_hidden}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default FadeInOut;
