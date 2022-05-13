import { React, useEffect, useState } from "react";
import * as Scroll from "react-scroll";
import { useNavigate } from "react-router-dom";
import "./result.css";

const Result = (props) => {
  const navigate = useNavigate();
  const [day4, setDay4] = useState(false);

  const scroll = Scroll.animateScroll;

  const buttonFunc = () => {
    if (props.day < 4) {
      const nextPage = ["/day/", parseInt(props.day) + 1].join("");
      window.location.pathname = nextPage;
    } else if (parseInt(props.day) === 4) {
      setDay4(true);
      props.bgm.pause();
      props.stopAll();
    } else if (parseInt(props.day) === 5) {
      window.location.pathname = "/true-ending";
    }
  };

  useEffect(() => {
    if (day4) {
      props.bgm.pause();
      props.stopAll();
      scroll.scrollToTop({ duration: 0 });
      navigate("/ending", { replace: true });
    }
  }, [day4]);

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
