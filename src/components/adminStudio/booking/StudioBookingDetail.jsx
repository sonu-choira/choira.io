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

function StudioBookingDetail() {
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
      <div className="bookingStudiobtn">
        <div>
          <div>
            <div style={{ borderLeft: "none" }}>Studio</div>
            <div>Music Production</div>
            <div>Artist</div>
            <div style={{ borderRight: "none" }}>Mix-Master</div>
          </div>
        </div>
        <div>
          <Button
            name={"Card view"}
            icon={<FaTableCellsLarge />}
            style={{ height: "50%", width: "20%", gap: "5%" }}
          />
          <Button
            name={"Filter"}
            icon={<FaFilter />}
            style={{ height: "50%", width: "15%", gap: "5%" }}
          />
          <Button
            name={"Share"}
            icon={<FaShare />}
            style={{ height: "50%", width: "15%", gap: "5%" }}
          />
          <Button
            name={"Slot Booking"}
            icon={<LuFilePlus />}
            style={{ height: "50%", width: "28%", gap: "5%" }}
          />
        </div>
      </div>
      <div className="studioTabelDiv">
        <div>
          <table>
            <thead className="studiotabelHead">
              <tr>
                <th style={{ width: "15%" }}>Booking ID</th>
                <th>User Name</th>
                <th style={{ width: "15%" }}>Studio Name</th>
                <th>No. of Hour</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Project Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((products) => {
                return (
                  <tr>
                    <td style={{ textAlign: "center" }}>#{products.id}</td>
                    <td>{products.title}</td>
                    <td>
                      {products.category}
                      <br />
                      <small>Maharastra</small>
                    </td>
                    <td>{products.stock}</td>
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
                      <div>
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

export default StudioBookingDetail;
