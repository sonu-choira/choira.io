import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Logo from "../../assets/choria.svg";
import FormMain from "../dashboard/produce/projectForm/FormMain";
import FormProfile from "../../pages/myprofile/FormProfile";
import sprite from "../../assets/icons/sprite.svg";
import "../dashboard/produce/project/project.scss";
import "./userHome.scss";

import "../../assets/theme/theme.css";
import AddProject from "../dashboard/produce/addProject";
// import ManageProject from "../dashboard/produce/manageProject";
import axios from "axios";
import Managetwopage from "../dashboard/produce/maangetwopage";
import ComingSoon from "../comingSoon/comingSoon";
import Comminuty from "../community";
import { useNavigate } from "react-router";
import MessageComponent from "../messages/message";
// import ShowExploreData from "../customerExplore/showData";
// nc
// import ExploreSection from "../customerExplore/exploreSection";

// import ShowDetails from "../dashboard/produce/showDetails";
// import TrackShow from "../dashboard/produce/trackShow";
import Manageroutetrack from "../dashboard/decidetrack";
// import musics from from "../../../"
// import music3 from "../../assets/icons/music3.svg";
// import musicicon from "../../assets/musicicon.png";
import musicicon2 from "../../assets/musicicon2.png";
import { httpUrl, docServerUrl } from '../../restservice'


ReactModal.setAppElement("#root");

let isLoaded = true;

export default function UserHome() {
  const [isOpen, setIsOpen] = useState(false);

  const [isProfile, setIsProfile] = useState(false);

  const [selectedPage, setSelectedPage] = useState(1)

  const [tabPage, setTabPage] = useState(2)

  const [pcount, setPcount] = useState()


  const [openDetailsBox, setOpenDetailsBox] = useState(true)
  // const [storeTracksFolderSection, setStoreTracksFolderSection] = useState("")

  // nc 

  const [isLoading, setisLoading] = useState(true)

  const navigate = useNavigate();
  const docServer = docServerUrl;
  // const docServer = docServerUrl
  let userData = JSON.parse(localStorage.getItem('userData'))
  let userPhoto = JSON.parse(localStorage.getItem('photo'));
  let getDoc = userPhoto?.docpath;
  let getDocLink = userPhoto?.urllink;

  let getName = userData?.name
  let passableId = userData?.id
  let pName = sessionStorage.getItem("project")
  let pNameCount = sessionStorage.getItem("proname")

  useEffect(() => {

      axios.get(httpUrl +  'project?customer=' + passableId)
      .then((result) => {
        localStorage.setItem('lengthdata', result.data.length)
        let responseJson = result.data;
        console.log(responseJson);

        if (responseJson.length === 0) {
          isLoaded = true
          setSelectedPage(1)
          console.log("Projects Not Found")
        } else {
          isLoaded = false
          setSelectedPage(2)
          if (pNameCount > 0) {
            setPcount(pNameCount)
          }
          console.log("User Projects responseJson:",responseJson)
          console.log("Projects Found")
        }
        // if (pName) {
        //   setPcount(1)
        // }

      })
      .catch(function (error) {
        // handle error
        console.log(error);
        isLoaded = true
        setSelectedPage(1)
      });
  }, [passableId])

  useEffect(() => {
    if (localStorage.getItem("userData") === null) {
      localStorage.clear();
      navigate("/");
    }

    // nc
    window.addEventListener('popstate', (event) => {
      window.location.href = 'https://choira.io';
    });

    return () =>{
      console.log("user home unmounted ");
    }

  }, [])



  function toggleModal() {
    setIsOpen(!isOpen);    
  }

  function projectDone() {
    isLoaded = false
    setSelectedPage(2)
  }

  function openProfile() {
    setIsProfile(!isProfile);
  }

  function removeIcon() {
    setOpenDetailsBox(true)
    if (pNameCount) {
      sessionStorage.removeItem("proname");
      setPcount()
    } else {
      setTimeout(() => {
        sessionStorage.removeItem("project")
      }, 1000);
    }
  }



  const goback = () => {
    setOpenDetailsBox(true)
  }
  // updateTable = () => {
  //   let userid = JSON.parse(localStorage.getItem("userData")).id;
  //   axios.get(httpUrl +  'project?customer=' + userid)
  //       .then(responce => {
  //         localStorage.setItem('lengthdata',responce.data.length)
  //         console.log(responce.data)
  //       });
  // }

  return (
    // <!-- [WRAPPER] -->
    <div id="wrapper">
      {/* <!-- [MAIN CONTAINER] ------------ --> */}

      <main className="main-container">
        {/* <!-- [SIDEBAR] ------------ --> */}
        <aside className="sidebar">
          <div className="sidebar__wrap">
            <div className="sidebar__logo">
              <a href="/" className="sidebar__logo--img">
                <img src={Logo} alt="Logo main" />
              </a>
              {/* nc */}
              {/* <button className="btn-primary" style={{ padding: "11px 23px" }} onClick={() => { setSelectedPage(3); setTabPage(0) }}>Start Jam</button> */}
              {/* <button className="btn-primary" style={{ padding: "11px 23px" }} onClick={() => { setSelectedPage(10); setTabPage(0) }}>Start Jam</button> */}
              <a href="https://jam.choira.io"><button className="btn-primary" style={{ padding: "11px 23px" }}>Start Jam</button></a>
            </div>

            <div className="sidebar__list">
              <ul>
                {/* nc */}
                <li>
                  <div onClick={() => { setSelectedPage(3); setTabPage(1); setOpenDetailsBox(true); }} className={tabPage === 1 ? "active-link" : ""}>
                    <svg>
                      <use href={sprite + "#icon-user-group"}></use>
                    </svg>
                    Community
                  </div>
                </li>

                <li>
                  <div onClick={() => { setTabPage(2); setOpenDetailsBox(true); if (isLoaded) setSelectedPage(1); else setSelectedPage(2) }} className={tabPage === 2 ? "active-link" : ""}>
                    <svg>
                      <use href={sprite + "#icon-folder"}></use>
                    </svg>
                    Produce
                  </div>
                </li>
                {/* nc */}
                <li>
                  {/* <div onClick={() => { setSelectedPage(10); setTabPage(3); setOpenDetailsBox(true); }} className={tabPage === 3 ? "active-link" : ""}>
                    <svg className="icon-atom">
                      <use href={sprite + "#icon-atom"}></use>

                    </svg>
                    Jamming
                  </div> */}

                  <div onClick={() => {window.location = "https://jam.choira.io"; }} className={tabPage === 3 ? "active-link" : ""}>
                    <svg className="icon-atom">
                      <use href={sprite + "#icon-atom"}></use>

                    </svg>
                    Jamming
                  </div>
                </li>
                {/* nc */}
                {/* <li>
                  <div onClick={() => { setSelectedPage(4); setTabPage(4); setOpenDetailsBox(true); removeIcon(); }} className={tabPage === 4 ? "active-link" : ""}>
                    <svg>
                      <use href={sprite + "#icon-chat"}></use>
                    </svg>
                    Messages
                    {pcount ?
                      <span className="badge">{pcount}</span>
                      : null}
                  </div>
                </li> */}

                {/* <li>
                  <div onClick={() => { setSelectedPage(5); setTabPage(5); setOpenDetailsBox(true); }} className={tabPage === 5 ? "active-link" : ""}>
                    <svg>
                      <use href={sprite + "#icon-music"}></use>
                    </svg>
                    Explore
                  </div>
                </li> */}
                {/* <li>
                  <div onClick={() => { setSelectedPage(7); setTabPage(6) }} className={tabPage === 6 ? "active-link" : ""}>
                    <img src={musicicon2} alt="image" width="25px" height="25px" />
                    // <svg>
                    // <use href={sprite + "#icon-folder"}></use>
                    // </svg> 
                    Tracks
                  </div>
                </li> */}
                <li className="belowProfile">
                  <div onClick={() => { openProfile() }} className={tabPage === 7 ? "active-link" : ""}>
                    <svg>
                      <use href={sprite + "#icon-checkmark"}></use>
                    </svg>
                    Profile
                  </div>
                </li>

              </ul>

              <div className="sidebar__user" onClick={openProfile}>
                <div className="sidebar__user--img">
                  {getDoc !== null ?
                    (
                      <img src={docServer + getDoc} alt="User" />
                    ) : (
                      <img src={getDocLink} alt="User" />
                    )
                  }
                </div>
                <div className="sidebar__user--text">
                  <h3>{getName}</h3>
                  <p>My Profile</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* <!-- [CONTENT BOX] --> */}
        <div >
          <div className={"content" + (selectedPage !== 1 && selectedPage !== 2 && selectedPage !== 3 && selectedPage !== 7 && selectedPage !== 10 ? " hide" : "")}>
            {selectedPage === 1 ?
              (<AddProject closeModelFunction={toggleModal} setOpenDetailsBox={setOpenDetailsBox} />)
              :
              selectedPage === 2 ?
                (<Managetwopage />)
                :
                selectedPage === 3 ?
                  (<Comminuty />)
                  :
                  selectedPage === 7 ?
                    (<Manageroutetrack />)

                    :
                    selectedPage === 10 ?
                    (<ComingSoon />):null
            }

          </div>
          <div className={"content limitHeight80" + (selectedPage !== 4 ? " hide" : "")}>
            {/* <MessageComponent /> */}
            {selectedPage === 4 ?
              (<MessageComponent />)
              : null
            }
          </div>
          {/* <div className={"contentSelf" + (selectedPage !== 5 ? " hide" : "")}>
            <ExploreSection />
          </div> */}
          {/* <div className={"contentSelf" + (selectedPage !== 7 ? " hide" : "")}>
             <Manageroutetrack/>  
             </div> */}
        </div>

      </main>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <FormMain toggleModals={toggleModal} changePage={projectDone} />
        {/* <button onClick={toggleModal}>Close modal</button> */}
      </ReactModal>

      <ReactModal
        isOpen={isProfile}
        onRequestClose={openProfile}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <FormProfile />
      </ReactModal>

    </div>
  );
}
