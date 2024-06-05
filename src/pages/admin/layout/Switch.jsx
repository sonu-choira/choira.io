import React from "react";
import "../layout/layout.css";

function Switch({ status }) {
  return (
    <>
      <label class="switch">
        <input type="checkbox" checked={status} readOnly />
        <span class="slider"></span>
      </label>
    </>
  );
}

export default Switch;
