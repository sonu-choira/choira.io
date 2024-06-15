import React, { useEffect, useRef, useState } from "react";
import { MdAddAPhoto, MdOutlineSettings } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import upload from "../../assets/img/upload.png";
import style from "../../pages/admin/studios/studio.module.css";

import {
  FaCheckDouble,
  FaFilter,
  FaRegBell,
  FaRegClock,
  FaShare,
} from "react-icons/fa6";
import WebDashboard2 from "../../pages/produce/WebDashBoard2";
import { IoSearch } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import timeSlotApi from "../../services/timeSlotApi";
import { event, send } from "react-ga";
import StudioFooter from "../adminStudio/StudioFooter";
import teamsApi from "../../services/teamsApi";
import { errorAlert, sucessAlret } from "../../pages/admin/layout/Alert";

function AddNewStudioPatner({ setSelectTab }) {
  const addPartnerData = useRef({
    firstName: "",
    lastName: "",
    email: "",
    studioId: "",
    password: "",
  });
  const [test, settest] = useState(addPartnerData);
  // const addPartnerData = useRef({
  //   firstName: "ss",
  //   lastName: "aa",
  //   email: "aaa",
  //   studioId: "63d1225e1b3a159c2ce0799e",
  //   roomId: "1",
  //   bookingDate: "2024-05-18",
  //   bookingHours: "1",
  // });

  const data = useLocation();
  const [tabCount, setTabCount] = useState();
  const navCount = data?.state?.navCount;
  const [showAllSlots, setshowAllSlots] = useState(false);

  const [allStudio, setAllStudio] = useState([]);

  useEffect(() => {
    timeSlotApi
      .getonlyStudio()
      .then((res) => {
        console.log(res.studios);
        setAllStudio(res.studios);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleCheckboxChange = (id) => {
    const updatedAmenities = selectedAmenities.includes(id)
      ? selectedAmenities.filter((amenity) => amenity !== id)
      : [...selectedAmenities, id];

    setSelectedAmenities(updatedAmenities);
    console.log(selectedAmenities);
  };
  const handledaysCheckboxChange = (id) => {
    const updaeddays = selectedDate.includes(id)
      ? selectedDate.filter((day) => day !== id)
      : [...selectedDate, id];

    setSelectedDate(updaeddays);
    console.log(selectedDate);
  };
  const [iframeCode, setIframeCode] = useState("");
  const [hasContent, setHasContent] = useState(false);

  const handleIframeCodeChange = (e) => {
    const inputCode = e.target.value;

    // Update the state with the user-entered iframe code
    setIframeCode(inputCode);

    // Update hasContent state based on whether there is content in the textarea
    setHasContent(inputCode.trim() !== "");
  };
  const navigate = useNavigate();
  const backOnclick = () => {
    navigate("/adminDashboard/Teams/StudioPatners");
  };
  const [selectedStudioid, setselectedStudioid] = useState("");
  const [selectRooms, setselectRooms] = useState([]);
  useEffect(() => {
    console.log("selectedStudioid");
    console.log(selectedStudioid);
  }, [selectedStudioid]);

  const handelStudioid = (e) => {
    let id = e.target.value;
    console.log("id");
    console.log(id);
    setselectedStudioid(id);

    addPartnerData.current.studioId = id;
    let ans = allStudio.filter((allStudio) => allStudio._id == id);
    console.log("ans");
    console.log(ans[0].roomsDetails);
    setselectRooms(ans[0].roomsDetails);
  };
  useEffect(() => {
    console.log("selectRooms");
    console.log(selectRooms);
  }, [selectRooms]);
  const [allTimeSlots, setallTimeSlots] = useState({});

  let hitapi = () => {
    teamsApi
      .addStudioPartner(addPartnerData.current)
      .then((res) => {
        console.log(res);
        sucessAlret("Studio Partner Sucessfully Added");
      })
      .catch((err) => {
        errorAlert("something went wrong");
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("addPartnerData");
    console.log(addPartnerData);
  }, [addPartnerData.current]);

  const sendTimeSlotDataToApi = (event) => {
    event.preventDefault();
    // Get all keys of the object
    let ans = Object.keys(addPartnerData.current);

    // Check if any field is empty
    for (let check of ans) {
      if (addPartnerData.current[check] === "") {
        alert(`Please fill ${check} fields`);
        return;
      }
    }

    // If all fields are filled, call the API
    hitapi();
  };

  return (
    <>
      <div className={style.wrapper}>
        <WebDashboard2
          navCount={navCount}
          tabCount={tabCount}
          setTabCount={setTabCount}
        />
        <form className={style.studioMainScreen}>
          <div className={style.studioHeader}>
            <div>
              <input type="text" placeholder="search" />
            </div>
            <div>
              <IoSearch />
            </div>
            <div>
              <div className={style.notifyIcon}>
                <GoDotFill />
              </div>
              <FaRegBell />
            </div>
            <div>
              <MdOutlineSettings />
            </div>
          </div>
          <div className={style.addNewStudioTitle}>Add Studio Partner</div>

          <div className={style.addNewStudioPage}>
            <div style={{ height: "80%" }}>
              <div>
                <div className={style.addNewStudioinputBox}>
                  <label htmlFor="firstName">User First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter Fullname Name"
                    onChange={(e) => {
                      addPartnerData.current.firstName = e.target.value;
                    }}
                    // value={addPartnerData.current?.firstName}
                  />
                </div>

                <div className={style.addNewStudioinputBox}>
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    id="Email"
                    placeholder="Enter Email id"
                    onChange={(e) => {
                      addPartnerData.current.email = e.target.value;
                    }}

                    // value={addPartnerData.current?.email}
                  />
                </div>

                <div className={style.addNewStudioinputBox}>
                  <label>Studio</label>

                  <select
                    onChange={(event) => {
                      handelStudioid(event);
                    }}
                    value={selectedStudioid}
                  >
                    <option value="" disabled selected>
                      Select Studio
                    </option>
                    {allStudio?.map((studio) => (
                      <option key={studio._id} value={studio._id}>
                        {studio.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <div className={style.addNewStudioinputBox}>
                  <label>Booking Hours</label>

                  <select>
                    <option>Choose Booking Hours</option>
                    <option>1 Hour</option>
                    <option>2 Hour</option>
                    <option>3 Hour</option>
                    <option>4 Hour</option>
                    <option>5 Hour</option>
                  </select>
                </div> */}
              </div>
              {/* secod side  */}
              <div>
                <div className={style.addNewStudioinputBox}>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Enter Last Name"
                    onChange={(e) => {
                      addPartnerData.current.lastName = e.target.value;
                    }}

                    // value={addPartnerData.current?.lastName}
                  />
                </div>

                <div
                  className={style.addNewStudioinputBox}
                  style={{ cursor: "pointer" }}
                >
                  <label htmlFor="password"> Enter Password</label>
                  <input
                    style={{ cursor: "pointer" }}
                    type="text"
                    id="password"
                    placeholder="Enter PassWord"
                    onChange={(e) => {
                      addPartnerData.current.password = e.target.value;
                    }}
                    // disabled
                    // onClick={sendTimeSlotDataToApi}
                  />
                </div>
              </div>
            </div>
          </div>
          <StudioFooter
            backOnclick={backOnclick}
            saveOnclick={(event) => {
              sendTimeSlotDataToApi(event);
            }}
            saveType={"submit"}
          />
        </form>
      </div>
    </>
  );
}

export default AddNewStudioPatner;
