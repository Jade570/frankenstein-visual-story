import { React, useRef, useState } from "react";

const App = (props) => {
  return (
    <div>
      <div className="Note"> lorem ipsum</div>
      <button onClick={props.func}>continue</button>
    </div>
  );
};

export default App;
