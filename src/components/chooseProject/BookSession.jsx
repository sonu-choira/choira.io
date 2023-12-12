import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BookSession = ({ onNext }) => {
  const handleContinue = () => {
    // Perform any necessary actions in this component
    // ...

    // Call the callback to trigger navigation to the next component
    onNext();
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSlotData, setSelectedSlotData] = useState(null);
  const [daysNavigated, setDaysNavigated] = useState(0);

  const handleNextDate = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);

    if (nextDate.getMonth() !== currentDate.getMonth()) {
      nextDate.setDate(1);
    }

    setDaysNavigated(daysNavigated + 1);

    if (daysNavigated >= 7) {
      setCurrentDate(new Date());
      setDaysNavigated(0);
    } else {
      setCurrentDate(nextDate);
    }

    // Reset selected slot when navigating to the next date
    setSelectedSlot(null);
  };

  const handlePreviousDate = () => {
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);

    if (previousDate.getMonth() !== currentDate.getMonth()) {
      const lastDayOfPrevMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      previousDate.setDate(lastDayOfPrevMonth);
    }

    if (daysNavigated > 0) {
      setDaysNavigated(daysNavigated - 1);
      setCurrentDate(previousDate);
    }

    // Reset selected slot when navigating to the previous date
    setSelectedSlot(null);
  };

  const getDayOfWeek = (date, offset = 0) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + offset);
    return daysOfWeek[newDate.getDay()];
  };

  const getFormattedDate = (date, offset = 0) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + offset);
    return newDate.getDate();
  };

  const handleSlotClick = (slot) => {
    // Store the selected slot in the state
    setSelectedSlot(slot);

    // Store the content of todaysDate and bookSession-month
    const todaysDateContent = document.querySelector(".todaysDate").textContent;
    const bookSessionMonthContent =
      document.querySelector(".bookSession-month").textContent;

    // Store the selected slot data
    setSelectedSlotData({
      slot: slot,
      todaysDate: todaysDateContent,
      bookSessionMonth: bookSessionMonthContent,
    });

    // Show an alert with the selected slot and additional data
    alert(
      `Selected Slot: ${slot}\n Selected Date: ${todaysDateContent}\nBook Session Month: ${bookSessionMonthContent}`
    );
  };

  const timeSlotsData = [
    {
      label: "Morning",
      slots: ["11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"],
    },
    {
      label: "Afternoon",
      slots: ["1:00 PM", "1:30 PM", "3:00 PM", "3:30 PM"],
    },
    {
      label: "Evening",
      slots: ["4:00 PM", "6:00 PM", "6:30 PM"],
    },
  ];

  const generateTimeSlots = () => {
    return timeSlotsData.map((mainSlot, index) => (
      <div className="main-slots" key={index}>
        <div className="slots">
          {mainSlot.slots.map((time, i) => (
            <div
              key={i}
              className={`slot ${selectedSlot === time ? "selected" : ""}`}
              onClick={() => handleSlotClick(time)}
            >
              {time}
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const timeZoneOffset = new Date().getTimezoneOffset();
  const timeZoneHours = Math.floor(Math.abs(timeZoneOffset) / 60);
  const timeZoneMinutes = Math.abs(timeZoneOffset) % 60;
  const timeZoneSign = timeZoneOffset > 0 ? "-" : "+";
  const timeZoneString = `(${timeZoneSign}${String(timeZoneHours).padStart(
    2,
    "0"
  )}:${String(timeZoneMinutes).padStart(2, "0")} IST)`;

  return (
    <>
      <div className="project-div2">
        <div className="BookSession-title">
          <div>
            <button>
              <FaAngleLeft />
              Back
            </button>
          </div>
          <div>
            <h2>Book a Session with ARM</h2>
            <p>
              Your time zone: {Intl.DateTimeFormat().resolvedOptions().timeZone}{" "}
              {timeZoneString}
            </p>
          </div>
        </div>
        <div className="bookSession-div">
          <div>
            <h2>Choose your time slot</h2>
          </div>
          <div className="bookSession-month">
            <h5>
              {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
                currentDate
              )}{" "}
              {currentDate.getFullYear()}
            </h5>
          </div>
          <div className="book-custom-dates">
            <div className="gotoPreviousDate" onClick={handlePreviousDate}>
              <button type="button">
                <FaAngleLeft />
              </button>
            </div>
            <div>
              <div className="previousDate">
                {getDayOfWeek(currentDate, -1)}
              </div>
              <div>{getFormattedDate(currentDate, -1)}</div>
            </div>
            <div className="todaysDate">
              <div>{getDayOfWeek(currentDate)}</div>
              <div>{getFormattedDate(currentDate)}</div>
            </div>
            <div>
              <div className="tomorrowDate">{getDayOfWeek(currentDate, 1)}</div>
              <div>{getFormattedDate(currentDate, 1)}</div>
            </div>
            <div className="gotoNextDate">
              <button>
                <FaAngleRight onClick={handleNextDate} />
              </button>
            </div>
          </div>
          <div>
            <h5>Available time slots</h5>
          </div>
          <div className="timeSlot">{generateTimeSlots()}</div>
        </div>

        <div className="project-div2-btn">
          <button type="button" onClick={handleContinue}>
            Continue <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default BookSession;
