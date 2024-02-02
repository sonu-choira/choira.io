import React from "react";

import "../layout/layout.css";
function Button({ name, icon, onClick, style }) {
  return (
    <>
      <button className="reuseablebtn" onClick={onClick} style={style}>
        {icon}
        {name}
      </button>
    </>
  );
}

export default Button;
