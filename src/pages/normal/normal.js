import React from "react";
import { useNavigate } from "react-router-dom";

const Normal = (props) => {
  const navigate = useNavigate();
  const buttonFunc = () => {
    navigate("/day/5");
  };

  return (
    <div className="Result">
      <img
        style={{ objectFit: "contain", width: "80vw" }}
        src="https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fnormal%2Fending.png?alt=media&token=2baa0756-3a07-47c9-bb8a-9a8b25e7e755"
      ></img>
      <p>
        After investigating four cases, it turned out that every case was
        associated with the livestock organization. Each case looked quite
        simple, but the milk powder, hives, restaurant, and truck were all clues
        connected to the big illegal crime organization. Consequently, the
        organization and associated people received punishment by the law.
      </p>
      <p>
        During the investigation, the AI assistant has helped me a lot finding
        out clues and the truth. I could have not solved the cases if the AI
        did’t analyze all the information and videos.
      </p>
      <p>
        However, an investigation with AI has not always been easy. It had
        serious prejudice about humanity, crime, and the world. It was because
        it had very little data about minorities like transgender and black
        people. Therefore I tried hard to re-educate and fix its biased ideas
        about race, gender, and class.
      </p>
      <p>
        With all my effort, it seems like the AI learned that there are various
        kinds of races that people belong to. Also, I taught the AI that we
        should not guess people’s gender only by their appearance. Finally, it
        overcame its error regarding detecting minorities.
      </p>
      <button onClick={buttonFunc}>continue</button>
    </div>
  );
};

export default Normal;
