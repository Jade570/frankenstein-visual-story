import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Product from "./Product";
const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Product />
    </div>
  );
};
export default App;
