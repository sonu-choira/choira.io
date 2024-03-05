import React from "react";
import Button from "../../pages/admin/layout/Button";
import { IoIosArrowBack } from "react-icons/io";
import style from "../../pages/admin/studios/studio.module.css";
import { useNavigate } from "react-router-dom";

function StudioFooter({ setSelectTab }) {
  const navigate = useNavigate();
  const gotoadminpage = () => {
    navigate("/adminDashboard");
  };
  return (
    <>
      <div className={style.studioFooter}>
        <Button
          name={"Back"}
          icon={<IoIosArrowBack />}
          style={{ height: "55%" }}
          onClick={gotoadminpage}
        />
        <Button name={"Save"} style={{ height: "55%" }} />
      </div>
    </>
  );
}

export default StudioFooter;
