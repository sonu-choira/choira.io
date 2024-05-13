import React, { useState } from "react";
import StudioPatners from "../teamsSection/StudioPatners";
import TeamsActionBar from "../teamsSection/TeamActionBar";
import style from "../../pages/admin/studios/studio.module.css";

function ShowAllUser() {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [filterNav, setfilterNav] = useState(false);
  const [shortby, setShortby] = useState("asc");
  return (
    <div
      className={style.allStudioDetailsPage}
      // style={{ border: "2px solid red" }}
    >
      <TeamsActionBar />
    </div>
  );
}

export default ShowAllUser;
