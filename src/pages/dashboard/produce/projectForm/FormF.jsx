import React from "react";
import { reduxForm } from "redux-form";

const FormE = (props) => {
  const { handleSubmit, getName } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div class="popup__content-last popup-finished">
        {/* <a href="/userHome"><i class="fal fa-times"></i></a> */}
        <div class="verifybox">
          <div class="verifybox__heading-last">
            <h2>Awesome! We are done</h2>
          </div>
          <p>Your {getName()} has been initialized and our Artist Relationship Manager (ARM) will get in touch with your shortly with more updates regarding your project</p>
        </div>
        <div class="end endGameButton">
          <button class="btn-primary" type="submit">
            Got it!
          </button>
        </div>


        <br /><br />
      </div>
    </form>
  );
};
export default reduxForm({
  form: "projectForm", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(FormE);
