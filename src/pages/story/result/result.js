import React from "react";

const Result = (props) => {
  if (props.showResult) {
    return <div className="Result">hello</div>;
  } else {
    return <div></div>;
  }
};

export default Result;
