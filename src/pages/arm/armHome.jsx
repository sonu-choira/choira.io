import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Logo from "../../assets/choria.svg";
import FormMain from "../dashboard/produce/projectForm/FormMain";
import sprite from "../../assets/icons/sprite.svg";
import "../dashboard/produce/project/project.scss";
import "./armHome.scss"
import { docServerUrl } from '../../restservice'
import "../../assets/theme/theme.css";

import ShowArmUsers from "./user/showUsers";
import Setprojectpage from "./projects/Setprojectpage";
import FormProjectRM from "../myprofile/FormProfileRM";
import { useNavigate } from "react-router";
import MessageManager from "../messages/messageManager";
import Managetracks from "./Tracksstatus";
import ManagepageTrack from "./managetrack";

ReactModal.setAppElement("#root");


export default function ArmHome() {
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
                    All Projects
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
                  <div onClick={() => { setTabPage(4); }} className={tabPage === 4 ? "active-link" : ""}>
                    <svg>
                      <use href={sprite + "#icon-folder"}></use>
                    </svg>
                    Tracks
                  </div>
                </li>

                <li>
                  <div onClick={() => { setTabPage(3); }} className={tabPage === 3 ? "active-link" : ""}>
                    <svg>
                      <use href={sprite + "#icon-chat"}></use>
                    </svg>
                    Chats
                  </div>
                </li>
              </ul>

              <div className="sidebar__user" onClick={openProfile}>
                <div className="sidebar__user--img">
                  {getDoc !== null ?
                    (
                      <img src={docServer + getDoc} alt="User" />
                    ) : (
                      <img src={getDocLink} alt="ARM" />
                    )
                  }
                </div>
                <div className="sidebar__user--text">
                  <h3>{getName}</h3>
                  <p>ARM Profile</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* <!-- [CONTENT BOX] --> */}

        <div className={"con page-margin" + (tabPage === 3 ? " hide" : "")} >
          {tabPage === 1 ?
            (<Setprojectpage />)
            :
            tabPage === 2 ?
              (<ShowArmUsers />)
              :
              tabPage === 4 ?
                (<ManagepageTrack />)
                : null
          }
        </div>
        <div className={"con page-margin" + (tabPage !== 3 ? " hide" : "")}  >
          <MessageManager />
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
        <FormProjectRM />
      </ReactModal>

    </div>
  );
}
