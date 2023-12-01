import React from "react";
import { Field, reduxForm } from "redux-form";
import sprite from "../../../../assets/icons/sprite.svg";


const FormA = (props) => {
  const { handleSubmit, closeModel, additionalData, forStringFun } = props;
  // let genreData = additionalData()

  return (
    <form onSubmit={handleSubmit}>
      <div className="popup__header">
        <h3>Start your project in just 5 minutes</h3>
        <div onClick={() => closeModel()}><i class="fal fa-times"></i></div>

        <div className="popup__steps">
          <ul>
            <li className="step-active">1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
      </div>

      <div className="popup__content ">
        <div className="input-group ">
          <Field
            name="name"
            component="input"
            required="required"
            placeholder="Give good name for this project"
          />
          <label>Project name</label>
        </div>

        <div className="input-group ">
          <select
            name="song"
            id="option-select-1"
            required="required"
            defaultValue="ORIGINAL_SONG"
          >
            <option value="0" className="same" disabled>What type of project is this?</option>
            <option value="ORIGINAL_SONG" className="same">Original Song</option>
            <option value="COVER_SONG" className="same">Cover Song</option>
            <option value="BACKGROUND_MUSIC_OR_INSTUMENTAL" className="same">Background Music / Instrumental</option>
            <option value="AD_JINGLE_OR_MICROCONTENT_OR_REELS" className="same">Ad Jingle / Micro content / Reels</option>
            <option value="MIX_MASTER" className="same">Mix-Master</option>
          </select>
          <label className="label-select">Project type</label>
        </div>

        <div className="input-group">
          <select id="option-select-2" defaultValue="HIP_HOP" required="required" name="song_b" placeholder-text="What is the genre?">
            <option value="" disabled>What is the genre? </option>
            {/* <option value="HIP_HOP">HIP HOP</option>
            <option value="BOLLYWOOD">BOLLYWOOD</option>
            <option value="POP">POP</option>
            <option value="HIP_POP">HIP POP</option>
            <option value="BOLLYWOOD_POP">BOLLYWOOD POP</option>
            <option value="INDIE_POP">INDIE POP</option>
            <option value="ROCK">ROCK</option>
            <option value="SUFI">SUFI</option>
            <option value="LOFI">LOFI</option>
            <option value="COUNTRY">COUNTRY</option>
            <option value="EDM">EDM</option>
            <option value="INDIAN_CLASSICAL">INDIAN CLASSICAL</option> */}
            {additionalData.map((entry, index) => {
              return (
                <option value={entry.genre}>{forStringFun(entry.genre)}</option>
              )
            })}
          </select>
          <label className="label-select">Genre</label>
        </div>

        <div className="input-group">
          <select
            name="song_c"
            id="option-select-3"
            required="required"
            defaultValue="FULL_PRODUCTION_TEAM"
          >
            <option value="" disabled>What can we help you with?</option>
            <option value="FULL_PRODUCTION_TEAM">Full Production Team</option>
            <option value="MUSIC_PRODUCER">Music Producer</option>
            <option value="SINGER">Singer</option>
            <option value="SONG_WRITERS">Song Writers</option>
            <option value="MIX_MASTER">Mix-Master</option>
          </select>
          <label className="label-select">I need</label>
        </div>

        <div className="input-submit">
          <button className="btn-primary" type="submit">
            Next
            <svg>
              <use href={sprite + "#icon-arrow-right"}></use>
            </svg>
          </button>
        </div>
        <br /><br />
      </div>
      <div></div>
    </form>

  );
};

export default reduxForm({
  form: "projectForm", // <------ same form name
})(FormA);



