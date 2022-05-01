import React from "react";
import { Link } from "react-router-dom";
// import { getDownloadURL, listAll } from "firebase/storage";

const Main = (props) => {
  // const callAll = async () => {
  //   try {
  //     let list = await listAll(props.listRef);
  //     list.prefixes.forEach(async (caseRef) => {
  //       let caseList = await listAll(caseRef);
  //       caseList.prefixes.forEach(async (typeRef) => {
  //         let typeList = await listAll(typeRef);
  //         typeList.items.forEach(async (itemRef) => {
  //           console.log("typelist");
  //         });
  //       });
  //       caseList.items.forEach(async (itemRef) => {
  //         const url = await getDownloadURL(itemRef);
  //         return <img src={url} onLoad={console.log("loaded")}></img>;
  //       });
  //     });
  //   } catch (e) {
  //     console.log("error");
  //   }
  // };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div>
        <h1>AI Knows The Answer</h1>
        <Link to="/prologue">Start</Link>
      </div>
    </div>
  );
};

export default Main;
