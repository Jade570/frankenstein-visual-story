import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/main.js";
import FadeInOut from "./pages/prologue/prologue.js";
import Story from "./pages/story/story.js";
import NotFound from "./NotFound";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/prologue" element={<FadeInOut />}></Route>
          <Route path="/day/:day" element={<Story />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
