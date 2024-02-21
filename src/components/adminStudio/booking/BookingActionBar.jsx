import React from "react";
import Button from "../../../pages/admin/layout/Button";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";
import { LuFilePlus } from "react-icons/lu";
import style from "../../../pages/admin/studios/studio.module.css";
import { FaDownload } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";

function BookingActionBar({ setBookingPageCount, bookingPageCount }) {
  return (
    <>
      <div className={style.bookingStudiobtn} style={{ marginBottom: "2%" }}>
        <div>
          <div>
            <div
              style={{
                borderLeft: "none",
                backgroundColor: bookingPageCount == "c1" ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount("c1");
              }}
            >
              Studio
            </div>
            <div
              style={{
                backgroundColor: bookingPageCount == "c2" ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount("c2");
              }}
            >
              Music Production
            </div>
            <div
              style={{
                backgroundColor: bookingPageCount == "c3" ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount("c3");
              }}
            >
              Artist
            </div>
            <div
              style={{
                borderRight: "none",
                backgroundColor: bookingPageCount == "c4" ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount("c4");
              }}
            >
              Mix-Master
            </div>
          </div>
        </div>
        <div style={{ justifyContent: bookingPageCount == "c1" ? "" : "end" }}>
          <Button
            name={"Card view"}
            icon={<FaTableCellsLarge />}
            style={{ height: "50%", width: "20%", gap: "5%" }}
          />
          <Button
            name={"Filter"}
            icon={<FaFilter />}
            style={{ height: "50%", width: "15%", gap: "5%" }}
          />
          <Button
            name={"Share"}
            icon={<FaShare />}
            style={{ height: "50%", width: "15%", gap: "5%" }}
          />
          {bookingPageCount == "c1" ? (
            <Button
              name={"Slot Booking"}
              icon={<LuFilePlus />}
              style={{ height: "50%", width: "20%", gap: "5%" }}
            />
          ) : (
            ""
          )}
          <Button
            name={"Download"}
            icon={<FaDownload />}
            style={{ height: "50%", width: "15%", gap: "5%" }}
          />
          <Button
            name={"Add New"}
            icon={<MdNoteAdd />}
            style={{ height: "50%", width: "15%", gap: "5%" }}
          />
        </div>
      </div>
    </>
  );
}

export default BookingActionBar;
