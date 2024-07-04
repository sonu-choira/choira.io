import React from "react";
import "../layout/layout.css";
import LoaderUpdating from "./LoaderUpdating";

function Switch({ status, onClick, isloading }) {
  return (
    <>
      <label className="switch">
        {isloading ? (
          <LoaderUpdating />
        ) : (
          <>
            <input
              type="checkbox"
              checked={status}
              readOnly
              onClick={onClick}
            />
            <span className="slider"></span>
          </>
        )}
      </label>
    </>
  );
}

export default Switch;
