import React, { useEffect, useLayoutEffect, useState } from "react";

import singer from "../../assets/img/singer3.png";
import signStyle from "../home/signinBackup.module.css";
import logo from "../../assets/img/logo-choira.svg";
import google from "../../assets/img/google.png";
import facebook from "../../assets/img/facebook.png";
import apple from "../../assets/img/apple.png";
import OptVerify from "../../components/signin/OptVerify";
import SigninNum from "../../components/signin/SigninNum";
import SignUpDetails from "../../components/signin/SignUpDetails";

import "./home.scss";

// SERVICES
import AuthService from "../../services/auth.service";
import TokenService from "../../services/token.service";

import { useNavigate } from "react-router";
import firebaseApp from "../../helper/firebaseInit";
import socialMediaAuth from "../../services/firebaseService";
import { googleProvider, facebookProvider } from "../../helper/firebaseMethod";
import axios from "axios";

import Swal from "sweetalert2";

// import SpotifyWebApi from "spotify-web-api-js"
import { loginUrl, getTokenByUrl } from "../../spotify";

import { httpUrl, nodeUrl } from "../../restservice";
import { Alert } from "antd";
import { errorAlert, sucessAlret } from "../admin/layout/Alert";
import Button from "../admin/layout/Button";
import ToggleSwitch from "../admin/layout/ToggleSwitch";
// import Cookies from "js-cookie";

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

function Signin() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isComingOpen, setIsComingOpen] = useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isScreenOpen, setIsScreenOpen] = useState(0);
  const [isWordData, setIsWordData] = useState("");
  const [isvisiblecontact, setcontactus] = useState(false);
  const [countryCode, setCountryCode] = useState("91");
  const [values, setInputField] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const signin = true;

  // State to manage the sign-in steps
  const [sign, setSign] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");

  const [token, setToken] = useState([]);

  const navigate = useNavigate();
  const [size, setSize] = useState([0, 0]);

  const inputsHandler = (name) => (e) => {
    setInputField({ ...values, [name]: e.target.value });
  };

  useLayoutEffect(() => {
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
  const navigates = navigate;
  const gotoSignup = () => {
    navigates("/signup");
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

  // api integration ----------------------------------------
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  let loaderText = "verifying ...";
  const [userType, setUserType] = useState("admin");
  const checkLoginData = () => {
    setShowBtnLoader(true);
    let type = "login";
    if (userType === "admin") {
      type = "login";
    } else {
      type = "subLogin";
    }

    // const role = mobileNumber === "9898989898" ? "admin" : "user";
    AuthService[type](countryCode + mobileNumber, "NUMBER")
      .then((response) => {
        setShowBtnLoader(false);
        console.log("res------", response);
        console.log("res------", response.user);
        localStorage.setItem("adminData", JSON.stringify(response.user || {}));
        if (response.status) {
          setShowBtnLoader(false);

          // TokenService.setUser(response.user.role);
          console.log("taken isssss", response.token);
          TokenService.setData("token", response.token || {});
          setSign(2);
          sucessAlret(response.message);
        } else {
          setShowBtnLoader(false);

          console.log("Not get Token");
          errorAlert(response.message);
        }

        // if (response.user.role === "admin") {
        //   console.log(response.newUser);
        //   setSign(2);
        //   navigate("/adminDashboard/Apps&More/studio");
        // } else if (response.newUser === true) {
        //   console.log(response.newUser);
        //   localStorage.removeItem("token");
        //   setApiOtp(response.otp);
        //   setSign(2);
        // }
      })
      .catch((error) => {
        setShowBtnLoader(false);
        errorAlert(error.message);
        console.log(error);
      });
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
    // console.log(mobileNumber);
  };
  const gotoBooking = () => {
    navigate("/adminDashboard/Overview");
    // window.location.reload();
  };

  const handleContinueButtonClick = (e) => {
    // Check if the mobile number is not empty and has exactly 10 digits
    e.preventDefault();

    const trimmedMobileNumber = mobileNumber.trim();

    if (trimmedMobileNumber !== "" && trimmedMobileNumber.length === 10) {
      // Perform any other actions as needed
      checkLoginData();
    } else {
      // Display an error message or take appropriate action
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  const handleCountryCodeChange = (code) => {
    setCountryCode(code);
  };
  let [checkOtp, setCheckOtp] = useState(true);
  const [enteredOTP, setEnteredOTP] = useState("");

  const source = axios.CancelToken.source();

  const check_otp_btn = () => {
    setShowBtnLoader(true);
    let type = "login";
    if (userType === "admin") {
      type = "login";
    } else {
      type = "subAdmin";
    }

    AuthService.verifyOtp(countryCode + mobileNumber, enteredOTP, type)
      .then((response) => {
        setShowBtnLoader(false);
        console.log("res------", response);
        if (response.status) {
          setShowBtnLoader(false);
          localStorage.setItem("userType", "admin");
          console.log("taken isssss", response.token);
          TokenService.setData("token", response.token || {});
          sucessAlret("OTP is Correct!", "Welcome back 😊");

          gotoBooking();
          // setCheckOtp(false);
          localStorage.setItem("isSignin", "true");
        } else {
          setShowBtnLoader(false);
          errorAlert(
            response.message || "OTP is Incorrect!",
            "Please try again 😕"
          );
          console.log("Not get Token");
        }
      })
      .catch((error) => {
        setShowBtnLoader(false);
        errorAlert(error.message);
        console.log(error);
      });
  };

  // useEffect(() => {
  //   return () => {
  //     source.cancel("Operation canceled by the user.");
  //   };
  // }, [source]);
  useEffect(() => {
    let signin = localStorage.getItem("isSignin");
    if (signin) {
      navigate(-1);
    }
  }, []);

  const gotoHome = () => {
    navigate("/home");
  };

  return (
    <>
      <div className={signStyle.SignInnavbar}>
        <img
          src={logo}
          alt="Choira Logo"
          style={{ cursor: "pointer" }}
          onClick={gotoHome}
        />
      </div>
      {/* <Alert
        message="Success Tips"
        description="Detailed description and advice about successful copywriting."
        type="success"
        showIcon
        closable
      /> */}

      <div className={signStyle.wrapper}>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className={signStyle.main}>
            <div className={signStyle.singer}>
              <img src={singer} alt="Singer" />
            </div>

            <div className={signStyle.signup}>
              <div className={signStyle.signupmain}>
                <div className={signStyle.signupmain2}>
                  <div className={signStyle.signupHeader}>
                    <div>
                      <h3>
                        Welcome to <span>Choira</span>
                      </h3>
                    </div>
                    <div>
                      <div>
                        <h5>
                          {`${signin ? "No Account ?" : "Have an Account ?"}`}
                          <br />{" "}
                          <h3 onClick={gotoSignup}>{`${
                            signin ? "Signup" : "Signin"
                          }`}</h3>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className={signStyle.signupHeader2}>
                    <h1>{`${signin ? "Sign in" : "Sign Up"}`} </h1>
                  </div>
                  {sign == 1 && (
                    <div className={signStyle.signupToggel}>
                      <p>Select Account Type</p>
                      <ToggleSwitch
                        userType={userType}
                        setUserType={setUserType}
                      />
                    </div>
                  )}

                  <div className={signStyle.enterMob}>
                    {sign === 1 ? (
                      <SigninNum
                        mobileNumber={mobileNumber}
                        handleMobileNumberChange={handleMobileNumberChange}
                        countryCode={countryCode} // Pass the country code to SigninNum
                        onCountryCodeChange={handleCountryCodeChange} // Pass the handler function
                      />
                    ) : sign === 2 ? (
                      <OptVerify
                        mobileNumber={mobileNumber}
                        countryCode={countryCode}
                        // checkOtp={checkOtp}
                        // setCheckOtp={setCheckOtp}
                        // apiOtp={apiOtp}
                        checkLoginData={checkLoginData}
                        enteredOTP={enteredOTP}
                        setEnteredOTP={setEnteredOTP}
                      />
                    ) : (
                      <SignUpDetails />
                    )}

                    <div className={signStyle.footer}>
                      <div
                        className={`${
                          sign === 1
                            ? `${signStyle.hrLine}`
                            : sign === 2
                            ? `${signStyle.visiblity}`
                            : `${signStyle.visiblity}`
                        }`}
                      >
                        <div></div>
                        <small>OR</small>
                        <div></div>
                      </div>

                      <div
                        className={`${
                          sign === 1
                            ? signStyle.signinOption
                            : sign === 2
                            ? signStyle.visiblity
                            : signStyle.visiblity
                        }`}
                      >
                        <div
                          onClick={() =>
                            handleFirebaseClick(googleProvider, "GOOGLE")
                          }
                        >
                          <img src={google} alt="Google" />
                          <small>Sign in with Google </small>
                        </div>
                        <div
                          onClick={() =>
                            handleFirebaseClick(facebookProvider, "FACEBOOK")
                          }
                        >
                          <img src={facebook} alt="Facebook" />
                        </div>
                        <div>
                          <img src={apple} alt="Apple" />
                        </div>
                      </div>
                      <div
                        className={`${
                          sign === 1
                            ? signStyle.continue
                            : sign === 2
                            ? `${signStyle.verifyContinue2} ${signStyle.continue}`
                            : signStyle.continue
                        }`}
                      >
                        <div>
                          {sign === 2 && signin ? (
                            <Button
                              type="submit"
                              onClick={check_otp_btn}
                              name={"submit"}
                              showBtnLoader={showBtnLoader}
                              loaderText={loaderText}
                            />
                          ) : (
                            // <button type="submit" onClick={check_otp_btn}>
                            //   submit
                            // </button>
                            <Button
                              type="submit"
                              onClick={handleContinueButtonClick}
                              name={"continue"}
                              showBtnLoader={showBtnLoader}
                              loaderText={loaderText}
                            />
                            // <button
                            //   type="submit"
                            //   onClick={handleContinueButtonClick}
                            // >
                            //   continue
                            // </button>
                          )}
                        </div>
                        <div>
                          <h6>
                            By creating an account or logging in, you agree to
                            Choira's <br /> <span>Conditions of Use</span> and
                            <span>Privacy Policy.</span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signin;
