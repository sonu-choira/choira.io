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
import { useNavigate } from "react-router-dom";

function Dashboard() {
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
            <div className="produce-section-main">
              <div>
                <img src={folder} alt="" />
                <h1>Project</h1>
              </div>
              <div>
                <p>
                  Get a team of the world’s best mixing & mastering engineers,
                  singers, songwriters, producers and studio musicians for your
                  project
                </p>
              </div>
              <div>
                <button onClick={gotoNewproject}>
                  <img src={plusfolder} alt="" />
                  New Project
                </button>
              </div>
            </div>
          </div>
          <div className="project-section">
            <div className="project-main">
              <div>
                <div>
                  <img src={folder} alt="" />
                  <h6>Projects</h6>
                </div>
                <div className="project-main-content"></div>
              </div>
              <div>
                <div>
                  <img src={progress} alt="" />
                  <h6>Progress</h6>
                </div>
                <div className="project-main-content"></div>
              </div>
              <div>
                <div>
                  <img src={payment} alt="" />
                  <h6>Payment</h6>
                </div>
                <div className="project-main-content"></div>
              </div>
              <div>
                <div>
                  <img src={message} alt="" />
                  <h6>Message</h6>
                </div>
                <div className="project-main-content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
