import React from "react";
import Switch from "../../pages/admin/layout/Switch";
import user from "../../assets/img/userNotFound.jpg";
import style from "../../pages/admin/studios/studio.module.css";
import ChoiraLoder2 from "../loader/ChoiraLoder2";
import ChoiraLoader from "../loader/ChoiraLoader";
import moment from "moment";

function UserAcount({ userAllDetails }) {
  return (
    <>
      {/* {!userAllDetails && <ChoiraLoder2 />} */}
      {/* {!userAllDetails && <ChoiraLoader />} */}
      <div className={style.profilesection}>
        <div>
          <div>
            <div className={style.profileImgDiv}>
              <div className={style.profileImg}>
                <img
                  src={
                    userAllDetails.profileUrl ? userAllDetails.profileUrl : user
                  }
                  alt=""
                />
              </div>
              <div className={style.switchDiv}>
                Active Status <Switch status={userAllDetails.status} />
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
                  placeholder="User name"
                  name="name"
                  value={userAllDetails.fullName}
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
                  placeholder="User email"
                  name="email"
                  value={userAllDetails.email}
                />
              </div>
              <div className={style.addNewStudioinputBox}>
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  required
                  type="text"
                  disabled
                  id="mobile"
                  placeholder="User mobile number "
                  name="mobile"
                  value={userAllDetails.phone}
                />
              </div>
              <div className={style.addNewStudioinputBox}>
                <label htmlFor="DOB">DOB</label>
                <input
                  required
                  type="text"
                  disabled
                  id="DOB"
                  placeholder="User DOB"
                  name="DOB"
                  value={userAllDetails.dateOfBirth}
                />
              </div>

              <div className={style.addNewStudioinputBox}>
                <label htmlFor="Gender">Gender</label>
                <input
                  required
                  type="text"
                  disabled
                  id="Gender"
                  placeholder="User Gender"
                  name="Gender"
                  value={userAllDetails.gender}
                />
              </div>
              <div className={style.addNewStudioinputBox}>
                <label htmlFor="register">Registered on</label>
                <input
                  required
                  type="text"
                  disabled
                  id="register"
                  placeholder="User Registered on"
                  name="register"
                  value={moment(userAllDetails.createdAt).format(
                    "MMMM Do YYYY, hh:mm:ss a"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserAcount;
