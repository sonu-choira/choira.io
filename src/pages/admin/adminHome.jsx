import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Logo from "../../assets/choria.svg";
import FormMain from "../dashboard/produce/projectForm/FormMain";
import sprite from "../../assets/icons/sprite.svg";
import "../dashboard/produce/project/project.scss";
import "./adminHome.scss"
import { docServerUrl } from '../../restservice'
import "../../assets/theme/theme.css";

import ComingSoon from "../comingSoon/comingSoon";
import ShowUsers from "./user/showUsers";
import Setprojectpage from "./projects/Setprojectpage";
import ShowEmployeePage from "./employee/Setpage";
import FormProjectAdmin from "../myprofile/FormProfileAdmin";
import { useNavigate } from "react-router";
import ShowDashboardPage from "./dashboard/setDashboard";
import Setpagegenre from "./genre/setpagegenre";
import ShowTracksPage from "./tracks/setpagetracks";
import musicicon2 from "../../assets/musicicon2.png";

ReactModal.setAppElement("#root");


export default function AdminHome() {
  const [isOpen, setIsOpen] = useState(false);

  const [isProfile, setIsProfile] = useState(false);

  const [tabPage, setTabPage] = useState(1)
  const [getName, setGetName] = useState("")

  const navigate = useNavigate();
  const docServer = docServerUrl
  let userPhoto = JSON.parse(localStorage.getItem('photo'));
  let getDoc = userPhoto?.docpath;
  let getDocLink = userPhoto?.urllink;
  let userData;
  useEffect(() => {
    if (localStorage.getItem("userData") === null) {
      localStorage.clear();
      navigate("/");
    }
    else {
      userData = JSON.parse(localStorage.getItem('userData'));
      setGetName(userData.name)
    }
  }, [])

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function openProfile() {
    setIsProfile(!isProfile);
  }

  return (
    // <!-- [WRAPPER] -->
    <div id="wrapper">
      {/* <!-- [MAIN CONTAINER] ------------ --> */}

      <main className="main-container">
        {/* <!-- [SIDEBAR] ------------ --> */}
        <aside className="sidebar">
          <div className="sidebar__wrap">
            <div className="sidebar__logo">
              <a href="/userHome" className="sidebar__logo--img">
                <img src={Logo} alt="Logo main" />
              </a>

              {/* <button className="btn-primary">Start Jam</button> */}
            </div>

            <div className="sidebar__list">
              <ul>
                <li>
                  <div onClick={() => { setTabPage(1) }} className={tabPage === 1 ? "active-link" : ""}>
                    <svg>
                      <use href={sprite + "#icon-user-group"}></use>
                    </svg>
                    DashBoard
                  </div>
                </li>

                <li>
                  <div onClick={() => { setTabPage(2); }} className={tabPage === 2 ? "active-link" : ""}>
                    <svg>
                      <use href={sprite + "#icon-folder"}></use>
                    </svg>
                    User
                  </div>
                </li>

                <li>
                  <div onClick={() => { setTabPage(3) }} className={tabPage === 3 ? "active-link" : ""}>
                    <svg className="icon-atom">
                      <use href={sprite + "#icon-atom"}></use>

                    </svg>
                    All Projects
                  </div>
                </li>

                <li>
                  <div onClick={() => { setTabPage(4) }} className={tabPage === 4 ? "active-link" : ""}>
                    <svg>
                      <use href={sprite + "#icon-chat"}></use>
                    </svg>
                    ARM
                  </div>
                </li>
                <li>
                  <div onClick={() => { setTabPage(5) }} className={tabPage === 5 ? "active-link" : ""}>
                    <svg>
                      <use href={sprite + "#icon-folder"}></use>
                    </svg>
                    Genre
                  </div>
                </li>
                <li>
                  <div onClick={() => { setTabPage(6) }} className={tabPage === 6 ? "active-link" : ""}>
                  <img src={musicicon2} alt="image" width="25px" height="25px"/>
                    {/* <svg>
                      <use href={sprite + "#icon-folder"}></use>
                    </svg> */}
                    Tracks
                  </div>
                </li>

                <li>
                  <p className="sidebar_user_prfile" onClick={openProfile}>
                      My Profile
                  </p>
                </li>

              </ul>

              <div className="sidebar__user" onClick={openProfile}>
                <div className="sidebar__user--img">
                  {getDoc !== null ?
                    (
                      <img src={docServer + getDoc} alt="User" />
                    ) : (
                      <img src={getDocLink} alt="Admin" />
                    )
                  }
                </div>
                <div className="sidebar__user--text">
                  <h3>{getName}</h3>
                  <p>Admin Profile</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* <!-- [CONTENT BOX] --> */}
        <div className="con">
        <div  className="page-margin">
          {tabPage === 1 ?
            (<ShowDashboardPage />)
            :
            tabPage === 2 ?
              (<ShowUsers />)
              :
              tabPage === 3 ?
                (<Setprojectpage />)
                :
                tabPage === 4 ?
                  (<ShowEmployeePage />)
                  :
                  tabPage === 5 ?
                    (<Setpagegenre />)
                    :
                    tabPage === 6 ?
                      (<ShowTracksPage />)
                      : null
          }

        </div>
        </div>
       
      </main>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <FormMain />
        {/* <button onClick={toggleModal}>Close modal</button> */}
      </ReactModal>

      <ReactModal
        isOpen={isProfile}
        onRequestClose={openProfile}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <FormProjectAdmin />
      </ReactModal>

    </div>
  );
}
