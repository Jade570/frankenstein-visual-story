import { React } from "react";
import "./day.css";

const Day = (props) => {
  return (
    <div className="day">
      <div className="padding"></div>
      <h1>Day {props.day}</h1>
      <button onClick={props.func}>Continue</button>
    </div>
  );
};

export default Day;
