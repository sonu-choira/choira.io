import React, { useEffect, useLayoutEffect, useState } from "react";

import singer from "../../assets/img/singer3.png";
import signStyle from "../../pages/home/signinBackup.module.css";
import logo from "../../assets/img/logo-choira.svg";
import google from "../../assets/img/google.png";
import facebook from "../../assets/img/facebook.png";
import apple from "../../assets/img/apple.png";
import SigninNum from "../signin/SigninNum";
import { useMutation } from "react-query";

import "../../pages/home/home.scss";

// SERVICES
import TokenService from "../../services/token.service";

import { useNavigate } from "react-router";
import firebaseApp from "../../helper/firebaseInit";
import socialMediaAuth from "../../services/firebaseService";
import { googleProvider, facebookProvider } from "../../helper/firebaseMethod";
import axios from "axios";

import Swal from "sweetalert2";

// import SpotifyWebApi from "spotify-web-api-js"

import { httpUrl, nodeUrl } from "../../restservice";

import { errorAlert, sucessAlret } from "../../pages/admin/layout/Alert";
import Button from "../../pages/admin/layout/Button";
import PartnerOtpVerify from "./PartnerOtpVerify";
import partnerApi from "../../services/partnerApi";
import PartnerSignup from "./PartnerSignup";
// import Cookies from "js-cookie";

let loginCheckVerify = true;

let storedata;

// console.log(btoa(JSON.stringify(initFirebase)))

function PartnerLogin() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [isvisiblecontact, setcontactus] = useState(false);
  const [countryCode, setCountryCode] = useState("91");
  const [values, setInputField] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const signin = true;
  let isLogin = false;

  // State to manage the sign-in steps
  const [sign, setSign] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");

  const navigate = useNavigate();
  const [size, setSize] = useState([0, 0]);

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
  };

  checkLogin();

  const navigates = navigate;
  const gotoSignup = () => {
    navigates("/signup");
  };

  // api integration ----------------------------------------
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  let loaderText = "Verifying ...";
  const handelAuthResponse = (response) => {
    if (response.status) {
      // TokenService.setUser(response.user.role);
      TokenService.setData("token", response.token);
      setSign(2);
      sucessAlret(response.message);
    } else {
      console.log("Not get Token");
      errorAlert(response.message);
    }
  };

  const loginMutation = useMutation(
    ({ phoneNumber }) => partnerApi.login(phoneNumber, "NUMBER"),
    {
      onMutate: () => {
        setShowBtnLoader(true); // Show the button loader before request
      },
      onSuccess: (response) => {
        setShowBtnLoader(false); // Hide the button loader on success
        console.log("res------", response);
        console.log("res------", response.user);
        localStorage.setItem(
          "studio-owner",
          JSON.stringify(response.ownerData || {})
        );
        handelAuthResponse(response); // Handle auth response
      },
      onError: (error) => {
        setShowBtnLoader(false); // Hide the loader on error
        errorAlert(error.message); // Display error alert
        console.log(error);
      },
      onSettled: () => {
        setShowBtnLoader(false); // Always hide the loader when the mutation is settled
      },
    }
  );

  const handleMobileNumberChange = (e) => {
    const value = e.target.value.slice(0, 10);
    setMobileNumber(value ? value : "");
  };

  // Refactored checkLoginData function
  const checkLoginData = () => {
    const phoneNumber = countryCode + mobileNumber;
    loginMutation.mutate({ phoneNumber });
  };

  const gotoBooking = () => {
    navigate("/partner-dashboard/Overview");
    window.location.reload();
  };
  const [partnerDetails, setPartnerDetails] = useState({
    firstName: "",
    lastName: "",
    phone: countryCode + mobileNumber,
    email: "",
    dateOfBirth: "",
    type: "NUMBER",
  });

  useEffect(() => {
    setPartnerDetails({ ...partnerDetails, phone: countryCode + mobileNumber });
  }, [mobileNumber]);
  console.log("mobile no issssss", mobileNumber);

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
  const handleOtpResponse = (response) => {
    if (response.status) {
      TokenService.setData("token", response?.token);
      localStorage.setItem("userType", "owner");
      sucessAlret("OTP is Correct!", "Welcome back 😊");

      localStorage.setItem("isSignin", "true");
      localStorage.setItem("studio-owner", JSON.stringify(response.ownerData));
      if (!response.newOwner) {
        gotoBooking();
      } else {
        setSign(3);
      }
      // setCheckOtp(false);
    } else {
      errorAlert("OTP is Incorrect!", "Please try again 😕");
      console.log("Not get Token");
    }
  };

  const verifyOtpMutation = useMutation(
    ({ phoneNumber, otp }) => partnerApi.verifyOtp(phoneNumber, otp),
    {
      onMutate: () => {
        setShowBtnLoader(true);
      },
      onSuccess: (response) => {
        setShowBtnLoader(false);
        console.log("res------", response);
        handleOtpResponse(response);
      },
      onError: (error) => {
        setShowBtnLoader(false);
        errorAlert(error.message);
        console.log(error);
      },
      onSettled: () => {
        setShowBtnLoader(false);
      },
    }
  );

  // Refactored check_otp_btn function
  const check_otp_btn = () => {
    const phoneNumber = countryCode + mobileNumber;
    verifyOtpMutation.mutate({ phoneNumber, otp: enteredOTP });
  };

  useEffect(() => {
    let signin = localStorage.getItem("isSignin");
    if (signin) {
      navigate(-1);
    }
  }, []);
  const gotoHome = () => {
    navigate("/home");
  };
  const handlePartnerSignup = (e) => {
    e.preventDefault();
    TokenService.removeData("token");
    partnerApi
      .partnerSignup(partnerDetails)
      .then((response) => {
        console.log("res------", response);
        if (response.status) {
          localStorage.setItem(
            "studio-owner",
            JSON.stringify(response.ownerData || {})
          );
          TokenService.setData("token", response.token);
          sucessAlret(response.message);
          gotoBooking();
        } else {
          errorAlert(response.message);
          setSign(1);
        }
      })
      .catch((error) => {
        errorAlert(error.message);
        console.log(error);
      });
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
                        <h5 style={{ visibility: sign <= 2 ? "hidden" : "" }}>
                          {`${sign < 3 ? "No Account ?" : "Have an Account ?"}`}
                          <br />
                          <br />
                          <div
                            // style={{ fontSize: "0.8vmax" }}
                            onClick={gotoSignup}
                            style={{
                              visibility: sign <= 2 ? "hidden" : "",
                              fontSize: "0.8vmax",
                              cursor: "pointer",
                            }}
                          >{`${sign < 3 ? "Signup" : "Signin"}`}</div>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className={signStyle.signupHeader2}>
                    <h1>{`${sign < 3 ? "Sign in" : "Sign Up"}`} </h1>
                  </div>
                  <div className={signStyle.enterMob}>
                    {sign === 1 ? (
                      <SigninNum
                        mobileNumber={mobileNumber}
                        handleMobileNumberChange={handleMobileNumberChange}
                        countryCode={countryCode} // Pass the country code to SigninNum
                        onCountryCodeChange={handleCountryCodeChange} // Pass the handler function
                      />
                    ) : sign === 2 ? (
                      <PartnerOtpVerify
                        mobileNumber={mobileNumber}
                        countryCode={countryCode}
                        // checkOtp={checkOtp}
                        // setCheckOtp={setCheckOtp}
                        // apiOtp={apiOtp}
                        checkLoginData={checkLoginData}
                        enteredOTP={enteredOTP}
                        setEnteredOTP={setEnteredOTP}
                      />
                    ) : sign === 3 ? (
                      <PartnerSignup
                        partnerDetails={partnerDetails}
                        setPartnerDetails={setPartnerDetails}
                      />
                    ) : (
                      ""
                    )}

                    <div className={signStyle.footer}>
                      <div
                        style={{ visibility: "hidden" }}
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
                        <div style={{ visibility: "hidden" }}>
                          <img src={google} alt="Google" />
                          <small>Sign in with Google </small>
                        </div>
                        <div style={{ visibility: "hidden" }}>
                          <img src={facebook} alt="Facebook" />
                        </div>
                        <div style={{ visibility: "hidden" }}>
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
                              name={"Submit"}
                              showBtnLoader={showBtnLoader}
                              loaderText={loaderText}
                            />
                          ) : sign === 3 ? (
                            // <button type="submit" onClick={check_otp_btn}>
                            //   submit
                            // </button>
                            <Button
                              type="submit"
                              onClick={(e) => handlePartnerSignup(e)}
                              name={"Submit"}
                              showBtnLoader={showBtnLoader}
                              loaderText={loaderText}
                            />
                          ) : (
                            <Button
                              type="submit"
                              onClick={handleContinueButtonClick}
                              name={"Continue"}
                              showBtnLoader={showBtnLoader}
                              loaderText={loaderText}
                            />
                          )}
                        </div>
                        <div>
                          <h6>
                            By creating an account or login in, you agree to
                            Choira's <br /> <span>Conditions of Use</span> and
                            <span> Privacy Policy.</span>
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

export default PartnerLogin;
