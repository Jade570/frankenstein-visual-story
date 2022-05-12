import { React, useState, useEffect, useRef } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import "./prologue.css";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useNavigate } from "react-router-dom";

const box = {
  width: "100%",
  height: "100%",
  position: "absolute",
  background: "grey",
  objectFit: "contain",
};

const text = {
  position: "absolute",
  bottom: "10em",
  paddingLeft: "1.2em",
  paddingRight: "1.2em",
  marginLeft: "auto",
  margintRight: "auto",
  width: "80%",
  color: "black",
  backgroundColor: "#ffffff88",
  fontFamily: "Arvo",
};

const mask_active = {
  backgroundColor: "#2a2c3f",
  width: "100vw",
  height: "100vh",
  position: "absolute",
  zIndex: 999,
  opacity: 1,
  transition: "opacity 1500ms",
  pointerEvents: "none",
};

const mask_hidden = {
  backgroundColor: "#2a2c3f",
  width: "100vw",
  height: "100vh",
  position: "absolute",
  zIndex: 999,
  opacity: 0,
  transition: "opacity 1500ms",
  pointerEvents: "none",
};

const Normal = (props) => {
  const navigate = useNavigate();
  const slideRef = useRef();

  const [isLoaded, setIsLoaded] = useState(false);

  const prologueRef = ref(props.storage, "image/opening sequence");
  const [pendingImages, setPendingImages] = useState(-1);

  const [bgm, setBgm] = useState([
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fnormal%2F01.mp3?alt=media&token=71703298-b048-4376-8c58-c392c2756971"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fnormal%2F02.mp3?alt=media&token=4840e6bf-d0c0-4b1b-a5f5-a7c537a29b39"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fnormal%2F03.mp3?alt=media&token=d222e0a5-e2d3-45de-808a-8725095a460c"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fnormal%2F04.mp3?alt=media&token=a4d45af8-7879-41a2-9df2-9077a5e5546e"
    ),
  ]);
  const [bgmIsPlaying, setBgmIsPlaying] = useState([
    false,
    false,
    false,
    false,
  ]);

  const loadImages = async () => {
    try {
      let list = await listAll(prologueRef);
      setPendingImages(list.items.length);

      for (const item of list.items) {
        const imageURL = await getDownloadURL(item);
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

  const load0 = () => {
    bgm[0].loop = true;
    setBgmIsPlaying((prevPlaying) => {
      prevPlaying.forEach((item, idx) => {
        item = false;
      });
      prevPlaying[0] = true;
      return [...prevPlaying];
    });
    console.log(bgmIsPlaying);
  };

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    if (pendingImages === 0) {
      setIsLoaded(true);
    }
  }, [pendingImages]);

  useEffect(() => {
    bgmIsPlaying.forEach((item, idx) => {
      if (item) bgm[idx].play();
      else bgm[idx].pause();
    });
  }, [bgmIsPlaying]);

  return (
    <div>
      {!isLoaded && <div>Loading</div>}
      <div style={isLoaded ? mask_hidden : mask_active}></div>
      {isLoaded && (
        <div className="section1" style={{ cursor: "pointer" }}>
          <Fade ref={slideRef} duration={500} arrows={false} autoplay={false}>
            <div
              className="each-fade"
              onClick={() => {
                slideRef.current.goNext();
                bgm[0].loop = false;
                bgm[0].addEventListener("ended", () => {
                  bgm[0].pause();
                  bgm[1].loop = true;
                  setBgmIsPlaying((prevPlaying) => {
                    prevPlaying.forEach((item, idx) => {
                      item = false;
                      prevPlaying[idx] = false;
                    });
                    prevPlaying[1] = true;
                    return [...prevPlaying];
                  });
                  console.log(bgmIsPlaying);
                });
              }}
            >
              <div className="image-container">
                <div className="0" onLoad={load0}>
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F1.gif?alt=media&token=512a088d-3450-4912-9d75-23145c0425bb"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    Daffodils, magnolias, tulips, and daises - <br /> every
                    flower from all seasons have bloomed simultaneously <br />{" "}
                    without bees and butterflies. <br /> Lots of people were
                    busy taking a shot of this beautiful scene in rapture.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="each-fade"
              onClick={() => {
                slideRef.current.goNext();
                bgm[1].loop = false;
                bgm[1].pause();
                setBgmIsPlaying((prevPlaying) => {
                  prevPlaying.forEach((item, idx) => {
                    item = false;
                    prevPlaying[idx] = false;
                  });
                  prevPlaying[2] = true;
                  return [...prevPlaying];
                });
              }}
            >
              <div className="image-container">
                <div className="1">
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F2.gif?alt=media&token=fa2aef92-ed62-48d7-88a5-f397d6e75b57"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    However, some has recalled “the western sky”, hell in Asian
                    culture, which has a huge garden with every kind of flowers
                    bloomed together. And this, indeed, was a prelude to the
                    hell.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="each-fade"
              onClick={() => {
                slideRef.current.goNext();
                bgm[2].pause();
                bgm[3].loop = true;
                setBgmIsPlaying((prevPlaying) => {
                  prevPlaying.forEach((item, idx) => {
                    item = false;
                    prevPlaying[idx] = false;
                  });
                  prevPlaying[3] = true;
                  return [...prevPlaying];
                });
              }}
            >
              <div className="image-container">
                <div className="2">
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F3.gif?alt=media&token=5ab76adf-fe7c-43b5-9275-76ae48ed8d28"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    A huge despair came beyond the overwhelming beauty of a
                    short moment. Bees were all dead since they could not make
                    enough honey, and plants could not pollinate. It was the
                    start of the worst food shortage of the 21st century.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="each-fade"
              onClick={() => {
                slideRef.current.goNext();
              }}
            >
              <div className="image-container">
                <div className="3">
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F4.png?alt=media&token=733cb7c1-d5bb-4fdf-99e0-fbd3a9165c1d"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    For the food shortage and abnormal climates that happened
                    from before, the answer was always there. “We MUST reduce
                    carbon emissions”. When people could feel the disaster by
                    their hands, people finally started to talk about carbon
                    emissions. An international agreement about this issue
                    conventioned Paris Climate Agreement and has the “force” to
                    every countries.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="each-fade"
              onClick={() => {
                slideRef.current.goNext();
                bgm[3].loop = false;
                bgm[3].pause();
                bgm[5].loop = true;
                setBgmIsPlaying((prevPlaying) => {
                  prevPlaying.forEach((item, idx) => {
                    item = false;
                    prevPlaying[idx] = false;
                  });
                  prevPlaying[5] = true;
                  return [...prevPlaying];
                });
                console.log(bgmIsPlaying);
              }}
            ></div>
          </Fade>
        </div>
      )}
      ;
    </div>
  );
};
export default Normal;
