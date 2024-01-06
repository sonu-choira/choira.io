import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
// import "./ProjectDelivery.css"; // Import your CSS file

const ProjectDelivery = ({ onNext, setUserProjectData }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDatesAndPrices, setSelectedDatesAndPrices] = useState([]);

  const [selectedPrice, setSelectedPrice] = useState(0);

  const calculateDeliveryDate = (days) => {
    const currentDate = new Date();
    const deliveryDate = new Date(
      currentDate.setDate(currentDate.getDate() + days)
    );

    // Format the date as "Month day, year"
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = deliveryDate.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const handleDateSelection = (days) => {
    const selectedDeliveryDate = calculateDeliveryDate(days);
    const price = days === 7 ? 0 : days === 6 ? 2500 : days === 5 ? 5000 : 0;

    setSelectedDate(selectedDeliveryDate);
    setSelectedPrice(price);
    setSelectedDatesAndPrices((prevDatesAndPrices) => [
      ...prevDatesAndPrices,
      { date: selectedDeliveryDate, price: price },
    ]);

    // alert(`Selected Date: ${selectedDeliveryDate}\nPrice: + ₹ ${price}`);
  };

  const handleContinue = () => {
    if (selectedDate != "") {
      setUserProjectData((prevData) => ({
        ...prevData,
        ProjectDeliveryDate: selectedDate,
        ExtraAmountToPay: `₹${selectedPrice}`,
      }));
      // alert(`Selected Date: ${selectedDate}\nPrice: + ₹ ${selectedPrice}`);
      onNext();
    } else {
      alert("Please select Delivery Date");
    }
  };

  return (
    <>
      <div className="project-div2">
        <div>
          <h2>When do you want your project delivered</h2>
        </div>
        <div className="project-delivery-main">
          {[7, 6, 5].map((days, index) => (
            <div key={index}>
              <div>
                {index === 0
                  ? `${days} day delivery (standard)`
                  : `${days} day delivery`}
              </div>
              <div>
                <h4>
                  {index === 0
                    ? "+ ₹ 0"
                    : index === 1
                    ? "+ ₹ 2,500"
                    : "+ ₹ 5,000"}
                </h4>
              </div>
              <div
                className={
                  selectedDate === calculateDeliveryDate(days)
                    ? "deliveryDateSelected"
                    : ""
                }
                onClick={() => handleDateSelection(days)}
              >
                <h3>{calculateDeliveryDate(days)}</h3>
              </div>
            </div>
          ))}
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

export default ProjectDelivery;
