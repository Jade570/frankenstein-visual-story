import { React, useState } from "react";
import "./suggestion.css";

const MyModal = (props) => {
  if (props.isOpen) {
    return (
      <div className="modal">
        <div className="imgBox">
          <img
            src={props.suggestion[0]}
            style={{ border: "5px solid green", margin: "10px" }}
          ></img>
          <img
            src={props.suggestion[1]}
            style={{ border: "5px solid yellow", margin: "10px" }}
          ></img>
          <img
            src={props.suggestion[2]}
            style={{ border: "5px solid red", margin: "10px" }}
          ></img>
        </div>
      </div>
    );
  }
};

export default MyModal;
