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
let PageSize = 10;

function StudioBookingDetail({ products, setProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const gotoShowDetails = (id) => {
    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);

    navigate(`/service/showBookingDetails?id=${id}`, {
      state: { productData: selectedProduct },
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

  const handleChange = async (productId, event) => {
    /// api
    try {
      const updateddata = products.map((prd) => {
        if (prd._id === productId) {
          prd.status = parseInt(event.target.value);
        }
        return prd;
      });
      const response = await bookingPageApi.updateStatus(
        productId,
        event.target.value
      );

      if (response.status) {
        // Assuming response.data is an array of updated products
        // setProducts(response.data);

        setProducts(updateddata);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }

    // console.log(updateddata);
  };
  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

  const getStatusColor = (status) => {
    status = parseInt(status);
    switch (status) {
      case 2:
        return "#FFDDDD";
      // case "Pending":
      //   return "#CAE2FF";
      case 1:
        return "#DDFFF3";
      case 0:
        return "#FFF3CA";
      default:
        return "";
    }
  };
  // const [updateColor, setUpdateColor] = useState(products?.status);
  // useEffect(() => {
  //   console.log(products?.status);
  //   getStatusColor(updateColor);
  // }, [updateColor]);

  // const getColor2 = () => {
  //   // Use the current state value directly, no need to call setUpdateColor
  //   const color = getStatusColor(updateColor);
  //   console.log(`the color is ${color}`);
  // };
  // getColor2();
  return (
    <>
      <div className={style.studioTabelDiv}>
        <div>
          <table>
            <thead className={style.studiotabelHead}>
              <tr>
                <th style={{ width: "15%" }}>Booking ID</th>
                <th>User Name</th>

                <th>studio Name</th>
                <th>No. of hours</th>
                <th>Date</th>
                <th>Time Slot Status</th>
                <th style={{ width: "20%" }}>Project Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((products) => {
                return (
                  <tr key={products._id}>
                    <td style={{ textAlign: "center" }}>#{products._id}</td>
                    <td>{products.userFullName}</td>

                    <td>{products.serviceFullName}</td>
                    <td>{products.planId}</td>
                    <td>{products.bookingDate}</td>
                    <td>₹{products.totalPrice}</td>
                    <td className={style.tableActionbtn}>
                      <div>
                        <select
                          value={
                            selectedStatus[products._id] || products.status
                          }
                          onChange={(e) => handleChange(products._id, e)}
                          style={{
                            backgroundColor: getStatusColor(products.status),
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
                            gotoShowDetails(products._id);
                          }}
                        />

                        <RiDeleteBin5Fill
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
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
