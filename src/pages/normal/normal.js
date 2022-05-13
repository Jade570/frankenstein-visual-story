import { React, useState, useEffect, useRef } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useNavigate } from "react-router-dom";
import "./normal.css";

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

  const [isBgmLoaded, setIsBgmLoaded] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const endingRef = ref(props.storage, "bgm/normal");
  const imgRef = ref(props.storage, "image/normal");
  const [pendingBgm, setPendingBgm] = useState(-1);
  const [pendingImg, setPendingImg] = useState(-1);

  const [addButton, setAddButton] = useState(false);

  const [imgLen, setImgLen] = useState(-1);
  const [bgmLen, setBgmLen] = useState(-1);

  const timeFunc = () => {
    setAddButton(true);
  };
  const loadBgm = async () => {
    try {
      let list = await listAll(endingRef);
      setPendingBgm(list.items.length);
      setBgmLen(list.items.length);

      for (const item of list.items) {
        const bgmURL = await getDownloadURL(item);
        const bgm = document.createElement("audio");
        bgm.src = bgmURL;
        bgm.onloadstart = () => {
          setPendingBgm((cnt) => cnt - 1);
        };
      }
    } catch (e) {
      console.log("error");
    }
  };
  const loadImg = async () => {
    try {
      let list = await listAll(imgRef);
      setPendingImg(list.items.length);
      setImgLen(list.items.length);

      for (const item of list.items) {
        const imgURL = await getDownloadURL(item);
        const img = document.createElement("img");
        img.src = imgURL;
        img.onload = () => {
          setPendingImg((cnt) => cnt - 1);
        };
      }
    } catch (e) {
      console.log("error");
    }
  };

  useEffect(() => {
    loadBgm();
    loadImg();
  }, []);

  useEffect(() => {
    if (pendingBgm === 0) {
      setIsBgmLoaded(true);
    }
  }, [pendingBgm]);
  useEffect(() => {
    if (pendingImg === 0) {
      setIsImgLoaded(true);
    }
  }, [pendingImg]);

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

  const load0 = () => {
    bgm[0].loop = true;
    bgm[0].play();
  };

  return (
    <div className="Normal">
      {!(isBgmLoaded && isImgLoaded) && (
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "1.3em",
            textAlign: "center",
            marginTop: "50%",
            paddingBottom: "-50%",
          }}
        >
          Loading {imgLen + bgmLen - pendingBgm - pendingImg} /{bgmLen + imgLen}
        </div>
      )}
      <div style={isImgLoaded && isBgmLoaded ? mask_hidden : mask_active}></div>
      {isBgmLoaded && isImgLoaded && (
        <div className="section1">
          <Fade ref={slideRef} duration={500} arrows={false} autoplay={false}>
            <div
              className="each-fade"
              onClick={() => {
                slideRef.current.goNext();
                bgm[0].loop = false;
                bgm[0].pause();
                bgm[1].loop = true;
                bgm[1].play();
              }}
            >
              <div className="image-container" style={{ cursor: "pointer" }}>
                <div className="0" onLoad={load0}>
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fnormal%2Fending.png?alt=media&token=2baa0756-3a07-47c9-bb8a-9a8b25e7e755"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    After investigating four cases, it turned out that every
                    case was associated with the livestock organization. Each
                    case looked quite simple, but the milk powder, hives,
                    restaurant, and truck were all clues connected to the big
                    illegal crime organization. Consequently, the organization
                    and associated people received punishment by the law.
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
                bgm[2].loop = true;
                bgm[2].play();
              }}
            >
              <div className="image-container" style={{ cursor: "pointer" }}>
                <div className="1">
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fnormal%2Fnomal_2.GIF?alt=media&token=ef535899-8965-445c-a97d-212f59180033"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    During the investigation, the AI assistant has helped me a
                    lot finding out clues and the truth. I could have not solved
                    the cases if the AI did’t analyze all the information and
                    videos.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="each-fade"
              onClick={() => {
                slideRef.current.goNext();
                bgm[2].loop = false;
                bgm[2].pause();
                bgm[3].play();
                bgm[3].addEventListener("ended", () => {
                  slideRef.current.goNext();
                });
              }}
            >
              <div className="image-container" style={{ cursor: "pointer" }}>
                <div className="0" onLoad={load0}>
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fnormal%2Fnomal_3.GIF?alt=media&token=435ed5a5-e400-4585-b9c9-b16733e30481"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    However, an investigation with AI has not always been easy.
                    It had serious prejudice about humanity, crime, and the
                    world. It was because it had very little data about
                    minorities like transgender and black people. Therefore I
                    tried hard to re-educate and fix its biased ideas about
                    race, gender, and class.
                  </div>
                </div>
              </div>
            </div>

            <div className="each-fade">
              <div className="image-container" style={{ cursor: "default" }}>
                <div className="0" onLoad={load0}>
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fnormal%2Fnomal_5.GIF?alt=media&token=5312404a-cb69-4cd5-b9af-e7b90dc153c0"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    With all my effort, it seems like the AI learned that there
                    are various kinds of races that people belong to. Also, I
                    taught the AI that we should not guess people’s gender only
                    by their appearance. Finally, it overcame its error
                    regarding detecting minorities.
                  </div>
                </div>
              </div>
            </div>

            <div className="each-fade" onClick={timeFunc}>
              <div className="image-container" style={{ cursor: "pointer" }}>
                <div className="0" onLoad={load0}>
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fnormal%2Fend.gif?alt=media&token=b6ad645c-ce54-4fc2-875a-6bbc162078c4"
                    }
                    style={box}
                  ></img>
                </div>
              </div>
            </div>
          </Fade>
          <div>
            {addButton ? (
              <button
                onClick={() => {
                  navigate("/day/5");
                }}
              >
                continue
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Normal;
