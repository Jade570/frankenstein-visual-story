import { React, useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const btnStyle = {
  cursor: "pointer",
};
const box_active = {
  width: "100%",
  height: "100%",
  position: "absolute",
  background: "grey",
  opacity: "1",
  transition: "opacity 1500ms, visibility 1500ms",
  objectFit: "contain",
};
const box_hidden = {
  width: "100%",
  height: "100%",
  position: "absolute",
  background: "grey",
  visibility: "hidden",
  opacity: "0",
  objectFit: "contatin",
  transition: "opacity 1500ms,visibility 1500ms",
};

const text_active = {
  position: "absolute",
  bottom: "10em",
  paddingLeft: "1.2em",
  paddingRight: "1.2em",
  marginLeft: "auto",
  margintRight: "auto",
  width: "80%",
  color: "black",
  backgroundColor: "#ffffff88",
  visibility: "1",
  transition: " visibility 1500ms",
};

const text_hidden = {
  position: "absolute",
  bottom: "10em",
  paddingLeft: "1.2em",
  paddingRight: "1.2em",
  marginLeft: "auto",
  margintRight: "auto",
  width: "80%",
  color: "black",
  backgroundColor: "#ffffff88",
  visibility: "0",
  transition: "visibility 1500ms",
};

const FadeInOut = (props) => {
  const [click, setClick] = useState(parseInt(0));
  const [isLoaded, setIsLoaded] = useState(false);
  const handleClick = () => {
    setClick((click) => (click += 1));
  };
  const prologueRef = ref(props.storage, "image/opening sequence");
  const imgList = [];
  const loadImages = async () => {
    try {
      let list = await listAll(prologueRef);
      list.items.forEach(async (item) => {
        imgList.push(await getDownloadURL(item));
        imgList.forEach((url, idx) => {
          const image = document.createElement("img");
          image.src = url;
          image.onload = () => {
            setIsLoaded(true);
          };
        });
      });
      setIsLoaded(true);
    } catch (e) {
      console.log("error");
    }
  };
  useEffect(() => {
    loadImages();
  }, []);
  return (
    <div>
      {isLoaded && (
        <div className="section1">
          <div onClick={handleClick} style={btnStyle}>
            <div className="0">
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F1.gif?alt=media&token=512a088d-3450-4912-9d75-23145c0425bb"
                }
                style={click === 0 ? box_active : box_hidden}
              ></img>
              <div style={click === 0 ? text_active : text_hidden}>
                Daffodils, magnolias, tulips, and daises – every flower from all
                seasons have bloomed simultaneously without bees and
                butterflies. Lots of people were busy taking a shot of this
                beautiful scene in rapture.
              </div>
            </div>
            <div className="1">
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/frankenstein-visual-story.appspot.com/o/image%2Fopening%20sequence%2F2.gif?alt=media&token=fa2aef92-ed62-48d7-88a5-f397d6e75b57"
                }
                style={click === 1 ? box_active : box_hidden}
              ></img>
              <div style={click === 1 ? text_active : text_hidden}>
                However, some has recalled “the western sky”, hell in Asian
                culture, which has a huge garden with every kind of flowers
                bloomed together. And this, indeed, was a prelude to the hell.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FadeInOut;
