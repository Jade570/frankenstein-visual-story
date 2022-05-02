import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/main.js";
import FadeInOut from "./pages/prologue/prologue.js";
import Story from "./pages/story/story.js";
import NotFound from "./NotFound";
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCWn3L06O_Fxe8BX7CG__q2iqjvFsklr1M",
  authDomain: "frankenstein-visual-story.firebaseapp.com",
  projectId: "frankenstein-visual-story",
  storageBucket: "frankenstein-visual-story.appspot.com",
  messagingSenderId: "353442412911",
  appId: "1:353442412911:web:6bfbe93ac8b816bf59d09a",
  measurementId: "G-V4FDHHT6YM",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const listRef = ref(storage, "image");

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main listRef={listRef} />}></Route>
          <Route
            exact
            path="/prologue"
            element={<FadeInOut storage={storage} />}
          ></Route>
          <Route exact path="/day/:day" element={<Story />}></Route>
          <Route exact path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
