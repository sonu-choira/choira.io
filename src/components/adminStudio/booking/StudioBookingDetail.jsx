import React, { useEffect, useMemo, useState } from "react";
import style from "../../../pages/admin/studios/studio.module.css";

import { GrShare } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { IoIosArrowBack } from "react-icons/io";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";

import Button from "../../../pages/admin/layout/Button";
import Switch from "../../../pages/admin/layout/Switch";
import Pagination from "../../../pages/admin/studios/Pagination";
import { LuFilePlus } from "react-icons/lu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bookingPageApi from "../../../services/bookingPageApi";
import ChoiraLoder2 from "../../loader/ChoiraLoder2";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import moment from "moment";
let PageSize = 10;

function StudioBookingDetail({
  products,
  setProducts,
  handleChange,
  getStatusColor,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  // const gotoShowDetails = (id) => {
  //   const selectedProduct = products.find((product) => product._id === id);
  //   console.log("navigated=======>", selectedProduct);

  //   navigate(`/service/showBookingDetails?id=${id}`, {
  //     state: { productData: selectedProduct },
  //   });
  // };

  const gotoShowDetails = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);

    navigate(`/studio/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        navCount: 4,
        isEditMode: isEditMode,
        showMode: true,
      },
    });
  };
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  return (
    <>
      <div className={style.studioTabelDiv}>
        <div className={style.searchDiv}>
          <div className={style.puredisabled}>
            <p>Search by Date </p>
            <label htmlFor="selectDate">
              <IoCalendarOutline />
            </label>
            {/* <input type="date" id="selectDate" style={{ border: "none" }} /> */}
          </div>
          <div className={style.puredisabled}>
            <BiSearchAlt /> <br />
            <input
              type="text"
              placeholder="Search"
              className={style.puredisabled}
            />
          </div>
        </div>
        <div>
          <table>
            <thead className={style.studiotabelHead}>
              <tr>
                <th>User Name</th>
                <th>Mobile No.</th>

                <th>studio Name</th>
                <th>No. of hours</th>
                <th>Date</th>
                <th style={{ width: "10%" }}>Total Price </th>
                <th style={{ width: "10%" }}>Project Status</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <ChoiraLoder2 />
              ) : (
                currentTableData.map((products, i) => {
                  return (
                    <tr key={i}>
                      <td title={products.userName}>
                        {products?.userName?.substring(0, 20)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {products.userPhone}
                      </td>

                      <td title={products.studioName}>
                        {products?.studioName?.substring(0, 20)}
                      </td>
                      <td>{products.planId}</td>
                      <td>
                        {" "}
                        {moment(products.bookingDate).format("DD/MM/YYYY ")}
                      </td>
                      <td>₹{products.totalPrice}</td>
                      <td className={style.tableActionbtn}>
                        {/* <div>
                        <select
                          value={
                            selectedStatus[products._id] ||
                            products.bookingStatus
                          }
                          onChange={(e) => handleChange(products._id, e)}
                          style={{
                            backgroundColor: getStatusColor(
                              products.bookingStatus
                            ),
                          }}
                        >
                          <option value="" disabled>
                            Select Status
                          </option>
                          <option value={0}>Active</option>
                          
                          <option value={1}>Complete</option>
                          <option value={2}>Cancelled</option>
                        </select>
                      </div> */}
                        <div>
                          <GrShare
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              // gotoShowDetails(products._id);
                            }}
                          />{" "}
                          &nbsp;
                          <RiDeleteBin5Fill
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={style.tabelpaginationDiv}>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={products.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

export default StudioBookingDetail;
