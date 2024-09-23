import React, { useEffect, useState } from "react";
// import "../../pages/home/signin.css";
import CustomInput from "../../pages/admin/layout/CustomInput";

function PartnerSignup({ partnerDetails, setPartnerDetails }) {
  // let takeData = props.sendData;

  // useEffect(() => {
  //   if (phone) {
  //     setPartnerDetails({ ...partnerDetails, phone: phone });
  //   }
  // }, [phone]);

  return (
    <>
      <div className="enter-mob-inner-div3">
        <CustomInput
          label={"Enter First Name"}
          name={"First name"}
          value={partnerDetails.firstName}
          onChange={(e) =>
            setPartnerDetails({ ...partnerDetails, firstName: e.target.value })
          }
        />
        <CustomInput
          label={"Enter Last Name"}
          name={"Last name"}
          value={partnerDetails.lastName}
          onChange={(e) =>
            setPartnerDetails({ ...partnerDetails, lastName: e.target.value })
          }
        />
        <CustomInput
          label={"Enter Email id"}
          name={"Email id "}
          value={partnerDetails.email}
          onChange={(e) =>
            setPartnerDetails({ ...partnerDetails, email: e.target.value })
          }
        />

        <CustomInput
          label={"Date of Birth"}
          name={"date"}
          type="date"
          value={partnerDetails.dateOfBirth}
          onChange={(e) =>
            setPartnerDetails({
              ...partnerDetails,
              dateOfBirth: e.target.value,
            })
          }
          placeholder="DD/MM/YYYY"
        />
      </div>
    </>
  );
}

export default PartnerSignup;
