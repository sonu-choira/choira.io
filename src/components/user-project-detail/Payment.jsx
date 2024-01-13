import React from "react";
import pay1 from "../../assets/img/pay1.svg";
import pay2 from "../../assets/img/pay2.svg";
import { FaRegCheckCircle } from "react-icons/fa";
import pig1 from "../../assets/img/dashboard_img/pig1.svg";
import pig2 from "../../assets/img/dashboard_img/pig2.svg";
import { FaCheck } from "react-icons/fa";
function Payment() {
  const PaymentStatus = ({ status, description, amount, isPaid }) => {
    return (
      <div className="choira_test_pay_status">
        <div>
          <div>
            <FaCheck />
          </div>
        </div>
        <div>
          <b>{status} :</b>
          <p>{description}</p>
        </div>
        <div>{`₹ ${amount}`}</div>
        <div style={{ backgroundColor: isPaid ? "" : "#ffc701" }}>
          {isPaid ? (
            <>
              Paid <img src={pig1} alt="" />
            </>
          ) : (
            <div style={{ backgroundColor: "#ffc701", color: "black" }}>
              Pay <img src={pig2} alt="" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const paymentData = [
    {
      status: "Advance Payment",
      description:
        "This is the initial stage where you create a new project and add the details such as project name, genre, and other project specifications.",
      amount: 5000,
      isPaid: true,
    },
    {
      status: "Payment After Review",
      description:
        "This is the stage where you create a new project and add the details such as project name, genre, and other project specifications.",
      amount: 10000,
      isPaid: true,
    },
    {
      status: "Final Payment",
      description:
        "This is the final stage where you create a new project and add the details such as project name, genre, and other project specifications.",
      amount: 10000,
      isPaid: false,
    },
  ];

  return (
    <>
      <div className="choira_test_payment">
        <div className="ctp_main">
          <div>
            <div className="price_section">
              <div>
                <div>
                  <div>Total Price</div>
                  <div>₹25,00</div>
                </div>
                <div>
                  <div>
                    <div>. Paid</div>
                    <div>₹15,00</div>
                  </div>
                  <div>
                    <div>. Pending</div>
                    <div>₹10,00</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="payment_mode">
              <div>
                <div>
                  <img src={pay1} alt="" />
                </div>
                <div>
                  <p>**** **** **** 4563</p>
                  <h3>Choira bank</h3>
                </div>
                <div>
                  <input type="radio" name="a" />
                </div>
              </div>

              <div>
                <div>
                  <img src={pay2} alt="" />
                </div>
                <div>
                  <p>xyz@choira.io</p>
                  <h3>Paypal</h3>
                </div>
                <div>
                  <input type="radio" name="a" />
                </div>
              </div>
            </div>
          </div>
          <div className="paymentStatus">
            {/* {/second section} */}
            {paymentData.map((payment, index) => (
              <PaymentStatus key={index} {...payment} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
