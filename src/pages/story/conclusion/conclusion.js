import React from "react";

const Conclusion = (props) => {
  if (props.showConclusion) {
    return <div className="Conclusion">hello</div>;
  } else {
    return <div></div>;
  }
};

export default Conclusion;
