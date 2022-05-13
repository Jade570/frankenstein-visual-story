import { React } from "react";
import { useNavigate } from "react-router-dom";
import "./result.css";

const Result = (props) => {
  const navigate = useNavigate();
  const buttonFunc = () => {
    if (props.day < 4) {
      const nextPage = ["/day/", parseInt(props.day) + 1].join("");
      window.location.pathname = nextPage;
    } else if (parseInt(props.day) === 4) {
      window.location.pathname = "/ending";
      // navigate("/ending", { replace: true });
    } else if (parseInt(props.day) === 5) {
      window.location.pathname = "/true-ending";
      // navigate("/true-ending", { replace: true });
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
