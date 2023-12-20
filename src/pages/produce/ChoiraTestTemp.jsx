import React from "react";
import "../produce/dashboard.css";
import logo from "../../assets/img/logo-choira.svg";
import create from "../../assets/img/dashboard_img/create.svg";
import produce from "../../assets/img/dashboard_img/produce_selected.svg";
import community from "../../assets/img/dashboard_img/community.svg";
import tanmay from "../../assets/img/dashboard_img/tanmay.png";
import folder from "../../assets/img/dashboard_img/folder.svg";
import plusfolder from "../../assets/img/dashboard_img/plusfolder.svg";
import progress from "../../assets/img/dashboard_img/progress.svg";
import payment from "../../assets/img/dashboard_img/payment.svg";
import message from "../../assets/img/dashboard_img/message.svg";
import files from "../../assets/img/folder.svg";
import ReactPlayer from "react-player";

import { IoIosArrowBack } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";

function ChoiraTest() {
  const navigate = useNavigate();
  const gotoNewproject = () => {
    navigate("/newproject");
  };

  return (
    <>
      <div className="wrapper">
        <div className="sidebar">
          <div className="sidebar-main">
            <div className="section1">
              <div>
                <img src={logo} alt="" />
              </div>
              <div className="create-btn">
                <button>
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
              <div className="section2-main">
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
            <div className="choira-test-project-section-main">
              <div>
                <div>
                  <span>Project Name:</span>
                  <h4>Choira test</h4>
                </div>
                <div className="choira-test-details">
                  <span>Details:</span>
                  {/* dont remove the h4  tag before removing or changeing the h4 tag please go through the css part */}
                  <h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla dolor auctor eget amet. Lectus diam orci eget a
                    aliquet urna nunc.
                  </h4>
                  <div>
                    <div>BollyWood</div>
                    <div>orignal song</div>
                  </div>
                </div>
                <div>
                  <span>Need help with:</span>
                  <h4>Music Producer</h4>
                </div>
                <div>
                  <span>Price type:</span>
                  <h4>Very Experience and Good Value</h4>
                </div>
                <div>
                  <span>Manager:</span>
                  <h4>Jackson</h4>
                </div>
                <div className="choira-test-demoFile">
                  <span>Demo File:</span>
                  <div className="choira-test-demoFile-main">
                    <div>
                      <img src={files} alt="" />
                      <h4>Jackson</h4>
                    </div>
                    <div>
                      <img src={files} alt="" />
                      <h4>Jackson</h4>
                    </div>
                    <div>
                      <img src={files} alt="" />
                      <h4>Jackson</h4>
                    </div>
                  </div>
                </div>
                <div>
                  <span>Reference Links:</span>
                  <h4>https://www.youtube.com/watch?v=a7GlTgqwDVg</h4>
                </div>
                <div
                  className="choira-test-player"
                  style={{ width: "350px", height: "550px" }}
                >
                  <ReactPlayer
                    controls
                    url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                    width="100%"
                    height="100%"
                  />
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
