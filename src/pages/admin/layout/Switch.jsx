import React from "react";
import "../layout/layout.css";
import LoaderUpdating from "./LoaderUpdating";

function Switch({ status, onClick, isloading, switchDisabled }) {
  return (
    <>
      <label className={switchDisabled ? "switch switchDisabled" : "switch"}>
        {isloading ? (
          <LoaderUpdating />
        ) : (
          <>
            <input
              type="checkbox"
              checked={status}
              readOnly
              onClick={onClick}
              disabled={switchDisabled}
              className={switchDisabled ? " switchDisabled" : ""}
            />
            <span
              className={switchDisabled ? "slider switchDisabled" : "slider"}
            ></span>
          </>
        )}
      </label>
    </>
  );
}

export default Switch;
