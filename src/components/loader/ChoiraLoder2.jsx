import React, { useEffect, useState } from "react";
import Loader from "../../assets/gifs/loading.gif";
import style from "./loader2.module.css";
import nodata from "./nodataFound.png";
function ChoiraLoder2() {
  const [noDataFound, setnoDataFound] = useState(false);
  useEffect(() => {
    let abc = setTimeout(() => {
      setnoDataFound(true);
    }, 5000);

    return () => {
      clearTimeout(abc);
    };
  });

  return (
    <>
      {noDataFound ? (
        <span className={style.parent}>
          <div className={style.child2}>
            <img
              src={nodata}
              style={{ height: "90%", width: "90%" }}
              alt="No Data Found"
            />
          </div>
        </span>
      ) : (
        <span className={style.parent}>
          <div className={style.child}>
            <img src={Loader} alt="choira loading" />
          </div>
        </span>
      )}
    </>
  );
}

export default ChoiraLoder2;
