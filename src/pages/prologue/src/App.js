import logo from './logo.svg';
import './App.css';
import React from 'react';


const btnStyle = {
  cursor: "pointer",
};

const box_active = {
  width: "100%",
  height: "100%",
  position: "absolute",
  background: "grey",
  opacity: "1",
  transition: "opacity 1500ms, visibility 1500ms"
};

const box_hidden = {
  width: "100%",
  height: "100%",
  position: "absolute",
  background: "grey",
  visibility: "hidden",
  opacity: "0",
  transition: "opacity 1500ms,visibility 1500ms",
};


class FadeInOut extends React.Component {
  state = {
    click: 0,
  };

  handleClick = () => {
    this.setState((state) => ({
      click: state.click+=1,
    }));
  };
  render() {
    return (
      <div>
        <div className="section1">
          <div onClick={this.handleClick} style={btnStyle}>
            <img src = {require('./rabbit/1.jpg')} style={this.state.click%4===0 ? box_active : box_hidden}></img>
            <img src = {require('./rabbit/2.jpg')} style={this.state.click%4===1 ? box_active : box_hidden}></img>
            <img src = {require('./rabbit/3.jpg')} style={this.state.click%4===2 ? box_active : box_hidden}></img>
            <img src = {require('./rabbit/4.jpg')} style={this.state.click%4===3 ? box_active : box_hidden}></img>
          </div>
        </div>
      </div>
    );
  }
}

export default FadeInOut;
