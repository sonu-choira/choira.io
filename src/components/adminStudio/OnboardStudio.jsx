import React from "react";
import { FaCheckDouble, FaRegClock } from "react-icons/fa6";
import { LuFilePlus } from "react-icons/lu";
import { MdCalendarMonth } from "react-icons/md";
import { GrTableAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function OnboardStudio({ setSelectTab, selectTab }) {
  const navigate = useNavigate();
  const gotoBooking = () => {
    navigate("/booking");
  };

  // const gotoDashboard = () => {
  //   navigate("/dashboard");
  // };
  return (
    <>
      <div className="onboardStudio">
        <div>👋 Hey Stacy!</div>
        <div>Let’s Onboard Studios</div>
        <div>
          <div
            onClick={() => {
              setSelectTab(1);
            }}
          >
            <div>
              <FaRegClock />
            </div>
            <div>All studio</div>
          </div>
          <div
            onClick={() => {
              setSelectTab(2);
            }}
          >
            <div>
              <LuFilePlus />
            </div>
            <div>Add new studio</div>
          </div>
          <div onClick={gotoBooking}>
            <div>
              <FaCheckDouble />
            </div>
            <div>Bookings</div>
          </div>
          <div
            onClick={() => {
              setSelectTab(3);
            }}
          >
            <div>
              <GrTableAdd />
            </div>
            <div>Slot Booking</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnboardStudio;
