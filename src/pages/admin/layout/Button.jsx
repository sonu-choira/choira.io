import React from "react";

import "../layout/layout.css";
function Button({ name, icon, onClick, style, type, disabled }) {
  return (
    <>
      <button
        className={`${disabled ? "btndisabled" : "reuseablebtn"}`}
        onClick={onClick}
        style={style}
        type={type}
      >
        <div>{icon}</div>
        <div>{name}</div>
      </button>
    </>
  );
}

export default Button;
