import React, { useState } from "react";
import signStyle from "../../pages/home/signinBackup.module.css";

const SigninNum = ({
  mobileNumber,
  handleMobileNumberChange,
  countryCode,
  onCountryCodeChange,
}) => {
  const handleCountryCodeChange = (e) => {
    onCountryCodeChange(e.target.value);
  };

  return (
    <>
      <div className={signStyle.enterMobInnerDiv}>
        <div>
          <label htmlFor="mob">Enter your mobile number</label>
        </div>
        <div className={signStyle.enterMobInput}>
          <div>
            <select
              name="mobpin"
              value={countryCode}
              onChange={handleCountryCodeChange}
            >
              <option value="91">IN</option>
              <option value="1">US</option>
              <option value="81">JP</option>
              {/* Add more country options as needed */}
            </select>
          </div>
          <div className={signStyle.mobpin2}>
            <div className="contry-code">+{countryCode}|</div>
            <input
              type="number"
              id="mob"
              placeholder="Mobile number"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
            />
          </div>
        </div>
        <div className={signStyle.verify}>
          <h6>
            To verify your mobile no, We will send you a confirmation code
          </h6>
        </div>
      </div>
    </>
  );
};

export default SigninNum;
