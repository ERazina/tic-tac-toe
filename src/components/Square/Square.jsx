import React from "react";
import "./style.scss";

const Square = ({ index, value, counter }) => {
  const clickBtn = () => {
    if (!value) {
      counter(index);
    }
  };

  return (
    <button className="square" onClick={clickBtn}>
      {value}
    </button>
  );
};

export default Square;
