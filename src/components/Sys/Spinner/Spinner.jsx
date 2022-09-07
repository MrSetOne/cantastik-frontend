import React from "react";
import "./Spinner.scss";

const Spinner = ({ visible }) => {
  return (
    <div
      className="Spinner__Container"
      style={{ display: visible ? "flex" : "none", zIndex: 100 }}
    >
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
