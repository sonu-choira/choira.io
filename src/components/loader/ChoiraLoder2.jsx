import React from "react";
import Loader from "../../assets/gifs/loading.gif";
import style from "./loader2.module.css";
function ChoiraLoder2() {
  return (
    <>
      <div className={style.parent}>
        <div className={style.child}>
          <img src={Loader} alt="choira loading" />
        </div>
      </div>
    </>
  );
}

export default ChoiraLoder2;
