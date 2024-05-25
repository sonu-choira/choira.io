import React from "react";
import Switch from "../../pages/admin/layout/Switch";
import user from "../../assets/img/userNotFound.jpg";
import style from "../../pages/admin/studios/studio.module.css";

function UserAcount() {
  return (
    <div className={style.profilesection}>
      <div>
        <div>
          <div className={style.profileImgDiv}>
            <div className={style.profileImg}>
              <img src={user} alt="" />
            </div>
            <div className={style.switchDiv}>
              Active Status <Switch />
            </div>
          </div>
        </div>
        <div className={style.userDetails}>
          <div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="name">Name</label>
              <input
                required
                type="text"
                id="name"
                placeholder="Enter name"
                name="name"
                disabled
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="area">Email</label>
              <input
                required
                type="email"
                disabled
                id="area"
                placeholder="Enter email"
                name="email"
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="mobile">Mobile Number</label>
              <input
                required
                type="text"
                disabled
                id="mobile"
                placeholder="Enter mobile number "
                name="mobile"
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="DOB">DOB</label>
              <input
                required
                type="text"
                disabled
                id="DOB"
                placeholder="Enter DOB"
                name="DOB"
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="area">Total Area</label>
              <input
                required
                type="text"
                disabled
                id="area"
                placeholder="Enter Approx. Area"
                name="area"
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="Gender">Gender</label>
              <input
                required
                type="text"
                disabled
                id="Gender"
                placeholder="Select Gender"
                name="Gender"
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="register">Registered on</label>
              <input
                required
                type="text"
                disabled
                id="register"
                placeholder="Enter Registered on"
                name="register"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAcount;
