import React from "react";
import Button from "../../pages/admin/layout/Button";
import { IoIosArrowBack } from "react-icons/io";
import style from "../../pages/admin/studios/studio.module.css";
import { useNavigate } from "react-router-dom";

function StudioFooter({
  backOnclick,
  saveOnclick,
  saveType,
  backType,
  bname,
  sname,
  backDisabled,
  saveDisabled,
  showBtnLoader,
  loaderText,
}) {
  return (
    <>
      <div className={style.studioFooter}>
        <Button
          name={bname ? bname : "Back"}
          icon={<IoIosArrowBack />}
          style={{ height: "55%" }}
          onClick={backOnclick}
          type={backType}
          disabled={backDisabled}
        />
        <Button
          name={sname ? sname : "Save"}
          onClick={saveOnclick}
          style={{ height: "55%" }}
          type={saveType}
          disabled={saveDisabled}
          loaderText={loaderText}
          showBtnLoader={showBtnLoader}
        />
      </div>
    </>
  );
}

export default StudioFooter;
