import React, { useEffect, useMemo, useState } from "react";

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

function MusicProduction() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

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
      <div className="studioTabelDiv">
        <div>
          <table>
            <thead className="studiotabelHead">
              <tr>
                <th style={{ width: "15%" }}>Booking ID</th>
                <th>User Name</th>

                <th> Mobile No.</th>
                <th>Production Name</th>
                <th>Amount</th>
                <th>Project Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((products) => {
                return (
                  <tr>
                    <td style={{ textAlign: "center" }}>#{products.id}</td>
                    <td>{products.title}</td>

                    <td>{products.category}</td>
                    <td>{products.discountPercentage}</td>
                    <td>{products.rating}</td>
                    <td className="tableActionbtn">
                      <div>
                        <select
                          value={selectedStatus[products.id] || ""}
                          onChange={(e) => handleChange(products.id, e)}
                          style={{
                            backgroundColor: getStatusColor(
                              selectedStatus[products.id]
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
      <div className="tabelpaginationDiv">
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

export default MusicProduction;
