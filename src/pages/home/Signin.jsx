import React, { useEffect, useState } from "react";

import singer from "../../assets/img/singer3.png";
import signStyle from "../home/signinBackup.module.css";
import logo from "../../assets/img/logo-choira.svg";

import OptVerify from "../../components/signin/OptVerify";
import SigninNum from "../../components/signin/SigninNum";
import SignUpDetails from "../../components/signin/SignUpDetails";

import "./home.scss";

// SERVICES
import AuthService from "../../services/auth.service";
import TokenService from "../../services/token.service";

import { useNavigate } from "react-router";

import axios from "axios";

import { errorAlert, sucessAlret } from "../admin/layout/Alert";
import Button from "../admin/layout/Button";
import ToggleSwitch from "../admin/layout/ToggleSwitch";
import dynamicNav from "../../utils/dynamicNav";
import { partnerAccess } from "../../config/partnerAccess";
import OtherLoginOption from "../../components/signin/OtherLoginOption";
import { useMutation } from "react-query";

function Signin() {
  const [countryCode, setCountryCode] = useState("91");

  const signin = true;
  let navigate = useNavigate();

  // State to manage the sign-in steps
  const [sign, setSign] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");

  const navigates = navigate;
  const gotoSignup = () => {
    navigates("/signup");
  };

  // api integration ----------------------------------------
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  let loaderText = "Verifying ...";
  const [userType, setUserType] = useState("admin");
  const handleAuthResponse = (response) => {
    localStorage.setItem("adminData", JSON.stringify(response.user || {}));
    if (response.status) {
      // TokenService.setUser(response.user.role);
      console.log("taken isssss", response.token);
      TokenService.setData("token", response.token || null);
      setSign(2);
      sucessAlret(response.message);
    } else {
      console.log("Not get Token");
      errorAlert(response.message);
    }
  };
  const loginMutation = useMutation(
    ({ phoneNumber, userType }) => {
      if (userType === "admin") {
        return AuthService.login(phoneNumber, "NUMBER");
      } else {
        return AuthService.subLogin(phoneNumber, "NUMBER");
      }
    },
    {
      onMutate: () => {
        setShowBtnLoader(true); // Show the button loader before request
      },
      onSuccess: (response) => {
        setShowBtnLoader(false);
        handleAuthResponse(response); // Call your success handler
      },
      onError: (error) => {
        setShowBtnLoader(false);
        errorAlert(error.message); // Handle error and show alert
      },
    }
  );

  // Refactored checkLoginData function
  const checkLoginData = () => {
    const phoneNumber = countryCode + mobileNumber;
    loginMutation.mutate({ phoneNumber, userType });
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value.slice(0, 10);
    setMobileNumber(value ? value : "");
  };

  const gotoBooking = () => {
    navigate(`/${dynamicNav}/Overview`);

    window.location.reload();
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

  const handleOtpResponse = (response) => {
    if (response.status) {
      localStorage.setItem("userType", "admin");
      TokenService.setData("token", response.token || null);
      sucessAlret("OTP is Correct!", "Welcome back 😊");
      gotoBooking(); // Assuming you have this navigation function
      localStorage.setItem("isSignin", "true");
    } else {
      errorAlert(
        response.message || "OTP is Incorrect!",
        "Please try again 😕"
      );
      console.log("Not get Token");
    }
  };

  const verifyOtpMutation = useMutation(
    ({ phoneNumber, otp, type }) => {
      return AuthService.verifyOtp(phoneNumber, otp, type);
    },
    {
      onMutate: () => {
        setShowBtnLoader(true); // Show the button loader
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
        setShowBtnLoader(false); // Reset loader in case of success or error
      },
    }
  );

  // Refactored check_otp_btn function
  const check_otp_btn = () => {
    const phoneNumber = countryCode + mobileNumber;
    const type = userType === "admin" ? "admin" : "subAdmin";
    verifyOtpMutation.mutate({ phoneNumber, otp: enteredOTP, type });
  };

  useEffect(() => {
    let signin = localStorage.getItem("isSignin");
    if (signin) {
      if (partnerAccess) {
        navigate(`/${dynamicNav}/Overview`);
      } else {
        navigate(`/${dynamicNav}/Overview`);
      }
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
                          <br />
                          <div
                            style={{ fontSize: "0.8vmax" }}
                            onClick={gotoSignup}
                          >{`${signin ? "Signup" : "Signin"}`}</div>
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

                      <OtherLoginOption sign={sign} />
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
                          ) : (
                            // <button type="submit" onClick={check_otp_btn}>
                            //   submit
                            // </button>
                            <Button
                              type="submit"
                              onClick={handleContinueButtonClick}
                              name={"Continue"}
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

export default Signin;
