import React from "react";
import "../layout/layout.css";
function Button({ name, onClick, style }) {
  return (
    <>
      <button className="reuseablebtn" onClick={onClick} style={style}>
        {name}
      </button>
    </>
  );
}

export default Button;
