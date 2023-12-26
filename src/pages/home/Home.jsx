import React, { useLayoutEffect, useState } from "react";
import Logo from "../../assets/choria.svg";
import ChoriaWhiteO from "../../assets/choira-white-O.svg";
import ChoriaO from "../../assets/choira-O.png";
import PlayBtnIcon from "../../assets/play-btn-icon.svg";
import Vector8 from "../../assets/vector-8.svg";
import BottomCurve from "../../assets/bottom-curve-2.png";
import BadgeTalented from "../../assets/badge-talented.svg";
import BadgeTrusted from "../../assets/badge-trusted.svg";
import BadgeCreator from "../../assets/badge-creator.svg";
import PaperPlane from "../../assets/paper-plane.svg";
import TwitterIcon from "../../assets/twitter.svg";
import YoutubeIcon from "../../assets/youtube.svg";
import InstagramIcon from "../../assets/instagram.svg";
// import DribbbleIcon from "../../assets/dribbble.svg";
import FooterRightImg from "../../assets/footer-right-img-2.svg";
// import facebook from "../../assets/facebook.svg";
import VideoPlayer from "../../components/video-player/VideoPlayer";
import TeamCarousel from "../../components/team-carousel/TeamCarousel";
import "./home.scss";
// import homecss from './home.module.scss'
import TestimonialCarousel from "../../components/testimonial-carousel/TestimonialCarousel";
import image33 from "../../assets/explore/image33.png";
import image34 from "../../assets/explore/image34.png";
import image35 from "../../assets/explore/image35.png";

import googleLogo from "../../assets/logoImg/google.png";
import facebookLogo from "../../assets/logoImg/facebook.png";
import spottyLogo from "../../assets/logoImg/spotify.png";
import mailLogo from "../../assets/logoImg/mainWhite.png";
import RegisterBox from "../../pocPages/register";
import { useNavigate } from "react-router";
import firebaseApp from "../../helper/firebaseInit";
import socialMediaAuth from "../../services/firebaseService";
import { googleProvider, facebookProvider } from "../../helper/firebaseMethod";
import axios from "axios";
import GoogleExtraBox from "../../pocPages/extraGoogle";
import Swal from "sweetalert2";
import LoginBox from "../../pocPages/login";
import ComingSoon from "../comingSoon/comingSoon";
// import SpotifyWebApi from "spotify-web-api-js"
import { loginUrl, getTokenByUrl } from "../../spotify";
import linkedin from "../../assets/linkedin.png";
import ExploreSection from "../customerExplore/exploreSection";
import ExternalExploreSection from "../externalExplore/exploreSection";

import { httpUrl, nodeUrl } from "../../restservice";
import { autofill } from "redux-form";

import { gtag_report_conversion } from "./jsfunctions";

// const spotify = new SpotifyWebApi();
let loginCheckVerify = true;

let isLogin = false;

let saveIntervalSpotify;
let storedata;

const dataForRegistration = {
  name: "",
  phone: "",
  email: "",
  login: {
    type: "CUSTOMER",
    email: "",
    password: "",
    signuptype: "EMAIL",
  },
  city: "",
  photo: {
    docname: "SSO",
    docdesc: "Customer profile photo",
    doctype: "PROFILE",
    urllink: "",
  },
};

const showError = (msg) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: msg,
    showConfirmButton: false,
    timer: 5500,
  });
};

const initFirebase = firebaseApp;

// console.log(btoa(JSON.stringify(initFirebase)))

const innertitle = {
  lineHeight: "85px",
  fontWeight: "600",
  borderBottom: "3.5px solid #ffc701",
  fontSize: "25px",
};

// const mainclass ={
//     display: 'flex',
//     flexDirection:'row',
//     gap: '200px',

// }

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isComingOpen, setIsComingOpen] = useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isScreenOpen, setIsScreenOpen] = useState(0);
  const [isWordData, setIsWordData] = useState("");
  const [isvisiblecontact, setcontactus] = useState(false);
  const [values, setInputField] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const [size, setSize] = useState([0, 0]);

  const inputsHandler = (name) => (e) => {
    setInputField({ ...values, [name]: e.target.value });
  };

  useLayoutEffect(() => {
    console.log("tttttttttttttttttttttt");
    console.log("tttttttttttttttttttttt");
    function updateSize() {
      if (window.innerWidth < 1124) {
        setIsMenuOpen(false);
      } else {
        setIsMenuOpen(true);
      }
      setSize([window.innerWidth, window.innerHeight]);
      // console.log(size)
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const checkLogin = () => {
    if (loginCheckVerify) {
      let loginState = localStorage.getItem("isLogin");
      if (loginState === "true") {
        isLogin = true;
      } else {
        isLogin = false;
      }
      loginCheckVerify = false;
    }
    dataForRegistration.phone = new Date().getTime();
  };

  checkLogin();

  // const logoutUser = () => {
  //   localStorage.removeItem('isLogin')
  //   localStorage.removeItem('userData')
  //   loginCheckVerify = true
  //   checkLogin()
  //   setIsMenuOpen(false)
  //   console.log("user Logout = " + isLogin)
  // }

  const closeModel = () => {
    setIsLoginOpen(false);
    loginCheckVerify = true;
    checkLogin();
  };

  const gotoDashboard = () => {
    let getLocal = JSON.parse(localStorage.getItem("userData")).login.type;
    if (getLocal === "CUSTOMER") {
      navigate("/userHome");
    } else if (getLocal === "ARTIST_MANAGER") {
      navigate("/armHome");
    } else {
      navigate("/adminHome");
    }
  };
  const gotoSignin = () => {
    navigate("/signin");
  };
  const gotoProject = () => {
    navigate("/project");
  };
  const sendmail = (e) => {
    e.preventDefault();

    const { firstname, lastname, email, phone } = values;
    let sendformat = {
      email: email,
      admin: "vivarta@choira.io",
      fName: firstname,
      lName: lastname,
      phone: phone,
    };

    console.log(values);

    if (values.phone.length !== 10) {
      Swal.fire({
        icon: "warning",
        title: "Please Enter Your 10 Digit Number",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      axios.post(nodeUrl + "contactUs", sendformat).then((responce) => {
        console.log(responce.data);
      });
      Swal.fire({
        icon: "success",
        title: "Your mail has been sent successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setcontactus(false);
      values.firstname = "";
      values.lastname = "";
      values.phone = "";
      values.email = "";
    }
  };

  const loginUser = (getEmail) => {
    let sendableData = {
      email: getEmail,
      password: "",
    };
    axios
      .post(httpUrl + "login", sendableData)
      .then((result) => {
        let responseJson = result.data;
        localStorage.setItem("userData", JSON.stringify(result.data));
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("photo", JSON.stringify(result.data.photo));
        navigate("/userHome");
        console.log(responseJson);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Duplicate Account",
          text: "Your account is already created with Username and password.",
          showConfirmButton: false,
          timer: 5500,
        });
      });
  };

  const handleFirebaseClick = async (provider, ssType) => {
    const res = await socialMediaAuth(provider);
    console.log(res);

    if (res.accessToken) {
      let userEmail = res.email;
      axios.get(httpUrl + "login?email=" + userEmail).then((result) => {
        let responseJson = result.data;
        if (responseJson.error === "USERNAME_ALREADY_EXIST") {
          loginUser(userEmail);
        } else {
          dataForRegistration.name = res.displayName;
          dataForRegistration.email = res.email;
          dataForRegistration.login.email = res.email;
          dataForRegistration.login.signuptype = "SSO";
          dataForRegistration.login.ssotype = ssType;
          dataForRegistration.photo.urllink = res.photoURL;
          // setIsScreenOpen(2)
          registerUser({ city: "", phone: "" });
          sendwelcomemail(dataForRegistration.name, dataForRegistration.email);
        }
        console.log(responseJson);
      });
    } else {
      if (res.code === "auth/account-exists-with-different-credential") {
        showError(
          "You are register with different Provider. Please use the same"
        );
      }
      // else if (res.code === "auth/popup-closed-by-user") {
      //   showError("You closed the Connection")
      // }
      else {
        showError("Unable To connect");
      }
    }
  };

  const registerUser = (data) => {
    dataForRegistration.city = "Mumbai";
    axios
      .post(httpUrl + "customer", dataForRegistration)
      .then((result) => {
        let responseJson = result;
        localStorage.setItem("userData", JSON.stringify(result.data));
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("photo", JSON.stringify(result.data.photo));
        console.log(responseJson);

        navigate("/userHome");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Duplicate Account",
          text: "Your account is already created with other SignOn Type.",
          showConfirmButton: false,
          timer: 5500,
        });
      });
  };

  const sendwelcomemail = (name, email) => {
    let sendformat = {
      email: email,
      name: name,
      username: name,
    };

    axios.post(nodeUrl + "welcomeMail", sendformat).then((responce) => {
      console.log(responce.data);
    });
  };

  const showComingSoon = () => {
    // function for other page to move in coming soon section.
    setIsExplorerOpen(true);
    // setIsComingOpen(true)
  };

  const proceedNext = () => {
    if (isLogin) {
      gotoDashboard();
    } else {
      setIsLoginOpen(true);
    }
  };

  const spotifyLogin = () => {
    let spotifyWindow = window.open(loginUrl, "_blank", "width=500,height=500");
    saveIntervalSpotify = setInterval(function () {
      try {
        let letToken = getTokenByUrl(spotifyWindow.window.location);
        console.log("letToken");
        console.log(letToken);
        storedata = letToken.access_token;
        clearExtra();
        spotifyWindow.close();
        getSpotifyapi();
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  };

  const getSpotifyapi = () => {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedata}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          let userEmail = res.data.email;
          axios.get(httpUrl + "login?email=" + userEmail).then((result) => {
            let responseJson = result.data;
            if (responseJson.error === "USERNAME_ALREADY_EXIST") {
              loginUser(userEmail);
            } else {
              dataForRegistration.name = res.data.display_name;
              dataForRegistration.email = res.data.email;
              dataForRegistration.login.email = res.data.email;
              dataForRegistration.login.signuptype = "SSO";
              dataForRegistration.login.ssotype = "SPOTIFY";
              if (res.data.images[0]) {
                dataForRegistration.photo.urllink = res.data.images[0].url;
              }
              registerUser({ city: "", phone: "" });
              sendwelcomemail(
                dataForRegistration.name,
                dataForRegistration.email
              );
            }
            console.log(responseJson);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Not Allowed",
          text: error,
          showConfirmButton: false,
          timer: 5500,
        });
      });
  };

  const clearExtra = () => {
    clearInterval(saveIntervalSpotify);
  };

  const connectedUsBox = (event) => {
    setIsWordData(event.target.value);
  };

  const connectedUs = (event) => {
    event.preventDefault();

    let sendAbleData = {
      email: isWordData,
      admin: "vivarta@choira.io",
    };

    axios.post(nodeUrl + "contactUs", sendAbleData).then((responce) => {
      console.log(responce.data);
      Swal.fire({
        icon: "success",
        title: "Request received successfully!",
        text: "We will connect you ASAP.",
        showConfirmButton: false,
        timer: 5500,
      });
    });
  };

  const closeMoboNavi = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  const openMoboNavi = () => {
    document.getElementById("mySidenav").style.width = "100%";
  };

  return (
    <div>
      {/* <header className="header">
        <div className="left">
          <img src={Logo} alt="choria" />
        </div>
        <div className="right">
          <a href="home">Soundtracks</a>
          <a href="home">Jam</a>
          <a href="home">Projects</a>
          <a href='home'>Sign in22</a>
          <a href="home">
            <img src={ChoriaO} alt="choria" />
          </a>
        </div>
      </header> */}

      <section
        className="section top"
        style={{ backgroundImage: "url(images/image-17.png)" }}
      >
        {/* <div className="header">
          <div className="left">
            <a href="/">
              <img src={Logo} alt="choira" />
            </a>
          </div>
          <div className="right">
            {isMenuOpen ? (
              <div className="menu">
                {isComingOpen ? <div className="clickAbleButton" onClick={() => { setIsComingOpen(false); setIsExplorerOpen(false); }}>Home</div> : null}
                <div className="clickAbleButton" onClick={() => { setIsExplorerOpen(true); setIsComingOpen(false) }}>Soundtracks</div>
                <div className="clickAbleButton" onClick={() => { setIsComingOpen(true); setIsExplorerOpen(false); }}>Jam</div>
                <div className="clickAbleButton" onClick={() => { setIsLoginOpen(true); setIsExplorerOpen(false); }} >Projects</div>
                {isLogin ? (
                  <div className="clickAbleButton" onClick={() => { gotoDashboard(); setIsExplorerOpen(false); }}>Dashboard</div>
                ) : (
                  <>
                    <div className="clickAbleButton" onClick={() => { setIsLoginOpen(true); setIsExplorerOpen(false); }}>Sign in</div>
                  </>
                )}

                <img
                  className="menu-close-btn"
                  onClick={() => setIsMenuOpen(false)}
                  src={ChoriaO}
                  alt="choria"
                />
              </div>
            ) : (
              <img
                className="menu-open-btn"
                onClick={() => setIsMenuOpen(true)}
                src={ChoriaWhiteO}
                alt="choria"
              />
            )}
          </div>
        </div> */}

        <header>
          <div className="choiralogonr">
            <img src={Logo} alt="choira" />
          </div>
          <i className="fa fa-bars hamburger" onClick={openMoboNavi}></i>
          <nav id="menu">
            <div className="clickAbleButton">
              <a className="studiolink" href="https://studio.choira.io">
                Studio
              </a>
            </div>
            <div
              className="clickAbleButton"
              onClick={() => {
                setIsExplorerOpen(false);
              }}
            >
              <a className="studiolink" href="https://jam.choira.io">
                Jam
              </a>
            </div>
            <div className="clickAbleButton" onClick={gotoProject}>
              Project
            </div>
            {/* <div className="clickAbleButton" onClick={() => { setIsLoginOpen(true); setIsExplorerOpen(false); }} >Projects</div> */}
            {
              isLogin ? (
                <div
                  className="clickAbleButton"
                  onClick={() => {
                    gotoDashboard();
                  }}
                >
                  Dashboard
                </div>
              ) : (
                <div
                  className="clickAbleButton"
                  onClick={() => {
                    gotoSignin();
                  }}
                >
                  Sign in
                </div>
              )
              // <div className="clickAbleButton" onClick={() => { setIsLoginOpen(true); setIsExplorerOpen(false); }}>Sign in</div>
            }
          </nav>
        </header>

        <div id="mySidenav" className="sidenav">
          <div className="closebtn" onClick={closeMoboNavi}>
            &times;
          </div>
          <div
            className="clickAbleButton"
            onClick={() => {
              closeMoboNavi();
            }}
          >
            <a className="studiolink" href="https://studio.choira.io">
              Studio
            </a>
          </div>
          <div
            className="clickAbleButton"
            onClick={() => {
              closeMoboNavi();
              setIsExplorerOpen(false);
            }}
          >
            <a className="studiolink" href="https://jam.choira.io">
              Jam
            </a>
          </div>
          {/* <div className="clickAbleButton" onClick={() => { closeMoboNavi(); setIsLoginOpen(true); setIsExplorerOpen(false); }} >Projects</div> */}
          {isLogin ? (
            <div
              className="clickAbleButton"
              onClick={() => {
                closeMoboNavi();
                gotoDashboard();
                setIsExplorerOpen(false);
              }}
            >
              Dashboard
            </div>
          ) : (
            <div
              className="clickAbleButton"
              onClick={() => {
                closeMoboNavi();
                setIsLoginOpen(true);
                setIsExplorerOpen(false);
              }}
            >
              Sign in
            </div>
          )}
        </div>

        {isComingOpen ? (
          <ComingSoon />
        ) : (
          <>
            <div className="content">
              <h1>
                <span className="color-orange">Music </span>
                Ecosystem for the
                <span className="color-orange"> Digital </span>
                Age
              </h1>
              <div className="btns">
                {/* <a className="watch-video" href="/">
                          <img src={PlayBtnIcon} alt="" />
                          <span className="text">Watch Video</span>
                        </a> */}

                <span
                  className="get-started-btn bg-orange"
                  onClick={() => {
                    proceedNext();
                    gtag_report_conversion();
                  }}
                >
                  Get started
                </span>
              </div>
            </div>
            <img className="bottom-vector" src={Vector8} alt="" />
          </>
        )}
      </section>

      {isComingOpen || isExplorerOpen ? null : (
        <>
          <section id="about" className="section about">
            <div className="content">
              <h2 className="color-orange">About Us</h2>
              <p>
                Choira is not just an app or website. It's a complete ecosystem
                to empower you with tools to jam, produce and explore music, the
                last remaining magic in this world.✨
              </p>
              <p>
                Team Choira is a unique combination of creative as well as
                management professionals who strive and commit to developing a
                music ecosystem like none-other with prime focus to develop art,
                artists and create kickass content! 🔥
              </p>
            </div>
            <img src={BottomCurve} alt="" />
          </section>
          <section className="section team">
            <div
              className="header-container"
              // style={{ backgroundImage: "url(images/corner-curve-2.png)" }}
            >
              <h1 className="header">
                <span>Imagine</span> <span className="gray"> a Place</span>
                <span className="underline">
                  <span className="line-1"></span>
                  <span className="line-2"></span>
                  <span className="line-3"></span>
                </span>
              </h1>
              <img
                className="corner-curve"
                src="images/corner-curve-2.png"
                alt=""
              />
            </div>
            <TeamCarousel
              changePage={showComingSoon}
              moveForward={proceedNext}
            />
          </section>

          <section className="section badge">
            <div className="item">
              <img src={BadgeTalented} alt="" />
              <h3 className="title">Top talents</h3>
              <p>Work with award winning talents across the globe</p>
            </div>
            <div className="item">
              <img src={BadgeTrusted} alt="" />
              <h3 className="title">Trusted Profiles</h3>
              <p>Safe and secure with thousands of verified artists</p>
            </div>
            <div className="item">
              <img src={BadgeCreator} alt="" />
              <h3 className="title">Create the best</h3>
              <p>
                Create singles, YouTube hits, and chart-topping albums, all with
                choira
              </p>
            </div>
          </section>
          <section className="section testimonials">
            <TestimonialCarousel />
          </section>
          <section className="section video">
            <VideoPlayer />
          </section>
          <section>
            <div className="Titlename">
              <label style={innertitle}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Backed By
              </label>
            </div>
            <div style={{ margin: "50px" }} className="Titlename">
              <div className="mainclass">
                <div className="firsticon">
                  <a href="https://www.marlaccelerator.com" target="_blank">
                    <img
                      style={{ marginTop: "10px" }}
                      src={image33}
                      alt="image"
                    />
                  </a>
                </div>
                <div className="secondicon">
                  <a href="https://www.iiit.ac.in" target="_blank">
                    <img src={image34} alt="image" />
                  </a>
                </div>
                <div className="thirdicon">
                  <a href="https://sineiitb.org" target="_blank">
                    <img src={image35} alt="image" />
                  </a>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <div className="row">
              <div className="column intro">
                <img src={Logo} alt="" />
                <p>
                  Choira is an online ecosystem to empower you with tools to
                  jam, produce and explore music.
                </p>
                <div className="social-btns">
                  <a
                    href="https://www.instagram.com/choiramusic/"
                    target="_blank"
                  >
                    <img src={InstagramIcon} alt="Instagram Link" />
                  </a>
                  &nbsp;
                  <a
                    href="https://www.facebook.com/Choira-107074321806949"
                    target="_blank"
                  >
                    <img src={facebookLogo} alt="Facebook Link" />
                  </a>
                  &nbsp;
                  <a href="https://twitter.com/choiramusic" target="_blank">
                    <img src={TwitterIcon} alt="Twitter Link" />
                  </a>
                  &nbsp;
                  <a
                    href="https://www.linkedin.com/company/choira"
                    target="_blank"
                  >
                    <img src={linkedin} alt="Youtube Link" />
                  </a>
                </div>
              </div>
              <div className="column">
                <h3 className="title">Company</h3>
                <a href="#/about">About us</a>
                <a href="#/refundPolicy">Refund Policy</a>
                <a href="https://studio.choira.io/#choira_team">Our team</a>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setcontactus(true);
                  }}
                >
                  Contact us
                </span>
              </div>
              <div className="column">
                <h3 className="title">Support</h3>
                <a href="#/Disclaimer">Disclaimer</a>
                <a href="#/TermsandCondition">
                  Terms and
                  <br /> Conditions
                </a>
                <a href="#/Privacypolicy">Privacy Policy</a>
              </div>
              <div className="column email">
                <h3 className="title">Stay connected to us</h3>
                <form onSubmit={connectedUs}>
                  <div className="email-field">
                    <input
                      type="email"
                      placeholder="Your email address"
                      onChange={connectedUsBox}
                      required
                    />
                    <button type="submit">
                      <img src={PaperPlane} alt="" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="copyright">
              <div className="left">
                <span>© 2022-2023 choira. All rights reserved</span>
              </div>
              {/* <div className="right">
                    <span>
                      <span style={{ textDecoration: "none", color: "#f2f2f2", cursor: "pointer" }} onClick={() => { navigate("/termsCondition") }}>Terms & Conditions</span>
                    </span> |
                    <span>
                      <span style={{ textDecoration: "none", color: "#f2f2f2", cursor: "pointer" }} onClick={() => { navigate("/privacyPolicy") }}> Privacy Policy</span>
                    </span> |
                    <span>
                      <span style={{ textDecoration: "none", color: "#f2f2f2", cursor: "pointer" }} onClick={() => { navigate("/declaimer") }} > Disclaimer</span>
                    </span>
                  </div> */}
            </div>
            <img className="right-side" src={FooterRightImg} alt="" />
          </footer>
        </>
      )}

      {isLoginOpen ? (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span
                className="close"
                onClick={() => {
                  setIsLoginOpen(false);
                }}
              >
                &times;
              </span>
              <h2>Get Started with</h2>
              <div className="logoModel">
                <img src={Logo} alt="choria" />
              </div>
            </div>
            <div className="modal-body" style={{ padding: "2px 16px" }}>
              {isScreenOpen === 0 ? (
                <div className="screenOne">
                  <div className="ssoClass">
                    <div
                      className="googleLogin screenLogin"
                      onClick={() =>
                        handleFirebaseClick(googleProvider, "GOOGLE")
                      }
                    >
                      <div className="logo">
                        <img src={googleLogo} alt="google Logo" />
                      </div>
                      <div className="brandName">Log in with Google</div>
                    </div>

                    <div
                      className="facebookLogin screenLogin"
                      onClick={() => spotifyLogin()}
                    >
                      <div className="logo">
                        <img src={spottyLogo} alt="google Logo" />
                      </div>
                      <div className="brandName">Log in with Spotify</div>
                    </div>
                    <div
                      className="spottyLogin screenLogin"
                      onClick={() =>
                        handleFirebaseClick(facebookProvider, "FACEBOOK")
                      }
                    >
                      <div className="logo">
                        <img src={facebookLogo} alt="google Logo" />
                      </div>
                      <div className="brandName">Log in with Facebook</div>
                    </div>
                    <div
                      className="mailLogin screenLogin"
                      onClick={() => setIsScreenOpen(3)}
                    >
                      <div className="logo">
                        <img src={mailLogo} alt="google Logo" />
                      </div>
                      <div className="brandName">Log in with email instead</div>
                    </div>
                    <div className="loginNow">
                      {/* <div className="loginText" onClick={() => setIsScreenOpen(3)}>
                          Already have an account? Click here
                        </div> */}
                      <div
                        className="loginText"
                        onClick={() => {
                          setIsSignUpOpen(true);
                          setIsLoginOpen(false);
                        }}
                      >
                        Don't have an account? Click here
                      </div>
                    </div>
                  </div>
                </div>
              ) : isScreenOpen === 1 ? (
                <div className="screenTwo">
                  <RegisterBox closeModel={closeModel} />
                  <div className="cancelNow" onClick={() => setIsScreenOpen(0)}>
                    <div className="button">Cancel</div>
                  </div>
                </div>
              ) : isScreenOpen === 2 ? (
                <div className="screenTwo">
                  <GoogleExtraBox closeModel={registerUser} />
                  <div className="cancelNow" onClick={() => setIsScreenOpen(0)}>
                    <div className="button">Cancel</div>
                  </div>
                </div>
              ) : isScreenOpen === 3 ? (
                <div className="screenTwo">
                  <LoginBox closeModel={closeModel} />
                  <div className="cancelNow" onClick={() => setIsScreenOpen(0)}>
                    <div className="button">Cancel</div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="modal-footer">
              <p
                style={{ cursor: "pointer", textAlign: "center" }}
                onClick={() => {
                  navigate("/termsandCondition");
                }}
              >
                Terms And Conditions
              </p>
            </div>
          </div>
          <div
            className="backGroundClick"
            onClick={() => {
              setIsLoginOpen(false);
            }}
          ></div>
        </div>
      ) : null}

      {isExplorerOpen ? null : null}

      {isSignUpOpen ? (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span
                className="close"
                onClick={() => {
                  setIsSignUpOpen(false);
                }}
              >
                &times;
              </span>
              <h2>Get Started with</h2>
              <div className="logoModel">
                <img src={Logo} alt="choria" />
              </div>
            </div>
            <div className="modal-body" style={{ padding: "2px 16px" }}>
              {isScreenOpen === 0 ? (
                <div className="screenOne">
                  <div className="ssoClass">
                    <div
                      className="googleLogin screenLogin"
                      onClick={() =>
                        handleFirebaseClick(googleProvider, "GOOGLE")
                      }
                    >
                      <div className="logo">
                        <img src={googleLogo} alt="google Logo" />
                      </div>
                      <div className="brandName">Sign Up with Google</div>
                    </div>
                    <div
                      className="facebookLogin screenLogin"
                      onClick={() => spotifyLogin()}
                    >
                      <div className="logo">
                        <img src={spottyLogo} alt="google Logo" />
                      </div>
                      <div className="brandName">Sign Up with Spotify</div>
                    </div>
                    <div
                      className="spottyLogin screenLogin"
                      onClick={() =>
                        handleFirebaseClick(facebookProvider, "FACEBOOK")
                      }
                    >
                      <div className="logo">
                        <img src={facebookLogo} alt="google Logo" />
                      </div>
                      <div className="brandName">Sign Up with Facebook</div>
                    </div>
                    <div
                      className="mailLogin screenLogin"
                      onClick={() => setIsScreenOpen(1)}
                    >
                      <div className="logo">
                        <img src={mailLogo} alt="google Logo" />
                      </div>
                      <div className="brandName">
                        Sign Up with email instead
                      </div>
                    </div>
                    <div className="loginNow">
                      {/* <div className="loginText" onClick={() => setIsScreenOpen(3)}>
                          Already have an account? Click here
                        </div> */}
                      <div
                        className="loginText"
                        onClick={() => {
                          setIsSignUpOpen(false);
                          setIsLoginOpen(true);
                        }}
                      >
                        Already have an account? Click here
                      </div>
                    </div>
                  </div>
                </div>
              ) : isScreenOpen === 1 ? (
                <div className="screenTwo">
                  <RegisterBox closeModel={closeModel} />
                  <div className="cancelNow" onClick={() => setIsScreenOpen(0)}>
                    <div className="button">Cancel</div>
                  </div>
                </div>
              ) : isScreenOpen === 2 ? (
                <div className="screenTwo">
                  <GoogleExtraBox closeModel={registerUser} />
                  <div className="cancelNow" onClick={() => setIsScreenOpen(0)}>
                    <div className="button">Cancel</div>
                  </div>
                </div>
              ) : isScreenOpen === 3 ? (
                <div className="screenTwo">
                  <LoginBox closeModel={closeModel} />
                  <div className="cancelNow" onClick={() => setIsScreenOpen(0)}>
                    <div className="button">Cancel</div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="modal-footer">
              <p
                style={{ cursor: "pointer", textAlign: "center" }}
                onClick={() => {
                  navigate("/termsandCondition");
                }}
              >
                Terms And Conditions
              </p>
            </div>
          </div>
          <div
            className="backGroundClick"
            onClick={() => {
              setIsSignUpOpen(false);
            }}
          ></div>
        </div>
      ) : null}

      {isvisiblecontact ? (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span
                className="close"
                onClick={() => {
                  setcontactus(false);
                }}
              >
                &times;
              </span>
              <h2>Contact Us</h2>
              <div className="logoModel">
                <p style={{ textAlign: "center" }}>
                  We Will Get Back To You Asap!
                </p>
              </div>
            </div>
            {/* <form onSubmit={sendmail}> */}
            <div
              className="modal-body"
              style={{
                padding: "2px 2vw",
                paddingBottom: "20px",
                overflow: "auto",
              }}
            >
              <div style={{ marginTop: "40px" }}>
                {/* <label style={{ float: "left" }}>First Name </label> */}
                {/* <span> First Name</span> */}
                {/* <input type="text" className="inputfield" value={values.firstname} name="firstname" id="firstname" required onChange={inputsHandler('firstname')} /> */}
              </div>
              <div>
                {/* <label style={{ float: "left" }}>Last Name </label> */}
                {/* <input type="text" className="inputfield" value={values.lastname} name="lastname" id="lasttname" required onChange={inputsHandler('lastname')} /> */}
              </div>
              <div>
                <label style={{ float: "left" }}>
                  Email : connectus@choira.io
                </label>
                {/* <input type="email" name="email" value={values.email} className="inputfield" id="email" required onChange={inputsHandler('email')} /> */}
                <br />
                <hr />
              </div>
              <div>
                <label style={{ float: "left" }}>Phone : 09766982592</label>
                <br />
                <hr />
                {/* <input type="number" className="inputfield" value={values.phone} name="phone" required pattern="[7-9]{1}[0-9]{9}" id="phone" onChange={inputsHandler('phone')} /> */}
              </div>
              <div>
                <label style={{ float: "left" }}>Address : </label>
                <label>319 IITB-Monash Research Academy,</label>
                <label style={{ float: "right" }}>
                  IIT, Powai, Mumbai, Maharashtra 400076
                </label>
              </div>

              {/* <div style={{ marginTop: "24px" }}>

                  <input type="submit" className="btn" name="submit" value="SEND" className="btn" />

                </div>
                <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                  <label onClick={() => { setcontactus(false) }}>Cancel</label>
                </div> */}
            </div>
            {/* </form> */}
          </div>
          <div
            className="backGroundClick"
            onClick={() => {
              setcontactus(false);
            }}
          ></div>
        </div>
      ) : null}
    </div>
  );
}
