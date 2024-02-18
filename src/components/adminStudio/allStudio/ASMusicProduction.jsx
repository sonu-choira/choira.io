import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
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

let PageSize = 10;

function ASMusicProduction({ products, setProducts }) {
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   axios
  //     .get("https://test.api.choira.io/api/services", {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: "Bearer debugTest",
  //         "Content-Type": "application/json",
  //       },
  //       params: {
  //         limit: 61,
  //         serviceType: "c2",
  //         active: 1,
  //       },
  //       // body: {},
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       const data = response;
  //       if (data && data.data.services.results) {
  //         setProducts(data.data.services.results);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  // useEffect(() => {
  //   // fetchProducts();
  // }, []);

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  const [selectedStatus, setSelectedStatus] = useState({});

  const handleChange = (productId, event) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [productId]: event.target.value,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Cancelled":
        return "#FFDDDD";
      case "Pending":
        return "#CAE2FF";
      case "Complete":
        return "#DDFFF3";
      case "Active":
        return "#FFF3CA";
      default:
        return "";
    }
  };

  return (
    <>
      <div className={style.studioTabelDiv}>
        <div>
          <table>
            <thead className={style.studiotabelHead}>
              <tr>
                <th style={{ width: "15%" }}>Booking ID</th>
                <th>User AS Name</th>

                <th> Mobile No.</th>
                <th>Production Name</th>
                <th>Amount</th>
                <th>Project Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((products) => {
                return (
                  <tr key={products._id}>
                    <td style={{ textAlign: "center" }}>#{products._id}</td>
                    <td>{products.fullName}</td>

                    <td>{products.category}</td>
                    <td>{products.discountPercentage}</td>
                    <td>₹{products.price}</td>
                    <td className={style.tableActionbtn}>
                      <div>
                        <select
                          value={selectedStatus[products._id] || ""}
                          onChange={(e) => handleChange(products._id, e)}
                          style={{
                            backgroundColor: getStatusColor(
                              selectedStatus[products._id]
                            ),
                          }}
                        >
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Complete">Complete</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div style={{ width: "25%" }}>
                        <GrShare style={{ cursor: "pointer" }} />

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

export default ASMusicProduction;
