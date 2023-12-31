import React, { useState, useEffect } from "react";
import "../produce/dashboard.css";
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
// import ProjecDetails from "../../components/user-project-detail/ProjecDetails";hii
import tickbtn from "../../assets/img/tickbtn.png";

import { FaCheckCircle } from "react-icons/fa";
import { RiRecordCircleFill } from "react-icons/ri";

const CountdownTimer = ({ projectDeliveryDate }) => {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const deliveryDate = new Date(projectDeliveryDate).getTime();
    const timeRemaining = deliveryDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return {
      days: days < 10 ? `0${days}` : days,
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className="progress_main_div_timer">
      <div>
        <b>{timeRemaining.days}</b>
        <div>Days</div>
      </div>
      |
      <div>
        <b>{timeRemaining.hours}</b>
        <div>Hours</div>
      </div>
      |
      <div>
        <b>{timeRemaining.minutes}</b>
        <div>Minutes</div>
      </div>
      |
      <div>
        <b>{timeRemaining.seconds}</b>
        <div>Seconds</div>
      </div>
    </div>
  );
};

function ChoiraTest() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { userProjectData } = state || {};
  const {
    ProjectDeliveryDate,
    // other destructured properties
  } = userProjectData || {};

  const gotoNewproject = () => {
    navigate("/newproject");
  };
  const [editProfile, setEditProfile] = useState(false);
  const eiditProfileFn = () => {
    setEditProfile(true);
  };

  return (
    <>
      <div className={`overlay ${editProfile ? "overlay-after" : ""}`}></div>
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

          <div>
            <div>
              <img src={tanmay} alt="" />
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
              <label htmlFor="role">Role</label> <br />
              <select name="" id="">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="mobile">Mobile Number</label> <br />
              <input id="mobile" type="text" placeholder="Tanmay" />
            </div>
            <div>
              <label htmlFor="email">Email</label> <br />
              <input name="email" id="role" type="email" placeholder="Tanmay" />
            </div>
          </div>
          <div>
            <button>save</button>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="sidebar">
          <div className="sidebar-main">
            <div className="section1">
              <div>
                <img src={logo} alt="" />
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

            <div className="section2">
              <div className="section2-main" onClick={eiditProfileFn}>
                <div>
                  <img src={tanmay} alt="" />
                </div>
                <div>
                  <h5>Tanmay</h5>
                  <h6>Music Producer</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard">
          <div className="produce-section">
            <div className="produce-section-main2">
              <div>
                <img src={folder} alt="" /> <h1>Choira-test</h1>
              </div>
              <div className="produce-section-tabs">
                <div>
                  <img src={folder} alt="" />
                  <h6>Projects</h6>
                </div>

                <div>
                  <img src={progress} alt="" />
                  <h6>Progress</h6>
                </div>

                <div>
                  <img src={payment} alt="" />
                  <h6>Payment</h6>
                </div>

                <div>
                  <img src={message} alt="" />
                  <h6>Message</h6>
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
            {/* <ProjecDetails userProjectData={userProjectData} /> */}
            <div className="choira-test-project-section-main-2">
              <div className="progress-div">
                <div className="progress_main_div">
                  <div>
                    <div>Progress</div>
                    <div>Time left:</div>
                  </div>
                  <div>
                    <div>Under Production </div>
                    <CountdownTimer projectDeliveryDate={ProjectDeliveryDate} />
                  </div>
                </div>
                <div className="progress_main_div_content">
                  <div>
                    <div>
                      <div>
                        <div>
                          <FaCheckCircle />
                        </div>
                        <div>Created</div>
                      </div>
                      <div>
                        This is the initial stage where you create a new project
                        and add the details such as project name, genre, and
                        other project specifications. You will also have the
                        option to select from our team of music professionals to
                        work with you.
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <div>
                          {/* <RiRecordCircleFill /> */}
                          <FaCheckCircle />
                        </div>
                        <div>Under Production</div>
                      </div>
                      <div>
                        Once you have created the project, our team of music
                        professionals will start working on it. During this
                        phase, they will produce the music, mix and master it,
                        and make necessary edits to create the final version of
                        your music.
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <FaCheckCircle />
                        </div>
                        <div>Ready for Review</div>
                      </div>
                      <div style={{ borderColor: "#E0E0E0" }}>
                        After the production is completed, your project will
                        move to the review phase. Here, you can listen to the
                        final version of your music and provide feedback or
                        suggestions for any changes you want to make. <br />
                        <button>
                          Request Revision <img src={tickbtn} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <div style={{ color: "#E0E0E0" }}>
                          <RiRecordCircleFill />
                        </div>
                        <div style={{ color: "#E0E0E0" }}>Completed</div>
                      </div>
                      <div style={{ color: "#E0E0E0", border: "none" }}>
                        Once you have reviewed and approved the final version of
                        your music, the project will be marked as completed. You
                        can then download the final version and use it for your
                        intended purpose.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoiraTest;
