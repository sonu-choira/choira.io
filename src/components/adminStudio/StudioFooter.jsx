import React from "react";
import Button from "../../pages/admin/layout/Button";
import { IoIosArrowBack } from "react-icons/io";
import style from "../../pages/admin/studios/studio.module.css";
import { useNavigate } from "react-router-dom";

function StudioFooter({ backOnclick, saveOnclick }) {
  return (
    <>
      <div className={style.studioFooter}>
        <Button
          name={"Back"}
          icon={<IoIosArrowBack />}
          style={{ height: "55%" }}
          onClick={backOnclick}
        />
        <Button name={"Save"} onClick={saveOnclick} style={{ height: "55%" }} />
      </div>
    </>
  );
}

export default StudioFooter;
