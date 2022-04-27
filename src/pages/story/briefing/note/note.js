import { React, useState } from "react";

const BriefNote = (props) => {
  if (props.showBriefNote) {
    return (
      <div className="briefNote">
        <div>장소: {props.json.explanation.place}</div>
        <div>종류: {props.json.explanation.case}</div>
        <div>
          {props.json.cctv.map((item, idx) => {
            const imageURI = require(`${item.thumbnail}`);
            const name = item.place;
            return (
              <div style={{ textAlign: "center" }}>
                <div>{name}</div>
                <img src={imageURI} width={200} />
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default BriefNote;
