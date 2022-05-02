import { React, useState, useEffect } from "react";
import * as Scroll from "react-scroll";
import { useParams } from "react-router-dom";
import Investigation from "./investigation/investigation.js";
import Briefing from "./briefing/briefing.js";
import Day from "./day/day.js";
import Result from "./result/result.js";
import sample from "./src/sample1.json";
import NotFound from "../../NotFound";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const Element = Scroll.Element;

const Story = (props) => {
  let params = useParams();

  //states for show/hide contents
  const [showBriefing, setShowBriefing] = useState(false);
  const [showInvestigation, setShowInvestigation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const imageUrl = [];

  //variables for firebase storage sdk
  const path = ["image/case", params.day, "/"].join("");
  const dayRef = ref(props.storage, path);
  const [pendingImages, setPendingImages] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);

  //image lists
  const [background, setBackground] = useState("");
  const [objectImage, setObjectImage] = useState([]);
  const [subject1, setSubject1] = useState([]);
  const [subject2, setSubject2] = useState([]);

  //load image and save urls
  const loadImages = async () => {
    try {
      let list = await listAll(dayRef);
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
          setObjectImage([...objectImage, imageURL]);
        } else if (imageURL.includes("sj_1")) {
          setSubject1([...subject1, imageURL]);
        } else if (imageURL.includes("sj_2")) {
          setSubject2([...subject2, imageURL]);
        }
        const image = document.createElement("img");
        image.src = imageURL;
        imageUrl.push(imageURL);
        image.onload = () => {
          setPendingImages((cnt) => cnt - 1);
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
                storage={props.storage}
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
