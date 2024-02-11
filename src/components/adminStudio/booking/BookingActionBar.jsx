import React from "react";
import Button from "../../../pages/admin/layout/Button";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";
import { LuFilePlus } from "react-icons/lu";

function BookingActionBar({ setBookingPageCount, bookingPageCount }) {
  return (
    <>
      <div className="bookingStudiobtn" style={{ marginBottom: "2%" }}>
        <div>
          <div>
            <div
              style={{
                borderLeft: "none",
                backgroundColor: bookingPageCount == 1 ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount(1);
              }}
            >
              Studio
            </div>
            <div
              style={{
                backgroundColor: bookingPageCount == 2 ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount(2);
              }}
            >
              Music Production
            </div>
            <div
              style={{
                backgroundColor: bookingPageCount == 3 ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount(3);
              }}
            >
              Artist
            </div>
            <div
              style={{
                borderRight: "none",
                backgroundColor: bookingPageCount == 4 ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount(4);
              }}
            >
              Mix-Master
            </div>
          </div>
        </div>
        <div style={{ justifyContent: bookingPageCount == 1 ? "" : "end" }}>
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
          {bookingPageCount == 1 ? (
            <Button
              name={"Slot Booking"}
              icon={<LuFilePlus />}
              style={{ height: "50%", width: "28%", gap: "5%" }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default BookingActionBar;
