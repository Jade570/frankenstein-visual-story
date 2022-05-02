import { React, useState, useEffect } from "react";
import * as Scroll from "react-scroll";
import { useParams } from "react-router-dom";
import Investigation from "./investigation/investigation.js";
import Briefing from "./briefing/briefing.js";
import Day from "./day/day.js";
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
  const [showResult, setShowResult] = useState(false);

  //variables for firebase storage sdk
  const imagePath = ["image/case", params.day, "/"].join("");
  const imgRef = ref(props.storage, imagePath);
  const [pendingImages, setPendingImages] = useState(-1);
  const voicePath = ["voice/case", params.day, "/"].join("");
  const voiceRef = ref(props.storage, voicePath);
  const [pendingVoice, setPendingVoice] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);

  //image lists
  const [background, setBackground] = useState("");
  const [objectImage, setObjectImage] = useState([]);
  const [subject1, setSubject1] = useState([]);
  const [subject2, setSubject2] = useState([]);

  //voice lists
  const [start, setStart] = useState("");
  const [brief, setBrief] = useState("");
  const [clue, setClue] = useState([]);
  const [conclusion, setConclusion] = useState([]);

  //load image and save urls
  const loadImages = async () => {
    try {
      let list = await listAll(imgRef);
      setPendingImages(list.items.length);

      list.items.sort();
      list.items.forEach(async (item) => {
        const imageURL = await getDownloadURL(item);
        if (
          imageURL.includes("background.png") ||
          imageURL.includes("Background.png")
        ) {
          setBackground(imageURL);
        } else if (imageURL.includes("ob_")) {
          setObjectImage((objectImage) => [...objectImage, imageURL]);
        } else if (imageURL.includes("sj_1")) {
          setSubject1((subject1) => [...subject1, imageURL]);
        } else if (imageURL.includes("sj_2")) {
          setSubject2((subject2) => [...subject2, imageURL]);
        }
        const image = document.createElement("img");
        image.src = imageURL;
        image.onload = () => {
          setPendingImages((cnt) => cnt - 1);
        };
      });
    } catch (e) {
      console.log("error");
    }
  };

  //load voice and save urls
  const loadVoice = async () => {
    try {
      // 처음 디렉토리 안의 아이템 나열
      let list = await listAll(voiceRef);
      setPendingVoice(list.items.length);
      console.log("pendingVoice:", pendingVoice);
      // 세부 디렉토리 안의 아이템 나열
      list.prefixes.forEach(async (folderRef) => {
        let folder = await listAll(folderRef);
        setPendingVoice((pendingVoice) => pendingVoice + folder.items.length);
        console.log("pendingVoice:", pendingVoice);
        folder.items.forEach(async (item) => {
          const url = await getDownloadURL(item);
          const voice = document.createElement("audio");
          voice.src = url;
          if (url.includes("clue")) {
            setClue((clue) => [...clue, url]);
          } else if (url.includes("conclusion")) {
            setConclusion((conclusion) => [...conclusion, url]);
          }
          voice.onload = () => {
            setPendingVoice((cnt) => cnt - 1);
          };
        });
      });

      list.items.forEach(async (item) => {
        const url = await getDownloadURL(item);
        const voice = document.createElement("audio");
        voice.src = url;
        console.log("pendingVoice:", pendingVoice);
        if (url.includes("brief.mp3")) {
          setBrief(url);
        } else if (url.includes("start.mp3")) {
          setStart(url);
        }
        setBrief(url);
        voice.onload = () => {
          setPendingVoice((cnt) => cnt - 1);
        };
      });
    } catch (e) {
      console.log("error");
    }
  };

  //scroll functions
  const scrollToBriefing = () => {
    setShowBriefing(true);
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

  const scrollToResult = () => {
    setShowResult(true);
    Scroll.scroller.scrollTo("Result", {
      duration: 800,
      delay: 50,
      smooth: true,
    });
  };

  useEffect(() => {
    loadImages();
    loadVoice();
  }, []);

  useEffect(() => {
    if (pendingImages === 0) {
      setIsLoaded(true);
    }
  }, [pendingImages]);

  if (sample[params.day - 1]) {
    return (
      <div>
        {!isLoaded && <div>Loading</div>}
        {isLoaded && (
          <div>
            <Day func={scrollToBriefing} day={params.day} />
            <Element name="Briefing">
              <Briefing
                func={scrollToInvestigation}
                showBriefing={showBriefing}
                day={params.day}
                data={sample[params.day - 1].briefing}
                image={background}
              />
            </Element>
            <Element name="Investigation">
              <Investigation
                func={scrollToResult}
                showInvestigation={showInvestigation}
                data={sample[params.day - 1].investigation}
                day={params}
                background={background}
                object={objectImage}
                subject1={subject1}
                subject2={subject2}
              />
            </Element>
            <Element name="Result">
              <Result showResult={showResult}></Result>
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
