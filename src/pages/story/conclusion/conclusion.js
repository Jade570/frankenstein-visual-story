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
  const [aiSpeakingNum, setAiSpeakingNum] = useState(-1);
  const [AiText, setAiText] = useState("");
  const [Playertext, setPlayerText] = useState("");
  const [aiImg, setAiImg] = useState("");
  const [isCurrentAi, setIsCurrentAi] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const thinking = new Audio(
    "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/sfx%2Fthinking.mp3?alt=media&token=a5e719ca-f34e-4a59-856e-9be4f938eb26"
  );

  const click = () => {
    if (
      props.data[speechNum].speaker === "ai" &&
      props.data[speechNum].img === "thinking"
    ) {
    } else {
      if (speechNum >= props.data.length - 1) {
        props.func();
      } else {
        setSpeechNum((num) => num + 1);
      }
    }
  };

  useEffect(() => {
    if (speechNum > -1) {
      if (props.data[speechNum].speaker === "ai") {
        setIsCurrentAi(true);
        if (props.data[speechNum].img === "thinking") {
          setIsThinking(true);
          setAiText(props.data[speechNum - 1].text);
          setAiImg(
            "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fai%2FAI_thinking(no_bg).gif?alt=media&token=d7319ccf-e582-4275-b06c-19c0f6bfdac6"
          );
          thinking.play();
          thinking.addEventListener("ended", () => {
            if (speechNum >= props.data.length - 1) {
              props.func();
            } else {
              setSpeechNum((num) => num + 1);
            }
          });
        } else {
          //talking
          setIsThinking(false);
          setAiText(props.data[speechNum].text);
          setAiSpeakingNum((num) => num + 1);
          props.setConclusionState(aiSpeakingNum + 1);
          setAiImg(
            "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fai%2FAI_talking(no_background).gif?alt=media&token=26c39abd-275e-40df-876c-cb0212d1f290"
          );
        }
      } else {
        //blinking
        setIsCurrentAi(false);
        setIsThinking(false);
        setPlayerText(props.data[speechNum].text);
        setAiImg(
          "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fai%2FAI_blinking(no_background).gif?alt=media&token=fffa9b18-3fd5-4a64-92af-cef43f3b5b40"
        );
      }
    }
  }, [speechNum]);

  if (props.showConclusion) {
    return (
      <div className="Conclusion" onClick={click}>
        <img className="Ai" src={aiImg}></img>
        <div className="texts">
          <div
            className="AiText"
            style={isCurrentAi && !isThinking ? currentText : blockedText}
          >
            <span>{AiText}</span>
          </div>
          <div
            className="PlayerText"
            style={!isCurrentAi ? currentText : blockedText}
          >
            <span>{Playertext}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Conclusion;
