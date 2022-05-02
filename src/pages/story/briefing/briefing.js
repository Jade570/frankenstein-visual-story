import { React, useEffect, useState } from "react";
import "./briefing.css";
import BriefNote from "./note/note.js";
import ai from "./ai.gif";
import { ref, listAll, getDownloadURL, list } from "firebase/storage";

const Briefing = (props) => {
  const data = props.data;
  const [showBriefNote, setShowBriefNote] = useState(false);
  const buttonFunc = () => {
    if (showBriefNote === false) {
      setShowBriefNote(true);
    } else {
      props.func();
    }
  };

  const path = ["image/case", props.day, "/", "Background.png"].join("");
  const imageRef = ref(props.storage, path);
  const [briefNoteImage, setBriefNoteImage] = useState("");
  useEffect(() => {
    getDownloadURL(imageRef).then((url) => {
      setBriefNoteImage(url);
    });
  }, []);

  if (props.showBriefing) {
    return (
      <div className="briefing">
        <img
          src={ai}
          style={{ width: "4em", height: "4em", objectFit: "cover" }}
        ></img>
        <div className="greeting">
          Good day, Ind. investigator! <br />I have briefly analyzed today's
          case for you.
        </div>
        <BriefNote
          showBriefNote={showBriefNote}
          data={data}
          image={briefNoteImage}
        />
        <button onClick={buttonFunc}>Continue</button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Briefing;
