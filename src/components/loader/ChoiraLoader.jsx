import React from "react";
import Loader from "../../assets/gifs/loading.gif";
import "./loader.css";

export default function ChoiraLoader({ isDashboard, ...other }) {
  return (
    <>
      {!isDashboard && (
        <div className="parent">
          <div className="child">
            <img src={Loader} alt="choira loading" />
          </div>
        </div>
      )}
    </>
  );
}
