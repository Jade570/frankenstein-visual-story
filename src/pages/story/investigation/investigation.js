import { React } from "react";
import Cctv from "./cctv/cctv.js";
import Notes from "./notes/notes.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import "./investigation.css";

const Investigation = (props) => {
  const path = "".join("image/case", props.day, "/");
  const dayRef = ref(props.storage, path);
  const loadImages = async () => {
    try {
      let list = await listAll(dayRef);
      setPendingImages(list.items.length);

      list.items.forEach(async (item) => {
        const imageURL = await getDownloadURL(item);
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

  if (props.showInvestigation) {
    return (
      <div className="Investigation">
        <div className="Cctv">
          <Cctv className="Cctv" data={props.data.cctv} />
        </div>

        <Notes className="Notes" data={props.data.notes} />
        <button></button>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default Investigation;
