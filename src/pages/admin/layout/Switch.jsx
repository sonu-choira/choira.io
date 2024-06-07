import React from "react";
import "../layout/layout.css";

function Switch({ status }) {
  return (
    <>
      <label className="switch">
        <input type="checkbox" checked={status} readOnly />
        <span className="slider"></span>
      </label>
    </>
  );
}

export default Switch;
