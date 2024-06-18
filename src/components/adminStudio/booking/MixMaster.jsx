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
let PageSize = 10;

function MixMaster({ products, setProducts, handleChange, getStatusColor }) {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

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
                currentTableData.map((products) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>#{products._id}</td>
                      <td>{products.userFullName}</td>

                      <td>{products.userPhone}</td>
                      <td>{products.serviceFullName}</td>
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
                          <GrShare
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

export default MixMaster;
