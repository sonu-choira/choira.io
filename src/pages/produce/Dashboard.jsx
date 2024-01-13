import React, { useState, useEffect } from "react";
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
import MobileDashboard from "./MobileDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const gotoNewproject = () => {
    navigate("/newproject");
  };

  const statusColorMap = {
    new: "#27AE60",
    "in progress": "#2D9CDB",
    complete: "green",
    cancelled: "#EB5757",
    created: "#2D9CDB",
    "under production": " #F2994A",
    "ready for review": "#9B51E0",
    paid: "#27AE60",
    pending: "#EB5757",
    pay: "#FFC701",
    "pay now": "#FFC701",
  };

  const ProjectCard = ({
    status,
    name,
    type,
    musicianType,
    createdDate,
    backgroundColor,
  }) => (
    <div className="dasboard_project_tab_card">
      <div
        className="project_status"
        style={{
          backgroundColor: statusColorMap[status.toLowerCase()] || "yellow",
        }}
      >
        {status}
      </div>
      <div className="project_name">{name}</div>
      <div className="project_type">{type}</div>
      <div>
        <div className="musician_type">{musicianType}</div>
        <div className="project_created_date">{createdDate}</div>
      </div>
    </div>
  );

  const [projects, setProjects] = useState([
    {
      status: "New",
      name: "Choira_Test",
      type: "Cover Song",
      musicianType: "Music Production",
      createdDate: "09/27/2023",
    },
    {
      status: "in Progress",
      name: "Hope_Test",
      type: "Original Song",
      musicianType: "Full Production Team",
      createdDate: "01/04/2023",
    },
    // Add more projects as needed
  ]);

  useEffect(() => {
    setProjects((p) => {
      return p.map((pi) => {
        pi.status = pi.status.toLowerCase();
        return pi;
      });
    });
    return () => {};
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  const ProgressCard = ({ status, name, totalTime, createdDate }) => (
    <div className="dasboard_progress_tab_card">
      <div
        className="project_status"
        style={{
          backgroundColor: statusColorMap[status.toLowerCase()] || "yellow",
        }}
      >
        {status}
      </div>
      <div className="project_name">{name}</div>
      <div>
        <div className="musician_type">{totalTime}</div>
        <div className="project_created_date">{createdDate}</div>
      </div>
    </div>
  );

  const [progress, setprogress] = useState([
    {
      status: "New",
      name: "Choira_Test",
      totalTime: "02 Days to go",
      createdDate: "09/27/2023",
    },
    {
      status: "In progress",
      name: "Hope_Test",
      totalTime: "02 Days to go",
      createdDate: "01/04/2023",
    },
    // Add more projects as needed
  ]);

  const PaymentCard = ({
    status,
    name,
    total,
    paid,
    pending,
    paymentStatus,
    createdDate,
  }) => (
    <div className="dasboard_payment_tab_card">
      <div
        className="project_status"
        style={{
          backgroundColor: statusColorMap[status.toLowerCase()] || "yellow",
        }}
      >
        {status}
      </div>
      <div className="project_name">{name}</div>
      <div className="project_name">
        . &nbsp;{total} - <b>Total Amount</b>
      </div>
      <div className="project_type">
        .&nbsp;{paid} - <b>Paid</b>
      </div>
      <div className="project_type">
        .&nbsp;{pending} - <b>pending</b>
      </div>
      <div
        className="project_type"
        style={{ display: status.toLowerCase() === "paid" ? "none" : "" }}
      >
        PayNow
      </div>
      <div>
        <div className="musician_type">{paymentStatus}</div>
        <div className="project_created_date">{createdDate}</div>
      </div>
    </div>
  );

  const [payments, setPayments] = useState([
    {
      status: "PENDING",
      name: "Choira_Test",
      total: "25000",
      paid: "1000",
      pending: "5000",
      paymentStatus: "Next payment",
      createdDate: "09/27/2023",
    },
    {
      status: "paid",
      name: "Hope_Test",
      total: "25000",
      paid: "1000",
      pending: "5000",
      paymentStatus: "Payment Completed",
      createdDate: "01/04/2023",
    },
    // Add more projects as needed
  ]);

  const Messagecard = ({ name, message }) => (
    <div className="dasboard_message_tab_card">
      <div className="project_name">{name}</div>
      <div className="musician_type">You : {message}</div>
      <div className="project_created_date">Replay</div>
    </div>
  );

  const [messages, setMessages] = useState([
    {
      status: "New",
      name: "Choira_Test",
      message: "Hey Jackson, Thanks for t...",
    },
    {
      status: "In progress",
      name: "Hope_Test",
      message: "Let’s make a hit togethe...",
    },
    // Add more projects as needed
  ]);

  return window.innerWidth <= 768 ? (
    <>
      <div className="mobDashboard">
        <MobileDashboard />
      </div>
    </>
  ) : (
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
                <div className="project-main-content">
                  <div className="dasboard_project_tab">
                    {projects.map((project, index) => (
                      <ProjectCard key={index} {...project} />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <img src={progress} alt="" />
                  <h6>Progress</h6>
                </div>
                <div className="project-main-content">
                  <div className="dasboard_project_tab">
                    {progress.map((progressItem, index) => (
                      <ProgressCard key={index} {...progressItem} />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <img src={payment} alt="" />
                  <h6>Payment</h6>
                </div>
                <div className="project-main-content">
                  <div className="dasboard_project_tab">
                    {payments.map((paymentItem, index) => (
                      <PaymentCard key={index} {...paymentItem} />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <img src={message} alt="" />
                  <h6>Message</h6>
                </div>
                <div className="project-main-content">
                  <div className="dasboard_project_tab">
                    {messages.map((messageItem, index) => (
                      <Messagecard key={index} {...messageItem} />
                    ))}
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

export default Dashboard;
