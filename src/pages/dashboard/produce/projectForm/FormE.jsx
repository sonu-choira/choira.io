import React from "react";
import { Field, reduxForm } from "redux-form";

const FormE = (props) => {
  const { handleSubmit, additionalData, previousPage } = props;

  const detectSubmit = (inputElement) => {
    let otpBox = document.getElementById("otp2")
    switch (inputElement) {
      case 1:
        otpBox = document.getElementById("otp2")
        otpBox.focus();
        break;
      case 2:
        otpBox = document.getElementById("otp3")
        otpBox.focus();
        break;
      case 3:
        otpBox = document.getElementById("otp4")
        otpBox.focus();
        break;

      default : console.log("Something Happened")
    }

  }

  let phoneNumber = additionalData()

  console.log(phoneNumber)
  return (
    <form onSubmit={handleSubmit}>
      <div class="popup__header">
        <h3>You are almost done!</h3>

        <div class="popup__steps">
          <ul>
            <li class="step-active">1</li>
            <li class="step-active">2</li>
            <li class="step-active">3</li>
            <li class="step-active">4</li>
          </ul>
        </div>
      </div>

      <div class="popup__content">

        <div class="otp">
          <div class="verifybox__heading form-E">
            <h2>Enter OTP</h2>
            <p>We have share a 4 digit OTP on ******{String(phoneNumber).substring(6)}</p>
            <span className="formNameLink" style={{textAlign: "center",cursor:"pointer", paddingLeft: 0}} onClick={()=> {previousPage()}}>
              Change mobile number
            </span>
          </div>

          <div class="otp__number">
            <Field name="otp1" id="otp1" component="input" type="text" maxlength="1" onChange={() => { detectSubmit(1) }} />
            <Field name="otp2" id="otp2" component="input" type="text" maxlength="1" onChange={() => { detectSubmit(2) }} />
            <Field name="otp3" id="otp3" component="input" type="text" maxlength="1" onChange={() => { detectSubmit(3) }} />
            <Field name="otp4" id="otp4" component="input" type="text" maxlength="1" />
          </div>
          <div class="otp__norec">
            Didn’t receive code? <a onClick={()=> {previousPage()}}>Request again</a>
          </div>
        </div>
        <div class="input-submit input-center">
          <div class="Finished">
            <button class="btn-primary" type="submit">
              Verify
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default reduxForm({
  form: "projectForm", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(FormE);
