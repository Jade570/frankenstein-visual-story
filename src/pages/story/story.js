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

  //bgm
  const [bgm, setBgm] = useState(
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fstory%2Fmainbgm.mp3?alt=media&token=507de88e-9db9-4180-aecd-dc8530272028"
    )
  );
  //clue state
  const [clueState, setClueState] = useState(-1);

  //conclusion state
  const [conclusionState, setConclusionState] = useState(-1);

  //voice Controls
  const [startPlaying, setStartPlaying] = useState(false);
  const [briefPlaying, setBriefPlaying] = useState(false);
  const [cluePlaying, setCluePlaying] = useState([]);
  const [conclusionPlaying, setConclusionPlaying] = useState([]);

  const [itemLen, setItemLen] = useState(-1);

  //load image and save urls
  const loadImages = async () => {
    try {
      let list = await listAll(imgRef);
      setPendingImages(list.items.length);
      setItemLen(list.items.length);
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
      // ?????? ???????????? ?????? ????????? ??????
      let list = await listAll(voiceRef);

      setPendingVoice(list.items.length);
      // console.log("?????? ???????????? voice ??????:", pendingVoice);

      // ?????? ???????????? ?????? ????????? ??????
      for (const folderRef of list.prefixes) {
        let folder = await listAll(folderRef);
        setPendingVoice((pendingVoice) => pendingVoice + folder.items.length);
        for (const item of folder.items) {
          const url = await getDownloadURL(item);
          const voice = document.createElement("audio");
          voice.src = url;
          if (folderRef._location.path_.endsWith("clue")) {
            setClue((prevClue) => [...prevClue, voice]);
          } else {
            setConclusion((prevConclusion) => [...prevConclusion, voice]);
          }
          voice.onloadstart = () => {
            setPendingVoice((cnt) => cnt - 1);
          };
        }
      }

      //?????? ???????????? ?????? ????????? ??????
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
    } catch (e) {
      console.log("error");
    }
  };

  //starting
  useEffect(() => {
    loadImages();
    loadVoice();
    if (parseInt(params.day) === 5) {
      setBgm(
        new Audio(
          "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fstory%2Fday5.mp3?alt=media&token=c070cd78-0692-40e6-9282-3a06e0adf52d"
        )
      );
    }
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
  }, [pendingImages]);

  //load Voice
  useEffect(() => {
    if (pendingVoice === 0) {
      // let tempClue = clue.filter((c, idx) => {
      //   return clue.indexOf(c.src) === idx;
      // });
      // let tempConclusion = conclusion.filter((c, idx) => {
      //   return conclusion.indexOf(c.src) === idx;
      // });
      // setClue(tempClue);
      // setConclusion(tempConclusion);

      setCluePlaying(new Array(clue.length).fill(false));
      setConclusionPlaying(new Array(conclusion.length).fill(false));
      setIsVoiceLoaded(true);
    }
  }, [pendingVoice]);

  useEffect(() => {
    if (clueState > -1) {
      playClue(clueState);
    }
  }, [clueState]);

  useEffect(() => {
    if (conclusionState > -1) {
      playConclusion(conclusionState);
    }
  }, [conclusionState]);

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
    if (showBriefing) {
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
    if (showBriefing) {
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
    // return [];
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
    // return [];
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
    bgm.volume = 0.5;
    bgm.play();
    bgm.loop = true;
    playStart();
    Scroll.scroller.scrollTo("Briefing", {
      duration: 800,
      delay: 50,
      smooth: true,
    });
  };

  const scrollToInvestigation = () => {
    setShowInvestigation(true);
    stopAll();
    Scroll.scroller.scrollTo("Investigation", {
      duration: 800,
      delay: 50,
      smooth: true,
    });
  };

  const scrollToConclusion = () => {
    setShowConclusion(true);
    stopAll();
    Scroll.scroller.scrollTo("Conclusion", {
      duration: 800,
      delay: 50,
      smooth: true,
    });
  };

  const scrollToResult = () => {
    setShowResult(true);
    stopAll();
    Scroll.scroller.scrollTo("Result", {
      duration: 800,
      delay: 50,
      smooth: true,
    });
  };

  if (sample[params.day - 1]) {
    return (
      <div>
        {!(isImageLoaded && isVoiceLoaded) && (
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              paddingTop: "40vh",
              fontSize: "1.3em",
              textAlign: "center",
            }}
          >
            Loading {itemLen - pendingImages} / {itemLen}
          </div>
        )}
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
                stopAll={stopAll}
              />
            </Element>
            <Element name="Conclusion">
              <Conclusion
                showConclusion={showConclusion}
                data={sample[params.day - 1].conclusion}
                func={scrollToResult}
                conclusionState={conclusionState}
                setConclusionState={setConclusionState}
                stopAll={stopAll}
              ></Conclusion>
            </Element>
            <Element name="Result">
              <Result
                showResult={showResult}
                data={sample[params.day - 1].final}
                day={params.day}
                bgm={bgm}
                stopAll={stopAll}
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
