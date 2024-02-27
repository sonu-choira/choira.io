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
import imageNotFound from "../../../assets/imagesNotFound.png";

import { LuFilePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

let PageSize = 10;

function ASMixandMaster({ products, setProducts }) {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const gotoEdit = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);

    navigate(`/service/musicProduction/edit?id=${id}`, {
      state: { productData: selectedProduct, isEditMode: isEditMode },
    });
  };
  const [activityStatus, setActivityStatus] = useState({});
  const handleSwitchChange = (studioId) => {
    setActivityStatus((prevStatus) => ({
      ...prevStatus,
      [studioId]: !prevStatus[studioId], // Toggle the switch state
    }));
  };
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
                <th>Production</th>
                <th>Amount</th>

                <th>No. of services</th>
                <th>Created on</th>
                <th>Activity Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((products) => {
                return (
                  <tr key={products._id}>
                    <td style={{ display: "flex", alignItems: "center" }}>
                      <div className={style.studioImage}>
                        {products.studioPhotos ? (
                          <img
                            src={products.studioPhotos}
                            alt=""
                            onError={(e) => {
                              e.target.src = imageNotFound;
                            }}
                          />
                        ) : (
                          <img src={imageNotFound} alt="" />
                        )}
                      </div>
                      &nbsp;&nbsp;{products.fullName}
                    </td>
                    <td>Starting from ₹{products.price}</td>
                    <td>
                      {products.address}
                      <br />
                      <small> {products.state}</small>
                    </td>
                    <td>{products.creationTimeStamp}</td>

                    <td className={style.tableActionbtn}>
                      <div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={activityStatus[products._id] || false}
                            onChange={() => handleSwitchChange(products._id)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div>
                        <GrShare style={{ cursor: "pointer" }} />
                        <MdEdit
                          style={{ color: "#ffc701", cursor: "pointer" }}
                          onClick={() => {
                            gotoEdit(products._id);
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

export default ASMixandMaster;
