import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";

const FormD = (props) => {
  const { handleSubmit, additionalData, closeModel } = props;

  const [phoneValue, setPhoneValue] = useState("+91")

  let phoneNumber = additionalData()

  const idChanged = value => {
    let selectedData = value.target.value
    switch(selectedData) {
      case "USA" :
        setPhoneValue("+1");
        break;
      
      case "PK" :
        setPhoneValue("+92");
        break;

      case "TU" :
        setPhoneValue("+286");
        break;

      case "BN" :
        setPhoneValue("+673");
        break;

      case "INDIA" :
        setPhoneValue("+91");
        break;

      default : console.log("Something happen")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div class="popup__header">
        <h3>You are almost done!</h3>
        <div onClick={() => closeModel()}><i class="fal fa-times"></i></div>

        <div class="popup__steps">
          <ul>
            <li class="step-active">1</li>
            <li class="step-active">2</li>
            <li class="step-active">3</li>
            <li class="step-active">4</li>
          </ul>
        </div>
      </div>

      <div class="popup__content form-C">
       
          <div class="verifybox">
            <div class="verifybox__heading">
              <h2>Get a Response Even Faster</h2>
              <p>Get notified via sms when you receive a response</p>
            </div>

            <div class="verifybox__number">
              <div>
                <select
                  id="option-select-3"
                  name="country_code"
                  placeholder-text="USA"
                  onChange={idChanged}
                >
                  <option value="INDIA" selected>INDIA</option>
                  <option value="USA">USA</option>
                </select>
              </div>

              <div class="country-input">
                <span class="country-code">{phoneValue}</span>
                <Field
                  name="phone 1"
                  component="input"
                  type="number"
                  placeholder="4254 55641"
                  value={phoneNumber}
                />
              </div>
            </div>
          </div>
      

        <div class="input-submit input-center">
          <div class="Finished">
          <button class="btn-primary" type="submit">
            Continue 
          </button>
        </div>
         
        </div>
        <br/><br/>
      </div>
    </form>
  );
};
export default reduxForm({
  form: "projectForm", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(FormD);
