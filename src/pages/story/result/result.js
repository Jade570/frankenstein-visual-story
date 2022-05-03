import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Result = (props) => {
  const navigate = useNavigate();
  const buttonFunc = () => {
    if (props.day < 4) {
      const nextPage = ["/day/", parseInt(props.day + 1)].join("");
      Navigate(nextPage);
    } else if (props.day === 4) {
      Navigate("/normal");
    } else if (props.day === 5) {
      Navigate("/true");
    }
  };

  if (props.showResult) {
    return (
      <div className="Result">
        {props.data}
        <button>onClick={buttonFunc}</button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Result;
