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

function TeamsActionBar({
  pagetype,
  downloadAllData,
  teamsPageCount,
  setTeamsPageCount,
}) {
  const router = useNavigateRouter();

  console.log(teamsPageCount);
  // const navigate = useNavigate();

  let { navOption: pageData, page: type } = useParams();
  console.log("page ka data ", useParams());

  const gotoAddNew = (teamsPageCount) => {
    if (teamsPageCount === "t2") {
      router.push("/adminDashboard/Teams/AddStudioPatner");
    } else if (teamsPageCount === "t1") {
      router.push("/adminDashboard/Teams/AddNewArm");
    }
    //  else {
    //   router.push("/adminDashboard/Teams/AddStudioPatner");
    // }
    // else {
    //   router.push("/service/musicProduction/add", {
    //     state: { navCount: 3, teamsPageCount: teamsPageCount },
    //   });
    // }
  };
  const gotoSlotBooking = () => {
    router.push("/service/AddSlotBooking", {
      state: { navCount: 4 },
    });
  };

  const gotoStudioPartners = () => {
    if (pageData == "Teams") {
      router.push("/adminDashboard/Teams/StudioPartners");
    } else {
      router.push("/adminDashboard/Bookings/musicproduction");
    }
  };
  const gotoARM = () => {
    if (pageData == "Teams") {
      router.push("/adminDashboard/Teams/Arm");
    } else {
      router.push("/adminDashboard/Bookings/studio");
    }
  };
  const gotoArtist = () => {
    if (pageData == "Teams") {
      router.push("/adminDashboard/Teams/Artist");
    } else {
      router.push("/adminDashboard/Bookings/mixmaster");
    }
  };
  const gotoMusicProducer = () => {
    if (pageData == "Teams") {
      router.push("/adminDashboard/Teams/MusicProducer");
    } else {
      router.push("/adminDashboard/Bookings/mixmaster");
    }
  };
  return (
    <>
      <div className={style.bookingStudiobtn} style={{ marginBottom: "2%" }}>
        <div style={{ width: "58.4%" }}>
          <div>
            <div
              style={{
                borderLeft: "none",
                backgroundColor: teamsPageCount === "t1" ? "#ffc701" : "",
                backgroundColor: "#ADB5BD",
                cursor: "not-allowed",
              }}
              onClick={() => {
                // setTeamsPageCount("t1");
                gotoARM();
              }}
            >
              ARM
            </div>
            <div
              style={{
                backgroundColor: teamsPageCount === "t2" ? "#ffc701" : "",
              }}
              onClick={() => {
                setTeamsPageCount("t2");
                gotoStudioPartners();
              }}
            >
              Studio Patners
            </div>

            <div
              style={{
                // backgroundColor: teamsPageCount === "t3" ? "#ffc701" : "",
                backgroundColor: "#ADB5BD",
                cursor: "not-allowed",
              }}
              onClick={() => {
                // setTeamsPageCount("t3");
                // gotoArtist();
              }}
            >
              Artist
            </div>
            <div
              style={{
                borderRight: "none",
                // backgroundColor: teamsPageCount === "t4" ? "#ffc701" : "",
                backgroundColor: "#ADB5BD",
                cursor: "not-allowed",
              }}
              onClick={() => {
                // setTeamsPageCount("t4");
                // gotoMusicProducer();
              }}
            >
              Music Producers
            </div>
          </div>
        </div>
        <div style={{ justifyContent: teamsPageCount === "t1" ? "" : "end" }}>
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
          {(teamsPageCount === "t1") & (pagetype != "apps") ? (
            <Button
              name={"Slot Booking"}
              icon={<LuFilePlus />}
              style={{
                height: "50%",
                width: "20%",
                gap: "5%",
                backgroundColor: "#ADB5BD",
              }}
              onClick={gotoSlotBooking}
            />
          ) : (
            ""
          )}

          {pagetype != "apps" ? (
            ""
          ) : teamsPageCount === "t2" ||
            teamsPageCount === "t3" ||
            teamsPageCount === "t1" ? (
            <Button
              name={"Add New"}
              onClick={() => {
                gotoAddNew(teamsPageCount);
              }}
              icon={<MdNoteAdd />}
              style={{
                height: "50%",
                width: "18%",
                gap: "5%",
                // backgroundColor: "#ADB5BD",
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default TeamsActionBar;
