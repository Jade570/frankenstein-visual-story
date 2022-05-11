import { React, useState, useEffect } from "react";
import "./conclusion.css";

const blockedText = {
  width: "85%",
  minHeight: "30vh",
  marginTop: "3vh",
  padding: "3%",
  textAlign: "center",
  border: "2px solid white",
  opacity: "0.5",
  marginLeft: "auto",
  marginRight: "auto",
  transition: "opacity 0.5s",
};

const currentText = {
  width: "85%",
  minHeight: "30vh",
  marginTop: "3vh",
  padding: "3%",
  textAlign: "center",
  border: "2px solid white",
  opacity: "1",
  marginLeft: "auto",
  marginRight: "auto",
  transition: "opacity 0.5s",
};

const Conclusion = (props) => {
  const [speechNum, setSpeechNum] = useState(0);
  const [aiNum, setAiNum] = useState(-1);
  const [AiText, setAiText] = useState("");
  const [Playertext, setPlayerText] = useState("");
  const [aiImg, setAiImg] = useState("");
  const [isCurrentAi, setIsCurrentAi] = useState(false);

  const click = () => {
    if (speechNum >= props.data.length - 1) {
      props.func();
    } else {
      setSpeechNum((num) => num + 1);
    }
  };

  useEffect(() => {
    if (speechNum > -1) {
      if (props.data[speechNum].speaker === "ai") {
        setIsCurrentAi(true);
        setAiText(props.data[speechNum].text);
        setAiNum((num) => num + 1);
        props.setConclusionState(aiNum);
        setAiImg(
          "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fai%2FAI_talking(no_background).gif?alt=media&token=26c39abd-275e-40df-876c-cb0212d1f290"
        );
      } else {
        setIsCurrentAi(false);
        setPlayerText(props.data[speechNum].text);
        setAiImg(
          "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fai%2FAI_blinking(no_background).gif?alt=media&token=fffa9b18-3fd5-4a64-92af-cef43f3b5b40"
        );
      }
    }
    console.log(speechNum);
  }, [speechNum]);

  if (props.showConclusion) {
    return (
      <div className="Conclusion" onClick={click}>
        <img className="Ai" src={aiImg}></img>
        <div className="AiText" style={isCurrentAi ? currentText : blockedText}>
          {AiText}
        </div>
        <div
          className="PlayerText"
          style={!isCurrentAi ? currentText : blockedText}
        >
          {Playertext}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Conclusion;
