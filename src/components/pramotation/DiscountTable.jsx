import React, { useEffect, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import ChoiraLoder2 from "../loader/ChoiraLoder2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GrShare } from "react-icons/gr";
import { FaPencilAlt, FaRegEye } from "react-icons/fa";
import promotionApi from "../../services/promotionApi";
import CopyToClipboard from "../../pages/admin/layout/CopyToClipboard ";

function DiscountTable({ editData, setEditData }) {
  const [products, setProducts] = useState("");
  const currentTableData = [
    {
      sNo: 1,
      discountName: "New User Discount",
      discountType: "User Discount - First",
      discountPercentage: "40%",
      maxCapAmount: "₹200.00",
      couponCode: "CM40",
      details: "new user discount",
    },
    {
      sNo: 2,
      discountName: "Discount Recurring",
      discountType: "User Discount - Recurring",
      discountPercentage: "10%",
      maxCapAmount: "₹40.00",
      couponCode: "CM40",
      details: "new user discount",
    },
    {
      sNo: 3,
      discountName: "Event Offer",
      discountType: "Event Based",
      discountPercentage: "50%",
      maxCapAmount: "₹50.00",
      couponCode: "CM40",
      details: "new user discount",
    },
    {
      sNo: 4,
      discountName: "Special Session",
      discountType: "Specific User",
      discountPercentage: "60%",
      maxCapAmount: "₹40.00",
      couponCode: "CM40",
      details: "new user discount",
    },
  ];
  const gotoEditPage = (id) => {
    console.log(id);
    setEditData(products.filter((item) => item._id === id)[0]);
  };
  useEffect(() => {
    promotionApi.getAllDiscount().then((res) => {
      console.log(res.discounts);
      setProducts(res.discounts);
    });
  }, []);
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
                <th>discountPercentage</th>
                <th>Max. Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td>
                    <ChoiraLoder2 />
                  </td>
                </tr>
              ) : (
                products.map((discount, i) => (
                  <tr key={i}>
                    <td> {i + 1}</td>
                    {/* <td title={discount.discountName}>
                      <CopyToClipboard textToCopy={discount?.discountName} />
                    </td> */}
                    <td title={discount.discountName}>
                      {/* <CopyToClipboard textToCopy={discount?.discountName} /> */}
                      {discount.discountName}
                    </td>
                    <td>{discount.discountType}</td>
                    <td>{discount.discountPercentage}</td>
                    <td>{discount.maxCapAmount}</td>
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
                            gotoEditPage(discount._id);
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
