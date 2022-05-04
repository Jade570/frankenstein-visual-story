import { React, useState, useEffect } from "react";
import * as Scroll from "react-scroll";
import { useParams } from "react-router-dom";
import Investigation from "./investigation/investigation.js";
import Briefing from "./briefing/briefing.js";
import Day from "./day/day.js";
import Conclusion from "./conclusion/conclusion.js";
import Result from "./result/result.js";
import sample from "./src/script.json";
import NotFound from "../../NotFound";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const Element = Scroll.Element;

const Story = (props) => {
  let params = useParams();

  //states for show/hide contents
  const [showBriefing, setShowBriefing] = useState(false);
  const [showInvestigation, setShowInvestigation] = useState(false);
  const [showConclusion, setShowConclusion] = useState(false);
  const [showResult, setShowResult] = useState(false);

  //variables for firebase storage sdk
  const imagePath = ["image/case", params.day, "/"].join("");
  const imgRef = ref(props.storage, imagePath);
  const [pendingImages, setPendingImages] = useState(-1);
  const voicePath = ["voice/case", params.day, "/"].join("");
  const voiceRef = ref(props.storage, voicePath);
  const [pendingVoice, setPendingVoice] = useState(-1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isVoiceLoaded, setIsVoiceLoaded] = useState(false);

  //image lists
  const [background, setBackground] = useState("");
  const [objectImage, setObjectImage] = useState([]);
  const [suggestion1, setSuggestion1] = useState([]);
  const [suggestion2, setSuggestion2] = useState([]);

  //voice lists
  const [start, setStart] = useState(new Audio());
  const [brief, setBrief] = useState(new Audio());
  const [clue, setClue] = useState([]);
  const [conclusion, setConclusion] = useState([]);

  //clue state
  const [clueState, setClueState] = useState(-1);

  //conclusion state
  const [conclusionState, setConclusionState] = useState(-1);

  //voice Controls
  const [startPlaying, setStartPlaying] = useState(false);
  const [briefPlaying, setBriefPlaying] = useState(false);
  const [cluePlaying, setCluePlaying] = useState([]);
  const [conclusionPlaying, setConclusionPlaying] = useState([]);

  //load image and save urls
  const loadImages = async () => {
    try {
      let list = await listAll(imgRef);
      setPendingImages(list.items.length);

      list.items.sort();
      for (const item of list.items) {
        const imageURL = await getDownloadURL(item);
        if (
          imageURL.includes("background.png") ||
          imageURL.includes("Background.png")
        ) {
          setBackground(imageURL);
        } else if (imageURL.includes("ob_")) {
          setObjectImage((objectImage) => [...objectImage, imageURL]);
        } else if (imageURL.includes("sj_1")) {
          setSuggestion1((suggestion1) => [...suggestion1, imageURL]);
        } else if (imageURL.includes("sj_2")) {
          setSuggestion2((suggestion2) => [...suggestion2, imageURL]);
        }
        const image = document.createElement("img");
        image.src = imageURL;
        image.onload = () => {
          setPendingImages((cnt) => cnt - 1);
        };
      }
    } catch (e) {
      console.log("error");
    }
  };

  //load voice and save audios
  const loadVoice = async () => {
    try {
      // 처음 디렉토리 안의 아이템 나열
      let list = await listAll(voiceRef);
      setPendingVoice(list.items.length);
      let tempClue = [];
      let tempConclusion = [];
      let ttclue = [];
      let ttconclusion = [];

      // 세부 디렉토리 안의 아이템 나열
      for (const folderRef of list.prefixes) {
        let folder = await listAll(folderRef);
        setPendingVoice((pendingVoice) => pendingVoice + folder.items.length);
        for (const item of folder.items) {
          const url = await getDownloadURL(item);
          if (url.includes("clue")) {
            tempClue.push(url);
            // console.log("this is clue url.", tempClue);
            setCluePlaying((cluePlaying) => [...cluePlaying, false]);
          } else if (url.includes("conclusion")) {
            tempConclusion.push(url);
            setConclusionPlaying((conclusionPlaying) => [
              ...conclusionPlaying,
              false,
            ]);
          }
        }
      }

      //처음 디렉토리 안의 아이템 나열
      for (const item of list.items) {
        const url = await getDownloadURL(item);
        const voice = document.createElement("audio");
        voice.src = url;
        if (url.includes("brief.mp3")) {
          setBrief(voice);
        } else if (url.includes("start.mp3")) {
          setStart(voice);
        }
        voice.onloadstart = () => {
          setPendingVoice((cnt) => cnt - 1);
        };
      }

      //sort arrays
      tempClue.sort();
      tempConclusion.sort();
      for (let i = 0; i < tempClue.length; i++) {
        if (ttclue.includes(tempClue[i])) {
          ttclue.push(tempClue[i]);
        }
      }
      for (let i = 0; i < tempConclusion.length; i++) {
        if (ttconclusion.includes(tempConclusion[i])) {
          ttconclusion.push(tempClue[i]);
        }
      }
      ttclue.sort();
      ttconclusion.sort();
      //update clue
      ttclue.forEach((url) => {
        const voice = document.createElement("audio");
        voice.src = url;
        setClue((prevClue) => [...prevClue, voice]);
        voice.onloadstart = () => {
          setPendingVoice((cnt) => cnt - 1);
        };
      });
      //update conclusion
      ttconclusion.forEach((url) => {
        const voice = document.createElement("audio");
        voice.src = url;
        setConclusion((prevConclusion) => [...prevConclusion, voice]);
        voice.onloadstart = () => {
          setPendingVoice((cnt) => cnt - 1);
        };
      });
    } catch (e) {
      console.log("error");
    }
  };

  useEffect(() => {
    loadImages();
    loadVoice();
  }, []);

  //load Image
  useEffect(() => {
    if (pendingImages === 0) {
      setIsImageLoaded(true);
      let tempobjectImage = objectImage.filter((c, idx) => {
        return objectImage.indexOf(c) === idx;
      });
      tempobjectImage.sort();
      let tempsuggestion1 = suggestion1.filter((c, idx) => {
        return suggestion1.indexOf(c) === idx;
      });
      tempsuggestion1.sort();
      let tempsuggestion2 = suggestion2.filter((c, idx) => {
        return suggestion2.indexOf(c) === idx;
      });
      tempsuggestion2.sort();

      setObjectImage(tempobjectImage);
      setSuggestion1(tempsuggestion1);
      setSuggestion2(tempsuggestion2);
    }
  }, [loadImages]);

  //load Voice
  useEffect(() => {
    if (pendingVoice === 0) {
      setIsVoiceLoaded(true);
    }
  }, [pendingVoice]);

  useEffect(() => {
    if (clueState > -1) {
      playClue(clueState);
    }
  }, [clueState]);

  //control audio play by useEffect
  useEffect(() => {
    if (startPlaying && isVoiceLoaded) {
      start.play();
    } else {
      start.pause();
      start.currentTime = 0;
    }
  }, [startPlaying]);

  useEffect(() => {
    if (briefPlaying && isVoiceLoaded) {
      brief.play();
    } else {
      brief.pause();
      brief.currentTime = 0;
    }
  }, [briefPlaying]);

  useEffect(() => {
    if (isVoiceLoaded) {
      cluePlaying.forEach((item, idx) => {
        if (item) clue[idx].play();
        else {
          clue[idx].pause();
          clue[idx].currentTime = 0;
        }
      });
    }
  }, [cluePlaying]);

  useEffect(() => {
    if (isVoiceLoaded) {
      conclusionPlaying.forEach((item, idx) => {
        if (item) conclusion[idx].play();
        else {
          conclusion[idx].pause();
          conclusion[idx].currentTime = 0;
        }
      });
    }
  }, [conclusionPlaying]);

  //audio control functions
  const playStart = () => {
    setStartPlaying(true);
    setBriefPlaying(false);
    setCluePlaying((prevCluePlaying) => {
      prevCluePlaying.forEach((item) => {
        item = false;
      });
      return prevCluePlaying;
    });
    setConclusionPlaying((prevConclusionPlaying) => {
      prevConclusionPlaying.forEach((item) => {
        item = false;
      });
      return prevConclusionPlaying;
    });
  };

  const playBrief = () => {
    setStartPlaying(false);
    setBriefPlaying(true);
    setCluePlaying((prevCluePlaying) => {
      prevCluePlaying.forEach((item) => {
        item = false;
      });
      return prevCluePlaying;
    });
    setConclusionPlaying((prevConclusionPlaying) => {
      prevConclusionPlaying.forEach((item) => {
        item = false;
      });
      return prevConclusionPlaying;
    });
  };

  const playClue = (idx) => {
    setStartPlaying(false);
    setBriefPlaying(false);
    setCluePlaying((prevCluePlaying) => {
      prevCluePlaying.forEach((item, idx) => {
        item = false;
        prevCluePlaying[idx] = false;
      });
      prevCluePlaying[idx] = true;
      return [...prevCluePlaying];
    });
    setConclusionPlaying((prevConclusionPlaying) => {
      prevConclusionPlaying.forEach((item, idx) => {
        item = false;
        prevConclusionPlaying[idx] = false;
      });
      return [...prevConclusionPlaying];
    });
  };

  const playConclusion = (idx) => {
    setStartPlaying(false);
    setBriefPlaying(false);
    setCluePlaying((prevCluePlaying) => {
      prevCluePlaying.forEach((item, idx) => {
        item = false;
        prevCluePlaying[idx] = false;
      });
      return [...prevCluePlaying];
    });
    setConclusionPlaying((prevConclusionPlaying) => {
      prevConclusionPlaying.forEach((item, idx) => {
        item = false;
        prevConclusionPlaying[idx] = false;
      });
      prevConclusionPlaying[idx] = true;
      return [...prevConclusionPlaying];
    });
  };

  const stopAll = (idx) => {
    setStartPlaying(false);
    setBriefPlaying(false);
    setCluePlaying((prevCluePlaying) => {
      prevCluePlaying.forEach((item) => {
        item = false;
      });
      return prevCluePlaying;
    });
    setConclusionPlaying((prevConclusionPlaying) => {
      prevConclusionPlaying.forEach((item) => {
        item = false;
      });
      return prevConclusionPlaying;
    });
  };

  //scroll functions
  const scrollToBriefing = () => {
    setShowBriefing(true);
    playStart();
    Scroll.scroller.scrollTo("Briefing", {
      duration: 800,
      delay: 50,
      smooth: true,
    });
  };

  const scrollToInvestigation = () => {
    setShowInvestigation(true);
    Scroll.scroller.scrollTo("Investigation", {
      duration: 800,
      delay: 50,
      smooth: true,
    });
  };

  const scrollToConclusion = () => {
    setShowConclusion(true);
    Scroll.scroller.scrollTo("Conclusion", {
      duration: 800,
      delay: 50,
      smooth: true,
    });
  };

  const scrollToResult = () => {
    setShowResult(true);
    Scroll.scroller.scrollTo("Result", {
      duration: 800,
      delay: 50,
      smooth: true,
    });
  };

  if (sample[params.day - 1]) {
    return (
      <div>
        {!(isImageLoaded && isVoiceLoaded) && <div>Loading</div>}
        {isImageLoaded && isVoiceLoaded && (
          <div>
            <Day func={scrollToBriefing} day={params.day} start={start} />
            <Element name="Briefing">
              <Briefing
                func={scrollToInvestigation}
                showBriefing={showBriefing}
                day={params.day}
                data={sample[params.day - 1].briefing}
                image={background}
                playBrief={playBrief}
                stopAll={stopAll}
              />
            </Element>
            <Element name="Investigation">
              <Investigation
                func={scrollToConclusion}
                showInvestigation={showInvestigation}
                data={sample[params.day - 1].investigation}
                day={params}
                background={background}
                object={objectImage}
                suggestion1={suggestion1}
                suggestion2={suggestion2}
                start={start}
                clueState={clueState}
                setClueState={setClueState}
              />
            </Element>
            <Element name="Conclusion">
              <Conclusion
                showConclusion={showConclusion}
                data={sample[params.day - 1].conclusion}
                func={scrollToResult}
              ></Conclusion>
            </Element>
            <Element name="Result">
              <Result
                showResult={showResult}
                data={sample[params.day - 1].final}
                day={params.day}
              ></Result>
            </Element>
          </div>
        )}
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default Story;
