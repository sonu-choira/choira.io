import React from "react";
import { Field, reduxForm } from "redux-form";
import sprite from "../../../../assets/icons/sprite.svg";


const FormC = (props) => {
  const { handleSubmit, previousPage, additionalData, forStringFun, closeModel } = props;

  let priceData = additionalData()

  return (
    <form onSubmit={handleSubmit}>
      <div className="popup__header">
        <h3>What best describe the artists you’re looking to hire and your budget?</h3>
        <div onClick={() => closeModel()}><i class="fal fa-times"></i></div>

        <div className="popup__steps">
          <ul>
            <li className="step-active">1</li>
            <li className="step-active">2</li>
            <li className="step-active">3</li>
            <li>4</li>
          </ul>
        </div>
      </div>

      <div className="popup__content form-C">
        <div className="checks">
          {priceData.map((entry, index) => {
            console.log(index)
            return (
              <div class="check-group">
                <Field
                  component="input"
                  type="radio"
                  name="check"
                  id={String(index)}
                  value={String(entry.id)}
                required/>
                <label for={String(index)}> 
                  {forStringFun(entry.pricetype)} ({index === 0 ? ("₹"):index === 1? ("₹ ₹"):index === 2? ("₹ ₹ ₹"):null})  
                </label>
              </div> 
            )
          })}
        </div>

        <div className="input-submit input-control">
          <button type="button" className="previous" onClick={previousPage}>
            Back
          </button>
          <button className="btn-primary" type="submit">
            Next
            <svg>
              <use href={sprite + "#icon-arrow-right"}></use>
            </svg>
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
})(FormC);
