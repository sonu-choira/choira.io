import React, { useState } from "react";
import style from "../../pages/home/signinBackup.module.css";

const DeleteAccountEmailVerify = ({
  setDeleteAccountEmail,
  deleteAccountEmail,
}) => {
  return (
    <>
      <div className={style.enterMobInnerDiv}>
        <div>
          <label htmlFor="email">Enter your Email Id to confirm </label>
        </div>
        <div className={style.enteremailinput}>
          <input
            type="email"
            id="email"
            required
            placeholder="Email id"
            value={deleteAccountEmail}
            onChange={(e) => {
              setDeleteAccountEmail(e.target.value);
            }}
          />
        </div>
        <div className="delete-notify">
          <h6>
            By entering your email your account will be deleted permanently
          </h6>
        </div>
      </div>
    </>
  );
};

export default DeleteAccountEmailVerify;
