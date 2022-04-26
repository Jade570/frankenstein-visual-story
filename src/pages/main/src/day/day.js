import { React } from "react";
import "./day.css";

const Day = ({ func }) => {
  return (
    <div className="day">
      <h1>Day 1</h1>
      <button onClick={func}>Continue</button>
    </div>
  );
};

export default Day;
