import React from "react";
import Button from "../../pages/admin/layout/Button";
import { IoIosArrowBack } from "react-icons/io";

function StudioFooter({ setSelectTab }) {
  return (
    <>
      <div className="studioFooter">
        <Button
          name={"Back"}
          icon={<IoIosArrowBack />}
          style={{ height: "55%" }}
          onClick={() => {
            setSelectTab(0);
          }}
        />
        <Button name={"Save"} style={{ height: "55%" }} />
      </div>
    </>
  );
}

export default StudioFooter;
