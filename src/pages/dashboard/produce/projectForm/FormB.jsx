import React from "react";
import { Field, reduxForm } from "redux-form";
import sprite from "../../../../assets/icons/sprite.svg";


const FormB = (props) => {
  const { handleSubmit, previousPage, closeModel } = props;

  const [youtubeLink, setYoutubeLink] = React.useState([])
  const [inputLink, setInputLink] = React.useState("")
  const [inputefile, setInputefile] = React.useState("")

  const addYoutubeLink = entry => {
    if (entry.key === "Enter") {
      entry.preventDefault();
      setYoutubeLink(priv => {
        return [
          ...priv,
          inputLink
        ]
      })

    }
  }

  const handleChangeLink = event => {
    console.log(event.target.value)
    setInputLink(event.target.value)
  }

  const handleChange = (event, input) => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        input.onChange(imageFile);
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
      setInputefile(imageFile.name)
      props.getFile(imageFile)
    }
  };

  const trimText = entry => {
    return entry.substring(0, 30)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="popup__header">
        <h3>Tell us more about your Project</h3>
        <div onClick={() => closeModel()}><i class="fal fa-times"></i></div>

        <div className="popup__steps">
          <ul>
            <li className="step-active">1</li>
            <li className="step-active">2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
      </div>

      <div className="popup__content">
        <div className="input-group stableLocation">
          <Field
            type="text"
            name="link_share"
            id="link_share"
            component="input"
            placeholder="Share links of similar tracks for inspirations (Optional)"
            onKeyDown={addYoutubeLink}
            onChange={handleChangeLink}
          />
          {youtubeLink.map(entry => {
            return (
              <span className="input-link">
                {trimText(entry)}...{" "}
                <button>
                  <svg>
                    <use href={sprite + "#icon-cross"}></use>
                  </svg>
                </button>
              </span>
            )
          })}

          <label>Reference links</label>
        </div>


        <div className="input-group">
          {/* <Field
            type="text"
            name="file_add"
            component="input"
            placeholder="Attach a demo file (Optional)"
          /> */}

          <Field name={inputefile} type="file" component="input" id="file"
            onChange={handleChange} />
          <label for="file" className="file-input">
            Attach
            <svg>
              <use href={sprite + "#icon-attach"}></use>
            </svg>
          </label>
          <label>Audio/Video file {"(Optional)"} : {inputefile.substr(0,15)}{inputefile.length > 15 ? "...":null}</label>
        </div>

        <div className="input-group">
          <Field
            type="text"
            name="additional"
            component="textarea"
            placeholder=""
            // required="required"
          />
          <label>Any additional details about the project</label>
        </div>

        <div className="input-submit input-control">
          <button type="button" className="previous" onClick={previousPage}>Back</button>
          <div className="input-submit">
            <button className="btn-primary" type="submit">
              Next
              <svg>
                <use href={sprite + "#icon-arrow-right"}></use>
              </svg>
            </button>
          </div>
        </div>
        <br /><br />
      </div>
    </form>
  );
};

export default reduxForm({
  form: "projectForm", //Form name is same
})(FormB);
