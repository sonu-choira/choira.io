import React, { useState, useEffect, useRef } from "react";
import { FaAngleRight } from "react-icons/fa6";
import img1 from "../../assets/img/chooseType-img/connect1.jpg";
import img2 from "../../assets/img/chooseType-img/connect2.jpg";
import img3 from "../../assets/img/chooseType-img/connect3.jpg";
import img4 from "../../assets/img/chooseType-img/cg1.jpeg";
import timer from "../../assets/img/chooseType-img/timer.gif";
import { useNavigate } from "react-router-dom";

const ConnectInFewSecond = ({
  setUserProjectData,
  userProjectData,
  onUserProjectDataUpdate,
}) => {
  const images = [img1, img2, img3, img4];
  const usernames = ["soni", "kajal", "ravi", "sonu"];
  const intervalTime = 1500; // in milliseconds
  const totalDuration = 5000; // in milliseconds

  const [rightIndex, setRightIndex] = useState(0);
  const [centerIndex, setCenterIndex] = useState(1);
  const [leftIndex, setLeftIndex] = useState(2);
  const [currentUsername, setCurrentUsername] = useState(usernames[0]);
  const [wait, setWait] = useState(false);

  const intervalIdRef = useRef(null);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setRightIndex((prevRightIndex) => (prevRightIndex + 1) % images.length);
      setCenterIndex(
        (prevCenterIndex) => (prevCenterIndex + 1) % images.length
      );
      setLeftIndex((prevLeftIndex) => (prevLeftIndex + 1) % images.length);
      setCurrentUsername(usernames[(rightIndex + 1) % images.length]);
    }, intervalTime);

    // Stop the interval after totalDuration
    setTimeout(() => {
      clearInterval(intervalIdRef.current);
      setWait(true);
    }, totalDuration);

    // Clear interval on component unmount
    return () => clearInterval(intervalIdRef.current);
  }, [intervalTime, totalDuration, rightIndex, images.length, usernames]);
  // const [dataUpdatedNavigateNow, setDataUpdatedNavigateNow] = useState(false);
  const navigate = useNavigate();

  const joinNow = async () => {
    console.log("currentUsername");
    // await setConnectedPersonName(currentUsername);
    const jkt = await setUserProjectData((prevdata) => {
      return { ...prevdata, ConnectedPerson: currentUsername };
    });
    console.log("currentUsername", jkt);

    // setDataUpdatedNavigateNow(true);.
    // onUserProjectDataUpdate();
    localStorage.clear();
  };
  // useEffect(() => {
  //   // Check if userProjectData has been updated by child components
  //   if (dataUpdatedNavigateNow) {
  //     navigate("/choiratest", { state: { userProjectData } });
  //     // Reset the flag after navigation
  //     setDataUpdatedNavigateNow(false);
  //   }
  // }, [dataUpdatedNavigateNow, userProjectData, navigate]);

  return (
    <>
      <div className="project-div2">
        <div>
          <h2> Connect in few seconds</h2>
        </div>
        <div className="connectInFewSecond">
          <div className="connect-img">
            <div className="right-img">
              <img src={images[rightIndex]} alt={currentUsername} />
            </div>
            <div className="center-img">
              <img src={images[centerIndex]} alt={currentUsername} />
            </div>
            <div className="left-img">
              <img src={images[leftIndex]} alt={currentUsername} />
            </div>
          </div>
          <div className="username">{currentUsername}</div>

          <div className="connectInFewSecond-details">
            <p>
              Thank you for connecting with Choira. Our Account Relationship{" "}
              <br />
              Manager will join you shortly with more updates regarding your{" "}
              <br />
              project.
            </p>
          </div>
        </div>

        <div className="project-div2-btn">
          {wait ? (
            <button onClick={joinNow}>
              Join Now <FaAngleRight />
            </button>
          ) : (
            <img src={timer} />
          )}
        </div>
      </div>
    </>
  );
};

export default ConnectInFewSecond;
