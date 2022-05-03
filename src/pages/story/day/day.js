import { React } from "react";
import "./day.css";

const Day = (props) => {
  const onClick = () => {
    props.func();
  };

  return (
    <div className="day">
      <div className="padding"></div>
      <h1>Day {props.day}</h1>
      <button onClick={onClick}>Continue</button>
    </div>
  );
};

export default Day;
