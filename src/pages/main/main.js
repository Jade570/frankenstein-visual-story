import React from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";

const Main = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="Main"
      onClick={() => {
        navigate("/prologue");
      }}
    >
      <img
        style={{ objectFit: "contain", width: "80vw" }}
        src="https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fnormal%2Fintro_nobg.png?alt=media&token=e3359505-ee07-4786-99e5-576a6ddf4316"
      ></img>
      <h2>click anywhere to start</h2>
    </div>
  );
};

export default Main;
