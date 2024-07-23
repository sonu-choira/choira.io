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
import ChoiraLoder2 from "../../loader/ChoiraLoder2";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { GoEye } from "react-icons/go";
import PaginationNav from "../../../pages/admin/layout/PaginationNav";
import CopyToClipboard from "../../../pages/admin/layout/CopyToClipboard ";
// import moment from "moment";
let PageSize = 10;

function MusicProduction({
  products,
  setProducts,
  handleChange,
  getStatusColor,
  bookingPageCount,
  totalPage,
  pageCount,
  setPageCount,
  setTotalPage,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return products.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage, products]);

  const [selectedStatus, setSelectedStatus] = useState({});

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
              disabled
              readOnly
            />
          </div>
        </div>
        <div>
          <table>
            <thead className={style.studiotabelHead}>
              <tr>
                <th style={{ width: "15%" }}>Booking ID</th>
                <th>User Name</th>

                <th> Mobile No.</th>
                {/* <th>Date</th> */}
                <th>Production Name.</th>
                <th>Amount</th>
                <th>Project Status</th>
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
                products.map((prod, i) => {
                  return (
                    <tr key={i}>
                      <td title={prod._id} style={{ textAlign: "center" }}>
                        #{prod._id.slice(-5)}
                      </td>
                      <td title={prod.userFullName}>
                        <CopyToClipboard textToCopy={prod?.userFullName} />
                      </td>

                      <td title={prod.userPhone}>
                        <CopyToClipboard textToCopy={prod?.userPhone} />
                      </td>
                      {/* <td>
                        { moment(prod.bookingDate).format(
                            "Do MMM  YY, hh:mm a "
                          )}
                      </td> */}
                      <td title={prod.serviceFullName}>
                        <CopyToClipboard
                          textToCopy={prod?.serviceFullName}
                        />
                      </td>
                      <td>₹{prod.totalPrice}</td>
                      <td className={style.tableActionbtn}>
                        <div>
                          <select
                            value={
                              selectedStatus[prod._id] ||
                              prod.bookingStatus
                            }
                            onChange={(e) => handleChange(prod._id, e)}
                            style={{
                              backgroundColor: getStatusColor(
                                prod.bookingStatus
                              ),
                            }}
                          >
                            <option value="" disabled>
                              Select Status
                            </option>
                            <option value={0}>Active</option>
                            {/* <option value="Pending">Pending</option> */}
                            <option value={1}>Complete</option>
                            <option value={2}>Cancelled</option>
                          </select>
                        </div>
                        <div style={{ width: "25%" }}>
                          <GoEye
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              // gotoShowDetails(prod._id);
                            }}
                          />

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
        <PaginationNav
          pageCount={pageCount}
          totalPage={totalPage}
          setPageCount={setPageCount}
          bookingPageCount={bookingPageCount}
        />
      </div>
    </>
  );
}

export default MusicProduction;
