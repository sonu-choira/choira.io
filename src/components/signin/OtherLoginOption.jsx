import React from "react";
import { infoAlert } from "../../pages/admin/layout/Alert";
import signStyle from "../../pages/home/signinBackup.module.css";
import google from "../../assets/img/google.png";
import facebook from "../../assets/img/facebook.png";
import apple from "../../assets/img/apple.png";
function OtherLoginOption({ sign }) {
  const infoAlertfn = () => {
    infoAlert("This feature is coming soon ...", "All Right");
  };
  return (
    <div
      className={`${
        sign === 1
          ? signStyle.signinOption
          : sign === 2
          ? signStyle.visiblity
          : signStyle.visiblity
      }`}
    >
      <div onClick={infoAlertfn}>
        <img src={google} alt="Google" />
        <small>Sign in with Google </small>
      </div>
      <div onClick={infoAlertfn}>
        <img src={facebook} alt="Facebook" />
      </div>
      <div onClick={infoAlertfn}>
        <img src={apple} alt="Apple" />
      </div>
    </div>
  );
}

export default OtherLoginOption;
