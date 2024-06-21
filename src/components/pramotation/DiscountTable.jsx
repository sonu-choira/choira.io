import React from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import ChoiraLoder2 from "../loader/ChoiraLoder2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GrShare } from "react-icons/gr";
import { FaPencilAlt, FaRegEye } from "react-icons/fa";

function DiscountTable() {
  const currentTableData = [
    {
      sNo: 1,
      discountName: "New User Discount",
      discountType: "User Discount - First",
      percentage: "40%",
      maxAmount: "₹200.00",
    },
    {
      sNo: 2,
      discountName: "Discount Recurring",
      discountType: "User Discount - Recurring",
      percentage: "10%",
      maxAmount: "₹40.00",
    },
    {
      sNo: 3,
      discountName: "Event Offer",
      discountType: "Event Based",
      percentage: "50%",
      maxAmount: "₹50.00",
    },
    {
      sNo: 4,
      discountName: "Special Session",
      discountType: "Specific User",
      percentage: "60%",
      maxAmount: "₹40.00",
    },
  ];

  return (
    <>
      <div
        className={style.studioTabelDiv}
        style={{ width: "100%", height: "100%" }}
      >
        <div style={{ display: "none" }}></div>
        <div style={{ width: "98%", height: "100%" }}>
          <table>
            <thead
              className={style.studiotabelHead}
              style={{ borderRadius: "100px" }}
            >
              <tr>
                <th style={{ width: "10%" }}>S.No.</th>
                <th>Discount Name</th>
                <th>Discount Type</th>
                <th>Percentage</th>
                <th>Max. Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.length === 0 ? (
                <ChoiraLoder2 />
              ) : (
                currentTableData.map((discount, i) => (
                  <tr key={i}>
                    <td>{discount.sNo}</td>
                    <td>{discount.discountName}</td>
                    <td>{discount.discountType}</td>
                    <td>{discount.percentage}</td>
                    <td>{discount.maxAmount}</td>
                    <td className={style.tableActionbtn}>
                      <div>
                        <FaRegEye
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            // Add your share logic here
                          }}
                        />{" "}
                        &nbsp; &nbsp;
                        <FaPencilAlt
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            // Add your delete logic here
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DiscountTable;
