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
import PaginationNav from "../../../pages/admin/layout/PaginationNav";
import ChoiraLoder2 from "../../loader/ChoiraLoder2";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import DateAndSearchFilter from "../../../pages/admin/layout/filterComponent/DateAndSearchFilter";
import moment from "moment";
import { errorAlert } from "../../../pages/admin/layout/Alert";
import appAndmoreApi from "../../../services/appAndmoreApi";

let PageSize = 10;

function ASMixandMaster({
  products,
  setProducts,
  setPageCount,
  pageCount,
  totalPage,
  bookingPageCount,
  setTotalPage,
  sendFilterDataToapi,
}) {
  let loading_timeout = null;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    sendFilterDataToapi = {};
    sendFilterDataToapi.serviceName = "";
    sendFilterDataToapi.serviceType = "";
  }, []);

  const navigate = useNavigate();

  const gotoEdit = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);

    navigate(`/service/musicProduction/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        isEditMode: isEditMode,
        bookingPageCount: "c3",
      },
    });
  };

  const gotoShowMixAndMaster = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);

    navigate(`/service/musicProduction/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        navCount: 3,
        isEditMode: isEditMode,
        bookingPageCount: "c3",
        showMode: true,
      },
    });
  };
  const [activityStatus, setActivityStatus] = useState({});
  const [showloader, setShowloader] = useState(false);
  const [pid, setPid] = useState(0);
  const handleSwitchChange = (studioId, isActive) => {
    isActive == 1 ? (isActive = 0) : (isActive = 1);
    setShowloader(true);
    appAndmoreApi
      .updateServiceStatus(studioId, isActive)

      .then((response) => {
        console.log(
          "status response=======>",
          response.updatedService.isActive
        );
        setProducts((prevState) => {
          return prevState.map((product) => {
            if (product._id === studioId) {
              return {
                ...product,
                isActive: response.updatedService.isActive,
              };
            }
            return product;
          });
        });

        loading_timeout = setTimeout(() => {
          setShowloader(false);
        }, 700);
      })
      .catch((error) => {
        console.log("error=======>", error);
        errorAlert(error.message || "Something went wrong");
        setShowloader(false);
      });
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

  useEffect(() => {
    return () => {
      clearTimeout(loading_timeout);
    };
  }, []);

  return (
    <>
      <div className={style.studioTabelDiv}>
        <DateAndSearchFilter
          setProducts={setProducts}
          setTotalPage={setTotalPage}
          bookingPageCount={bookingPageCount}
          sendFilterDataToapi={sendFilterDataToapi}
        />
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
            <tbody className={style.tbody}>
              {products.length === 0 ? (
                <ChoiraLoder2 />
              ) : (
                products.map((product) => {
                  return (
                    <tr key={product._id}>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <div className={style.studioImage} style={{}}>
                          {product.servicePhotos ? (
                            <img
                              src={product.servicePhotos[0]}
                              alt=""
                              onError={(e) => {
                                e.target.src = imageNotFound;
                              }}
                            />
                          ) : (
                            <img src={imageNotFound} alt="" />
                          )}
                        </div>
                        &nbsp;&nbsp;{product.fullName}
                      </td>
                      <td>Starting from ₹{product.pricing?.["IN"]?.price}</td>
                      <td>
                        {product.totalPlans}
                        <br />
                        <small> {product.state}</small>
                      </td>
                      <td>
                        {moment(product.creationTimeStamp).format(
                          // "DD/MM/YYYY hh:mm:ss a"
                          "Do MMM  YY, hh:mm a "
                        )}
                      </td>

                      <td className={style.tableActionbtn}>
                        <div>
                          <Switch
                            isloading={pid === product._id && showloader}
                            status={product.isActive}
                            onClick={() => {
                              setPid(product._id);
                              handleSwitchChange(product._id, product.isActive);
                            }}
                          />
                        </div>
                        <div>
                          <GrShare
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              gotoShowMixAndMaster(product._id);
                            }}
                          />
                          <MdEdit
                            style={{ color: "#ffc701", cursor: "pointer" }}
                            onClick={() => {
                              gotoEdit(product._id);
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

export default ASMixandMaster;
