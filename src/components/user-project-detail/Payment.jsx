import React from "react";
import pay1 from "../../assets/img/pay1.svg";
import pay2 from "../../assets/img/pay2.svg";
import { FaRegCheckCircle } from "react-icons/fa";
import pig1 from "../../assets/img/dashboard_img/pig1.svg";
import { FaCheck } from "react-icons/fa";
function Payment() {
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
          {/* {/second section} */}
          <div className="choira_test_pay_status">
            <div>
              <div>
                <FaCheck />
              </div>
            </div>
            <div>
              <b>Advance Payment :</b>

              <p>
                This is the initial stage where you create a new project and add
                the details such as project name, genre, and other project
                specifications.
              </p>
            </div>
            <div>₹ 5,000</div>
            <div>
              Paid <img src={pig1} alt="" />{" "}
            </div>
          </div>
          <div className="choira_test_pay_status">
            <div>
              <div>
                <FaCheck />
              </div>
            </div>
            <div>
              <b>Advance Payment :</b>

              <p>
                This is the initial stage where you create a new project and add
                the details such as project name, genre, and other project
                specifications.
              </p>
            </div>
            <div>₹ 5,000</div>
            <div>
              Paid <img src={pig1} alt="" />{" "}
            </div>
          </div>
          <div className="choira_test_pay_status">
            <div>
              <div>
                <FaCheck />
              </div>
            </div>
            <div>
              <b>Advance Payment :</b>

              <p>
                This is the initial stage where you create a new project and add
                the details such as project name, genre, and other project
                specifications.
              </p>
            </div>
            <div>₹ 5,000</div>
            <div style={{ backgroundColor: "#ffc701" }}>
              Pay <img src={pig1} alt="" />{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
