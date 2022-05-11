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

const FadeInOut = (props) => {
  const navigate = useNavigate();
  const slideRef = useRef();

  const [isLoaded, setIsLoaded] = useState(false);

  const prologueRef = ref(props.storage, "image/opening sequence");
  const [pendingImages, setPendingImages] = useState(-1);

  const [bgm, setBgm] = useState([
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fprologue%2F01.mp3?alt=media&token=5250f7d0-c615-412a-80a6-e2db09a6fdbf"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fprologue%2F02.mp3?alt=media&token=e3a4faea-ef93-43ea-873d-321eb042a4f3"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fprologue%2F03.mp3?alt=media&token=55b077cb-acd8-4ab2-b496-1568f0637f1b"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fprologue%2F04.mp3?alt=media&token=f026f342-d8cc-4998-82e7-9f70db1b0dfa"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fprologue%2F05.mp3?alt=media&token=2c27aade-9ea8-47c4-b92c-af7a1f2a411c"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fprologue%2F06.mp3?alt=media&token=9f2c9e69-f298-4856-a3ff-41fdcd70fc05"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fprologue%2F07.mp3?alt=media&token=7f516b06-06af-4100-8eb0-3bfac4fa7200"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fprologue%2F08.mp3?alt=media&token=6b464724-7f4b-4e72-a24b-e7fe83bd7d57"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fprologue%2F09.mp3?alt=media&token=049bf250-a4b7-4674-ba03-e179631795eb"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fprologue%2F10.mp3?alt=media&token=5682abea-ea1e-4782-930a-bb2101a2f9ae"
    ),
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/bgm%2Fprologue%2F11.mp3?alt=media&token=2f36d6de-5adf-4d28-bd90-191a1731c5c4"
    ),
  ]);
  const [bgmIsPlaying, setBgmIsPlaying] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
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
                bgm[1].addEventListener("ended", () => {
                  bgm[1].pause();
                  setBgmIsPlaying((prevPlaying) => {
                    prevPlaying.forEach((item, idx) => {
                      item = false;
                      prevPlaying[idx] = false;
                    });
                    prevPlaying[2] = true;
                    return [...prevPlaying];
                  });
                  console.log(bgmIsPlaying);
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
                bgm[2].loop = false;
                bgm[2].addEventListener("ended", () => {
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
                  console.log(bgmIsPlaying);
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
                bgm[3].loop = false;
                bgm[3].addEventListener("ended", () => {
                  bgm[3].pause();
                  bgm[4].loop = true;
                  setBgmIsPlaying((prevPlaying) => {
                    prevPlaying.forEach((item, idx) => {
                      item = false;
                      prevPlaying[idx] = false;
                    });
                    prevPlaying[4] = true;
                    return [...prevPlaying];
                  });
                  console.log(bgmIsPlaying);
                });
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
                bgm[4].loop = false;
                bgm[4].addEventListener("ended", () => {
                  bgm[4].pause();
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
                });
              }}
            >
              <div className="image-container">
                <div className="4">
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F5.gif?alt=media&token=93c6ef7c-c0e0-4e0b-9cf9-274d51956367"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    “No matter how rich you are or where you live, the climate
                    crisis has become a serious disaster to everyone, and this
                    should be resolved. Now the agreement shows concrete and
                    direct guidelines to reduce greenhouse gas exhaustion.”
                  </div>
                </div>
              </div>
            </div>

            <div
              className="each-fade"
              onClick={() => {
                slideRef.current.goNext();
                bgm[5].loop = false;
                bgm[5].addEventListener("ended", () => {
                  bgm[5].pause();
                  bgm[6].loop = true;
                  setBgmIsPlaying((prevPlaying) => {
                    prevPlaying.forEach((item, idx) => {
                      item = false;
                      prevPlaying[idx] = false;
                    });
                    prevPlaying[6] = true;
                    return [...prevPlaying];
                  });
                  console.log(bgmIsPlaying);
                });
              }}
            >
              <div className="image-container">
                <div className="5">
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F6.gif?alt=media&token=096626b8-4b15-4c76-8b3b-e00a6c84aac1"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    First, a 40% reduction in global electricity use. Fossil
                    fuels needed to produce electricity itself is a problem, but
                    the heating of electricity-using devices itself is also
                    causing a major problem in the climate crisis.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="each-fade"
              onClick={() => {
                slideRef.current.goNext();
                bgm[6].loop = false;
                bgm[6].addEventListener("ended", () => {
                  bgm[6].pause();
                  bgm[7].loop = true;
                  setBgmIsPlaying((prevPlaying) => {
                    prevPlaying.forEach((item, idx) => {
                      item = false;
                      prevPlaying[idx] = false;
                    });
                    prevPlaying[7] = true;
                    return [...prevPlaying];
                  });
                  console.log(bgmIsPlaying);
                });
              }}
            >
              <div className="image-container">
                <div className="6">
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F7.gif?alt=media&token=db0da390-5b7c-4fdb-8ee1-156216d68a07"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    Second, total ban on meat-eating businesses. With increased
                    interest in human rights, animal rights, and the climate
                    crisis, people agreed that we must stop producing and
                    consuming animal meat. Therefore, the treaty has been
                    executed with the International Convention on Animal Rights.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="each-fade"
              onClick={() => {
                slideRef.current.goNext();
                bgm[7].loop = false;
                bgm[7].addEventListener("ended", () => {
                  bgm[7].pause();
                  bgm[8].loop = true;
                  setBgmIsPlaying((prevPlaying) => {
                    prevPlaying.forEach((item, idx) => {
                      item = false;
                      prevPlaying[idx] = false;
                    });
                    prevPlaying[8] = true;
                    return [...prevPlaying];
                  });
                  console.log(bgmIsPlaying);
                });
              }}
            >
              <div className="image-container">
                <div className="7">
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F8.gif?alt=media&token=d3de3316-8ad4-4503-bd73-68662a40f585"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    Third, complete replacement of fossil energy over a decade.
                    Fossil energy itself is running out, and the seriousness of
                    environmental pollution in their use has long emerged. The
                    world cannot delay the replacement of fossil energy anymore.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="each-fade"
              onClick={() => {
                slideRef.current.goNext();
                bgm[8].loop = false;
                bgm[8].addEventListener("ended", () => {
                  bgm[8].pause();
                  bgm[9].loop = true;
                  setBgmIsPlaying((prevPlaying) => {
                    prevPlaying.forEach((item, idx) => {
                      item = false;
                      prevPlaying[idx] = false;
                    });
                    prevPlaying[9] = true;
                    return [...prevPlaying];
                  });
                  console.log(bgmIsPlaying);
                });
              }}
            >
              <div className="image-container">
                <div className="8">
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F9.png?alt=media&token=e8a419a1-dca1-4a77-b171-cc76db4a968a"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    Many things have changed throughout life since this
                    agreement. First, of course, there was no meat on the table.
                    With other changes, additional installations of CCTVs have
                    disappeared as they violate human rights but consume a lot
                    of standby power.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="each-fade"
              onClick={() => {
                slideRef.current.goNext();
                bgm[9].loop = false;
                bgm[9].addEventListener("ended", () => {
                  bgm[9].pause();
                  setBgmIsPlaying((prevPlaying) => {
                    prevPlaying.forEach((item, idx) => {
                      item = false;
                      prevPlaying[idx] = false;
                    });
                    prevPlaying[10] = true;
                    return [...prevPlaying];
                  });
                });
              }}
            >
              <div className="image-container">
                <div className="9">
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F10.gif?alt=media&token=d4bfd08c-5e72-481e-8fea-5a4705f5ec0e"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    Then, in areas where power consumption could not be reduced,
                    CCTVs were removed. Accordingly, the slumming of the poor
                    area accelerated, and the types of crimes diversified.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="each-fade"
              onClick={() => {
                navigate("/day/1");
              }}
            >
              <div className="image-container">
                <div className="10">
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F11.gif?alt=media&token=1d2a7f0e-75fb-4f33-96af-8259b5fdcbde"
                    }
                    style={box}
                  ></img>
                  <div style={text}>
                    There was also a lot of effort to solve the crime. One of
                    them was AI, which predicts the situation before and after
                    with a small amount of evidence video, and consequently
                    tracks the criminal and the crime. However, this AI had one
                    major flaw. It was a serious prejudice, such as pointing out
                    only white men as human beings. <br /> The AI was not
                    recognized by academia and Victor Frankenstein, its
                    developer, also abandoned further development. However, a
                    country trying to use this AI for actual investigation has
                    emerged… and the investigator is me.
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
};

export default FadeInOut;
