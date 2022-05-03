import { React, useRef, useState } from "react";
import "./notes.css";

const App = (props) => {
  return (
    <div className="Notes">
      <div className="Note"> lorem ipsum</div>
      <button onClick={props.func}>continue</button>
    </div>
  );
};

export default App;
