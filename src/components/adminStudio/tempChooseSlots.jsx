// import React, { useEffect, useState } from "react";
// import { GrSubtractCircle, GrAddCircle } from "react-icons/gr";
// import style from "../../pages/admin/studios/studio.module.css";
// import { useLocation } from "react-router-dom";
// import ChoiraLoder2 from "../loader/ChoiraLoder2";
// import { set } from "react-ga";

// function ChooseTimeSlot({
//   allTimeSlots,
//   hitapi,
//   timeSlotApiData,
//   setallTimeSlots,
//   setSelectedSlot,
//   selectedSlot,
//   setTimeSlotApiData,
// }) {
//   const data = useLocation();

//   const [counter, setCounter] = useState(Number(timeSlotApiData.bookingHours));

//   const handelCounter = (type) => {
//     setCounter((prevCounter) => {
//       if (type === "add" && prevCounter < 24) {
//         let ans = prevCounter + 1;
//         setTimeSlotApiData((prevState) => {
//           return {
//             ...prevState,
//             bookingHours: ans,
//             totalPrice: prevState.actualBasePrice * ans,
//           };
//         });

//         return ans;
//       } else if (type === "sub" && prevCounter > 1) {
//         let ans = prevCounter - 1;
//         setTimeSlotApiData((prevState) => {
//           return {
//             ...prevState,
//             bookingHours: ans,
//             totalPrice: prevState.actualBasePrice * ans,
//           };
//         });
//         return ans;
//       }
//       return prevCounter;
//     });
//   };

//   useEffect(async () => {
//     await setallTimeSlots({});
//     hitapi();
//   }, [counter]);

//   const allSlots = allTimeSlots?.allSlots || [];
//   const availableSlots = allTimeSlots?.availableSlots || [];
//   const bookedSlots = allTimeSlots?.bookedSlots || [];

//   // Find unavailable slots by checking which allSlots are not in availableSlots
//   let unavailableSlots = allSlots.filter((slot) => {
//     return !availableSlots.some(
//       (availableSlot) =>
//         availableSlot.startTime === slot.startTime &&
//         availableSlot.endTime === slot.endTime
//     );
//   });

//   // Combine unavailableSlots and bookedSlots
//   unavailableSlots = [...unavailableSlots, ...bookedSlots];

//   console.log("unavailableSlots", unavailableSlots);

//   const chunkArray = (array, size) => {
//     const result = [];
//     for (let i = 0; i < array.length; i += size) {
//       result.push(array.slice(i, i + size));
//     }
//     return result;
//   };

//   useEffect(() => {
//     console.log("selectedSlot", selectedSlot);
//     if (selectedSlot) {
//       setTimeSlotApiData((prev) => ({
//         ...prev,
//         bookingTime: selectedSlot,
//       }));
//     } else {
//       // timeSlotApiData.current.bookingTime = "";
//     }
//   }, [selectedSlot]);

//   const chunkedTimeSlots = chunkArray(allSlots, 4);

//   const handleSlotClick = (slot) => {
//     if (
//       unavailableSlots.some(
//         (unavailableSlot) =>
//           unavailableSlot.startTime === slot.startTime &&
//           unavailableSlot.endTime === slot.endTime
//       )
//     ) {
//       return; // Do nothing if the slot is unavailable
//     }

//     if (slot === selectedSlot) {
//       setSelectedSlot(null); // Deselect the slot if it's already selected
//     } else {
//       setSelectedSlot(slot); // Select the clicked slot
//     }
//   };
//   console.log(!allTimeSlots?.status);
//   console.log(allTimeSlots);

//   return (
//     <div className={style.timeSlotDiv}>
//       {!allTimeSlots?.status ? (
//         <ChoiraLoder2 />
//       ) : (
//         <div className={style.mainSlotDiv}>
//           <div>
//             <div>
//               <h3>Choose Time Slot</h3>
//             </div>
//             <div className={style.counterMaindiv}>
//               <div>
//                 <b>Choose</b>
//                 <small>Hour 1-24</small>
//               </div>
//               <div className={style.counterDiv}>
//                 <GrSubtractCircle
//                   style={{ cursor: "pointer" }}
//                   onClick={() => {
//                     handelCounter("sub");
//                   }}
//                 />
//                 <p>{counter}</p>
//                 <GrAddCircle
//                   style={{ cursor: "pointer" }}
//                   onClick={() => {
//                     handelCounter("add");
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className={style.allSlots}>
//             {chunkedTimeSlots.map((chunk, index) => (
//               <div key={index} className={style.selectSlotDiv}>
//                 {chunk.map((slot, idx) => (
//                   <div
//                     key={idx}
//                     className={`${style.slots} ${
//                       slot === selectedSlot ? style.selected : ""
//                     } ${
//                       unavailableSlots.some(
//                         (unavailableSlot) =>
//                           unavailableSlot.startTime === slot.startTime &&
//                           unavailableSlot.endTime === slot.endTime
//                       )
//                         ? style.unavailable
//                         : ""
//                     }`}
//                     onClick={() => handleSlotClick(slot)}
//                     style={{
//                       cursor: unavailableSlots.some(
//                         (unavailableSlot) =>
//                           unavailableSlot.startTime === slot.startTime &&
//                           unavailableSlot.endTime === slot.endTime
//                       )
//                         ? "not-allowed"
//                         : "pointer",
//                     }}
//                   >
//                     {slot.startTime} - {slot.endTime}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChooseTimeSlot;
