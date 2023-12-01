import React from "react";
import Logo from "../../../assets/choria.svg";
import communityImg from "../../../assets/community.svg";
import produceImg from "../../../assets/folder.svg";
import jamingImg from "../../../assets/jamming.svg";
import messageImg from "../../../assets/messages.svg";
import exploreImg from "../../../assets/explore.svg";
import "./Produce.scss";

export default function Produce() {
  return (
    <div className="dashboard">
      <div className="dashboard-nav">
        <header>
          <a href="#!" className="menu-toggle">
            <i className="fas fa-bars"></i>
          </a>
          <a href="produce" className="brand-logo">
            <img src={Logo} alt="" />
          </a>
        </header>
        <nav className="dashboard-nav-list">
          <a href="produce" className="dashboard-nav-btn">
            Start Jam{" "}
          </a>
          {/* nc */}
          {/* <a href="produce" className="dashboard-nav-item">
            <i className="fas fa-home">
              <img src={communityImg} alt="" />
            </i>
            Community{" "}
          </a> */}
          <a href="produce" className="dashboard-nav-item active">
            <i className="fas fa-tachometer-alt">
              <img src={produceImg} alt="" />
            </i>{" "}
            Produce
          </a>
          <a href="produce" className="dashboard-nav-item">
            <i className="fas fa-file-upload">
              <img src={jamingImg} alt="" />
            </i>{" "}
            Jamming{" "}
          </a>
          <a href="produce" className="dashboard-nav-item">
            <i className="fas fa-cogs">
              <img src={messageImg} alt="" />
            </i>{" "}
            Messages{" "}
          </a>
          <a href="produce" className="dashboard-nav-item">
            <i className="fas fa-user">
              <img src={exploreImg} alt="" />
            </i>{" "}
            Explore{" "}
          </a>
        </nav>
      </div>
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container">
            <div className="card">
              <div className="card-header">
                <h1>Welcome back Kamran</h1>
              </div>
              <div className="card-body">
                <p>Some text here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
