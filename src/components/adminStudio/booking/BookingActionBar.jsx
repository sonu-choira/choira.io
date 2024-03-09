import React from "react";
import Button from "../../../pages/admin/layout/Button";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";
import { LuFilePlus } from "react-icons/lu";
import style from "../../../pages/admin/studios/studio.module.css";
import { FaDownload } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function BookingActionBar({ setBookingPageCount, bookingPageCount, pagetype }) {
  console.log(bookingPageCount);
  const navigate = useNavigate();
  const gotoAddNew = (bookingPageCount) => {
    navigate("/service/musicProduction/add", {
      state: { navCount: 3, bookingPageCount: bookingPageCount },
    });
  };
  const gotoSlotBooking = () => {
    navigate("/service/AddSlotBooking", {
      state: { navCount: 4 },
    });
  };
  return (
    <>
      <div className={style.bookingStudiobtn} style={{ marginBottom: "2%" }}>
        <div>
          <div>
            <div
              style={{
                borderLeft: "none",
                backgroundColor: bookingPageCount === "c1" ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount("c1");
              }}
            >
              Studio
            </div>
            <div
              style={{
                backgroundColor: bookingPageCount === "c2" ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount("c2");
              }}
            >
              Music Production
            </div>
            {/* <div
              style={{
                backgroundColor: bookingPageCount === "c3" ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount("c3");
              }}
            >
              Artist
            </div> */}
            <div
              style={{
                borderRight: "none",
                backgroundColor: bookingPageCount === "c3" ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount("c3");
              }}
            >
              Mix-Master
            </div>
          </div>
        </div>
        <div style={{ justifyContent: bookingPageCount === "c1" ? "" : "end" }}>
          <Button
            name={"Card view"}
            icon={<FaTableCellsLarge />}
            style={{
              height: "50%",
              width: "20%",
              gap: "5%",
              backgroundColor: "#ADB5BD",
            }}
          />
          <Button
            name={"Filter"}
            icon={<FaFilter />}
            style={{
              height: "50%",
              width: "15%",
              gap: "5%",
              backgroundColor: "#ADB5BD",
            }}
          />
          <Button
            name={"Share"}
            icon={<FaShare />}
            style={{
              height: "50%",
              width: "15%",
              gap: "5%",
              backgroundColor: "#ADB5BD",
            }}
          />
          <Button
            name={"Download"}
            icon={<FaDownload />}
            style={{
              height: "50%",
              width: "15%",
              gap: "5%",
              backgroundColor: "#ADB5BD",
            }}
          />
          {(bookingPageCount === "c1") & (pagetype != "apps") ? (
            <Button
              name={"Slot Booking"}
              icon={<LuFilePlus />}
              style={{ height: "50%", width: "20%", gap: "5%" }}
              onClick={gotoSlotBooking}
            />
          ) : (
            ""
          )}

          {pagetype != "apps" ? (
            ""
          ) : bookingPageCount === "c2" || bookingPageCount === "c3" ? (
            <Button
              name={"Add New"}
              onClick={() => {
                gotoAddNew(bookingPageCount);
              }}
              icon={<MdNoteAdd />}
              style={{ height: "50%", width: "15%", gap: "5%" }}
            />
          ) : (
            ""
          )}

          {/* {pagetype !== "apps"
            ? ""
            : (bookingPageCount === "c2" || bookingPageCount === "c3") && (
                <Button
                  name={"Add New"}
                  icon={<MdNoteAdd />}
                  style={{ height: "50%", width: "15%", gap: "5%" }}
                />
              )} */}
        </div>
      </div>
    </>
  );
}

export default BookingActionBar;
