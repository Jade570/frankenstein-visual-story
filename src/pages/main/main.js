import React from "react";
import { Link } from "react-router-dom";

const Main = (props) => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div>
        <h1>AI Knows The Answer</h1>
        <Link to="/prologue">Start</Link>
      </div>
    </div>
  );
};

export default Main;
