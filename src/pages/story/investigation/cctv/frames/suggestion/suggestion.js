import { React } from "react";
import "./suggestion.css";

const MyModal = (props) => {
  const click1 = () => {
    props.closeAll();
    props.setMyAnswer((prevMyAnswer) => {
      prevMyAnswer[props.number] = 1;
      return [...prevMyAnswer];
    });
  };
  const click2 = () => {
    props.setMyAnswer((prevMyAnswer) => {
      props.closeAll();
      prevMyAnswer[props.number] = 2;
      return [...prevMyAnswer];
    });
  };
  const click3 = () => {
    props.setMyAnswer((prevMyAnswer) => {
      props.closeAll();
      prevMyAnswer[props.number] = 3;
      return [...prevMyAnswer];
    });
  };
  if (props.isOpen) {
    return (
      <div className="modal">
        <div className="imgBox">
          <img
            src={props.suggestion[0]}
            style={{
              border: "5px solid green",
              margin: "10px",
              width: "20%",
              cursor: "pointer",
            }}
            onClick={click1}
          ></img>
          <img
            src={props.suggestion[1]}
            style={{
              border: "5px solid #dbb704",
              margin: "10px",
              width: "20%",
              cursor: "pointer",
            }}
            onClick={click2}
          ></img>
          <img
            src={props.suggestion[2]}
            style={{
              border: "5px solid #9c0909",
              margin: "10px",
              width: "20%",
              cursor: "pointer",
            }}
            onClick={click3}
          ></img>
        </div>
      </div>
    );
  }
};

export default MyModal;
