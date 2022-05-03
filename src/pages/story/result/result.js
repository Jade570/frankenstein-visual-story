import { React } from "react";
import { useNavigate } from "react-router-dom";
import "./result.css";

const Result = (props) => {
  const navigate = useNavigate();
  const buttonFunc = () => {
    if (props.day < 4) {
      const nextPage = ["/day/", parseInt(props.day) + 1].join("");
      navigate(nextPage);
    } else if (props.day === 4) {
      navigate("/ending");
    } else if (props.day === 5) {
      navigate("/true-ending");
    }
  };

  if (props.showResult) {
    return (
      <div className="Result">
        <div className="Report">{props.data}</div>
        <button onClick={buttonFunc}>continue</button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Result;
