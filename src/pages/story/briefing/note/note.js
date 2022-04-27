import { React, useState } from "react";

const BriefNote = (props) => {
  const cctvThumbnail = props.json.cctv.map((x) => {
    return (
      <div>
        <div>촬영 장소: {x.place}</div>
        {<img src={x.thumbnail}></img>}
      </div>
    );
  });
  console.log(cctvThumbnail);
  if (props.showBriefNote) {
    return (
      <div className="briefNote">
        <div>장소: {props.json.explanation.place}</div>
        <div>종류: {props.json.explanation.case}</div>
        {cctvThumbnail.map((x) => x)}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default BriefNote;
