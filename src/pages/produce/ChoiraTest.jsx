import React, { useState, useEffect } from "react";
import "../produce/dashboard.css";
import { FaBars } from "react-icons/fa6";

import logo from "../../assets/img/logo-choira.svg";
import create from "../../assets/img/dashboard_img/create.svg";
import produce from "../../assets/img/dashboard_img/produce_selected.svg";
import community from "../../assets/img/dashboard_img/community.svg";
import tanmay from "../../assets/img/dashboard_img/tanmay.png";
import folder from "../../assets/img/dashboard_img/folder.svg";
import progress from "../../assets/img/dashboard_img/progress.svg";
import payment from "../../assets/img/dashboard_img/payment.svg";
import message from "../../assets/img/dashboard_img/message.svg";
import { IoIosArrowBack } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ProjecDetails from "../../components/user-project-detail/ProjecDetails";
import { createProduceItem } from "../../services/produceSection";
// import ProjecDetails from "../../components/user-project-detail/ProjecDetails";hh11

import { FaPen } from "react-icons/fa6";
import Progress from "../../components/user-project-detail/Progress";
import Payment from "../../components/user-project-detail/Payment";
import Message from "../../components/user-project-detail/Message";
import { RxCross2 } from "react-icons/rx";
import { FaFolder } from "react-icons/fa";
import { TbProgressCheck } from "react-icons/tb";
import { MdPayments } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";

function ChoiraTest() {
  const [userProjectData, setUserProjectData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    console.log(userProjectData);
  }, [userProjectData]);

  useEffect(() => {
    const createProjectData = async () => {
      try {
        // Make a POST request on page load to create userProjectData
        const createdProjectData = await createProduceItem(userProjectData);
        // Handle the created project data as needed
        console.log("Project data created on page load:", createdProjectData);
      } catch (error) {
        // Handle error, e.g., show an error message to the user
        console.error("Error creating project data:", error);
      }
    };

    // Ensure that userProjectData is available and not an empty object
    if (
      state &&
      state.userProjectData &&
      Object.keys(state.userProjectData).length > 0
    ) {
      setUserProjectData(state.userProjectData);
      console.log(state.userProjectData);
      createProjectData();
    } else {
      // Handle the case when userProjectData is not available or is an empty object
      console.error("Invalid or missing userProjectData");
    }
  }, [state.userProjectData]);

  const gotoNewproject = () => {
    navigate("/newproject");
  };
  // change profile img
  const [editProfile, setEditProfile] = useState(false);
  const eiditProfileFn = () => {
    setEditProfile(true);
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleLabelClick = (event) => {
    event.preventDefault();
    // Trigger the hidden file input
    const fileInput = document.getElementById("upload-input");
    fileInput.click();
  };

  // user data
  const [projectUserData, setProjectUserData] = useState({
    name: " tanmay",
    role: "dj",
    dateOfBirth: "",
    gender: "Male",
    Mob: "1231231230",
    emal: "sample@gmail.com",
  });
  const [tab, setTab] = useState(1);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <>
      <div
        className={`test-overlay ${editProfile ? "test-overlay-after" : ""}`}
      ></div>
      <div
        className={`choira_edit_profile ${
          editProfile ? "choira_edit_profile-after" : ""
        }`}
      >
        <div>
          <div>
            <div>Profile Details</div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEditProfile(false);
              }}
            >
              x
            </div>
          </div>

          {/* <div className="chnageimg">
            <div>
              <img src={tanmay} alt="" />
            </div>
            <div className="upload_image ">
              <FaPen />
            </div>
          </div> */}

          <div className="edit-profile-container">
            <div className="change-img">
              <div>
                {selectedImage ? (
                  <img src={selectedImage} alt="Uploaded" />
                ) : (
                  <img src={tanmay} alt="Default" />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="upload-input"
                className="upload-image"
                onClick={handleLabelClick}
              >
                <FaPen />
              </label>
              <input
                type="file"
                id="upload-input"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="name">Name</label> <br />
              <input id="name" type="text" placeholder="Tanmay" />
            </div>
            <div>
              <label htmlFor="role">Role</label> <br />
              <input name="role" id="role" type="text" placeholder="Tanmay" />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="bd">Date Of Birth</label> <br />
              <input id="bd" type="date" placeholder="Tanmay" />
            </div>
            <div>
              <label htmlFor="Gender">Gender</label> <br />
              <select name="" id="Gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div>
            <div className="choira_test_number">
              <label htmlFor="mobile">Mobile Number</label> <br />
              <input id="mobile" type="text" placeholder="Tanmay" />
              <div>+91 |</div>
            </div>
            <div>
              <label htmlFor="email">Email</label> <br />
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Tanmay"
              />
            </div>
          </div>
          <div>
            <button>save</button>
          </div>
        </div>
      </div>

      {/* mobile sidebar----------  */}

      {/* main section  */}
      <div className="wrapper">
        <div className={`sidebar  ${sidebarVisible ? "sidebar_after" : ""}`}>
          <div className="sidebar-main">
            <div className="section1">
              <div>
                <img src={logo} alt="" />
                <RxCross2
                  className="mobview"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSidebarVisible(false);
                  }}
                />
              </div>
              <div className="create-btn">
                <button onClick={gotoNewproject}>
                  <img src={create} alt="" />
                  Create
                </button>
              </div>
              <div className="community">
                <div>
                  <img src={community} alt="" />
                  Community
                </div>
                <div>
                  <img src={produce} alt="" />
                  Produce
                </div>
              </div>
            </div>

            <div className="section2" style={{ cursor: "pointer" }}>
              <div className="section2-main" onClick={eiditProfileFn}>
                <div>
                  {selectedImage ? (
                    <img src={selectedImage} alt="Uploaded" />
                  ) : (
                    <img src={tanmay} alt="Default" />
                  )}
                </div>
                <div>
                  <h5>Tanmay</h5>
                  <h6>Music Producer</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`dashboard ${sidebarVisible ? "dashboard_after" : ""}`}
          onClick={() => {
            if (sidebarVisible) {
              setSidebarVisible(false);
            }
          }}
        >
          <div className="produce-section">
            <div className="produce-section-main2">
              <div>
                <div>
                  <img src={folder} alt="" /> <h1>Choira-test</h1>
                </div>
                <div className="mobview">
                  <FaBars
                    onClick={() => {
                      setSidebarVisible((prevState) => !prevState); // Toggle the state
                    }}
                  />
                </div>
              </div>
              <div className="produce-section-tabs">
                <div>
                  <div
                    onClick={() => setTab(1)}
                    style={{
                      cursor: "pointer",
                      borderBottom: tab === 1 ? "5px solid #ffc701" : "",
                      color:
                        tab === 1 && window.innerWidth <= 768 ? "#ffc701" : "",
                    }}
                  >
                    <FaFolder />
                    <h6>Projects</h6>
                  </div>
                </div>

                <div>
                  <div
                    onClick={() => setTab(2)}
                    style={{
                      cursor: "pointer",
                      borderBottom: tab === 2 ? "5px solid #ffc701" : "",
                      color:
                        tab === 2 && window.innerWidth <= 768 ? "#ffc701" : "",
                    }}
                  >
                    <TbProgressCheck />
                    <h6>Progress</h6>
                  </div>
                </div>

                <div>
                  <div
                    onClick={() => setTab(3)}
                    style={{
                      cursor: "pointer",
                      borderBottom: tab === 3 ? "5px solid #ffc701" : "",
                      color:
                        tab === 3 && window.innerWidth <= 768 ? "#ffc701" : "",
                    }}
                  >
                    <MdPayments />
                    <h6>Payment</h6>
                  </div>
                </div>

                <div>
                  <div
                    onClick={() => setTab(4)}
                    style={{
                      cursor: "pointer",
                      borderBottom: tab === 4 ? "5px solid #ffc701" : "",
                      color:
                        tab === 4 && window.innerWidth <= 768 ? "#ffc701" : "",
                    }}
                  >
                    <LuMessagesSquare />
                    <h6>Message</h6>
                  </div>
                </div>
              </div>
              <div className="choira-test-btn">
                <div>
                  <button>
                    <IoIosArrowBack />
                    Back
                  </button>
                </div>
                <div>
                  <div>
                    <button>
                      Edit <FiEdit />
                    </button>
                  </div>
                  <div>
                    <button>
                      Delete
                      <RiDeleteBin5Fill />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="choira-test-project-section">
            {tab === 1 ? (
              <ProjecDetails userProjectData={userProjectData} />
            ) : tab === 2 ? (
              <Progress />
            ) : tab === 3 ? (
              <Payment />
            ) : (
              <Message />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoiraTest;
