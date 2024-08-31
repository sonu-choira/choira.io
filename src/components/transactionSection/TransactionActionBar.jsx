import React, { useState } from "react";
import Button from "../../pages/admin/layout/Button";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";
import { LuFilePlus } from "react-icons/lu";
import style from "../../pages/admin/studios/studio.module.css";
import { FaDownload } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import appAndmoreApi from "../../services/appAndmoreApi";
import { useNavigateRouter } from "../../navigateRoute";
import { partnerAccess } from "../../config/partnerAccess";

function TransactionActionBar({
  pagetype,
  downloadAllData,
  TransactionPageCount,
  setTransactionPageCount,
}) {
  const router = useNavigateRouter();

  console.log(TransactionPageCount);
  // const navigate = useNavigate();

  let { navOption: pageData, page: type } = useParams();
  console.log("page ka data ", useParams());

  const goToPage = (page) => {
    router.push(`/adminDashboard/Transaction/${page}`);
  };
  const [navAccess, setnavAccess] = useState(partnerAccess || "");

  return (
    <>
      <div className={style.bookingStudiobtn} style={{ marginBottom: "2%" }}>
        {!navAccess ? (
          <div style={{ width: "56%" }}>
            <div>
              <div
                style={{
                  borderLeft: "none",
                  backgroundColor:
                    TransactionPageCount === "t1" ? "#ffc701" : "",
                  // backgroundColor: "#ADB5BD",
                  // cursor: "not-allowed",
                }}
                onClick={() => {
                  setTransactionPageCount("t1");
                  goToPage("studio");
                }}
              >
                Studio
              </div>
              <div
                style={{
                  backgroundColor:
                    TransactionPageCount === "t2" ? "#ffc701" : "",
                }}
                onClick={() => {
                  setTransactionPageCount("t2");
                  goToPage("musicproduction");
                }}
              >
                Music Production
              </div>

              <div
                style={{
                  backgroundColor:
                    TransactionPageCount === "t3" ? "#ffc701" : "",
                  // backgroundColor: "#ADB5BD",
                  // cursor: "not-allowed",
                }}
                onClick={() => {
                  setTransactionPageCount("t3");
                  goToPage("artist");
                }}
              >
                Artist
              </div>
              <div
                style={{
                  borderRight: "none",
                  backgroundColor:
                    TransactionPageCount === "t4" ? "#ffc701" : "",
                  // backgroundColor: "#ADB5BD",
                  // cursor: "not-allowed",
                }}
                onClick={() => {
                  setTransactionPageCount("t4");
                  goToPage("mixmaster");
                }}
              >
                Mix-Master
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div
          style={{ justifyContent: TransactionPageCount === "t1" ? "" : "end" }}
        >
          <Button
            name={"Filter"}
            disabled={true}
            icon={<FaFilter />}
            style={{
              height: "50%",
              width: "15%",
              gap: "5%",
              backgroundColor: "#ADB5BD",
            }}

            // onClick={router.back}
          />
          <Button
            name={"Share"}
            disabled={true}
            icon={<FaShare />}
            style={{
              height: "50%",
              width: "15%",
              gap: "5%",
              backgroundColor: "#ADB5BD",
            }}
            // onClick={router.forward}
          />
          <Button
            name={"Download"}
            disabled={true}
            icon={<FaDownload />}
            style={{
              height: "50%",
              width: "15%",
              gap: "5%",
              backgroundColor: "#ADB5BD",
            }}
            // onClick={
            //   pagetype == "apps" ? downloadAllData : downloadBookingsData
            // }
          />
          {(TransactionPageCount === "t1") & (pagetype != "apps") ? (
            <Button
              name={"Slot Booking"}
              icon={<LuFilePlus />}
              style={{
                height: "50%",
                width: "20%",
                gap: "5%",
                backgroundColor: "#ADB5BD",
              }}
              // onClick={gotoSlotBooking}
            />
          ) : (
            ""
          )}

          {pagetype != "apps"
            ? ""
            : TransactionPageCount === "t2" ||
              TransactionPageCount === "t3" ||
              TransactionPageCount === "t1"
            ? ""
            : // <Button
              //   name={"Add New"}
              //   onClick={() => {
              //     // gotoAddNew(TransactionPageCount);
              //   }}
              //   icon={<MdNoteAdd />}
              //   style={{
              //     height: "50%",
              //     width: "18%",
              //     gap: "5%",
              //     // backgroundColor: "#ADB5BD",
              //   }}
              // />
              ""}
        </div>
      </div>
    </>
  );
}

export default TransactionActionBar;
