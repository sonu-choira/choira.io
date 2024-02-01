import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import song from "../../assets/img/chooseType-img/song.gif";
const GoodName = ({ onNext, setUserProjectData, onBack }) => {
  const [goodName, setGoodName] = useState("");
  const handleContinue = () => {
    if (goodName != "") {
      setUserProjectData((prevData) => ({
        ...prevData,
        NameOFProject: goodName,
      }));
      // alert("project Name is " + goodName);
      onNext();
    } else {
      alert("Please give a Name to Your Project");
    }
  };
  const handelBack = () => {
    onBack();
  };
  return (
    <>
      <div className="project-div2">
        <div>
          <h2> Give a good name</h2>
        </div>
        <div className="goodName-div">
          <div className="goodName-singer">
            <img src={song} alt="" />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Project 
            name"
              value={goodName}
              onChange={(e) => {
                setGoodName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="project-div2-btn">
          <button onClick={handelBack}>
            <FaAngleLeft /> Back
          </button>
          <button onClick={handleContinue}>
            Continue <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default GoodName;
