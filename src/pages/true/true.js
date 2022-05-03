import React from "react";
import { useNavigate } from "react-router-dom";

const True = (props) => {
  const navigate = useNavigate();

  return (
    <div className="True">
      <button>continue</button>
    </div>
  );
};

export default True;
