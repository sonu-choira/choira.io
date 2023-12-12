import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import song from "../../assets/img/chooseType-img/song.gif";
const GoodName = ({ onNext }) => {
  const handleContinue = () => {
    // Perform any necessary actions in this component
    // ...

    // Call the callback to trigger navigation to the next component
    onNext();
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
            <input type="text" placeholder="Enter Project name" />
          </div>
        </div>

        <div className="project-div2-btn">
          <button onClick={handleContinue}>
            Continue <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default GoodName;
