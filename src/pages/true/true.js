import React from "react";

const True = (props) => {
  return (
    <div
      className="True"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        {" "}
        <video
          controls
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/Ending%20Video%20-%202nd%20draft.mp4?alt=media&token=f7f49c8c-92e9-4d6c-8795-57f0ffee74d8"
            type="video/mp4"
          ></source>
        </video>
      </div>
    </div>
  );
};

export default True;
