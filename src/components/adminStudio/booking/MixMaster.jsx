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
import ChoiraLoder2 from "../../loader/ChoiraLoder2";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { GoEye } from "react-icons/go";
import PaginationNav from "../../../pages/admin/layout/PaginationNav";
import CopyToClipboard from "../../../pages/admin/layout/CopyToClipboard ";
let PageSize = 10;

function MixMaster({
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

                <th style={{ width: "15%" }}> Mobile No.</th>
                <th>Production Name</th>
                <th>Amount</th>
                <th>Project Status</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <ChoiraLoder2 />
              ) : (
                products.map((products) => {
                  return (
                    <tr key={products.userPhone}>
                      <td style={{ textAlign: "center" }}>
                        #{products._id.slice(-5)}
                      </td>
                      <td title={products.userFullName}>
                        <CopyToClipboard textToCopy={products?.userFullName} />
                      </td>

                      <td title={products.userPhone}>
                        <CopyToClipboard textToCopy={products?.userPhone} />
                      </td>
                      <td title={products.serviceFullName}>
                        <CopyToClipboard
                          textToCopy={products?.serviceFullName}
                        />
                      </td>
                      <td style={{ textAlign: "start" }}>
                        Starting price from ₹{products.totalPrice} <br />
                      </td>
                      <td className={style.tableActionbtn}>
                        <div>
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
                            {/* <option value="Pending">Pending</option> */}
                            <option value={1}>Complete</option>
                            <option value={2}>Cancelled</option>
                          </select>
                        </div>
                        <div style={{ width: "25%" }}>
                          <GoEye
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              // gotoShowDetails(products._id);
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

export default MixMaster;
