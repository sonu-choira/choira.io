import React from "react";
import Button from "../../pages/admin/layout/Button";
import { IoIosArrowBack } from "react-icons/io";
import style from "../../pages/admin/studios/studio.module.css";
import { useNavigate } from "react-router-dom";

function StudioFooter({ backOnclick, saveOnclick, saveType, backType }) {
  return (
    <>
      <div className={style.studioFooter}>
        <Button
          name={"Back"}
          icon={<IoIosArrowBack />}
          style={{ height: "55%" }}
          onClick={backOnclick}
          type={backType}
        />
        <Button
          name={"Save"}
          onClick={saveOnclick}
          style={{ height: "55%" }}
          type={saveType}
        />
      </div>
    </>
  );
}

export default StudioFooter;
