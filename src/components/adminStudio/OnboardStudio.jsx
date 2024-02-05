import React from "react";
import { FaCheckDouble, FaRegClock } from "react-icons/fa6";
import { LuFilePlus } from "react-icons/lu";
import { MdCalendarMonth } from "react-icons/md";

function OnboardStudio() {
  return (
    <>
      <div className="onboardStudio">
        <div>👋 Hey Stacy!</div>
        <div>Let’s Onboard Studios</div>
        <div>
          <div>
            <div>
              <FaRegClock />
            </div>
            <div>All studio</div>
          </div>
          <div>
            <div>
              <LuFilePlus />
            </div>
            <div>Add new studio</div>
          </div>
          <div>
            <div>
              <FaCheckDouble />
            </div>
            <div>Bookings</div>
          </div>
          <div>
            <div>
              <MdCalendarMonth />
            </div>
            <div>Slot Booking</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnboardStudio;
