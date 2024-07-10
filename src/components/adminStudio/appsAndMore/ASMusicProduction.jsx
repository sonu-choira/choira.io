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
import appAndmoreApi from "../../../services/appAndmoreApi";
import { errorAlert } from "../../../pages/admin/layout/Alert";

let PageSize = 10;

function ASMusicProduction({
  products,
  setProducts,
  setPageCount,
  pageCount,
  totalPage,
  bookingPageCount,
  setTotalPage,
  sendFilterDataToapi,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  let loading_timeout = null;

  const gotoEdit = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);

    navigate(`/service/musicProduction/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        isEditMode: isEditMode,
        bookingPageCount: "c2",
        navCount: 3,
      },
    });
  };
  useEffect(() => {
    sendFilterDataToapi = {};
    sendFilterDataToapi.serviceName = "";
    sendFilterDataToapi.serviceType = "";
    // console.log(sendFilterDataToapi, "aaaaaaaaaaa");
  }, []);

  const gotoShowMusicProduction = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);

    navigate(`/service/musicProduction/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        navCount: 3,
        isEditMode: isEditMode,
        bookingPageCount: "c2",
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
  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return products.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage, products]);

  const [selectedStatus, setSelectedStatus] = useState({});

  const handleChange = (productId, event) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [productId]: event.target.value,
    }));
  };
  console.log("products...", products);
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
            <tbody>
              {products.length === 0 ? (
                <ChoiraLoder2 />
              ) : (
                products?.map((products) => {
                  return (
                    <tr key={products._id}>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <div className={style.studioImage}>
                          {products.servicePhotos ? (
                            <img
                              src={products.servicePhotos[0]}
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
                        {products?.packages?.length}
                        <br />
                        <small> {products.state}</small>
                      </td>
                      <td>
                        {" "}
                        {moment(products.creationTimeStamp).format(
                          // "DD/MM/YYYY hh:mm:ss a"
                          "Do MMM  YY, hh:mm a "
                        )}
                      </td>

                      <td className={style.tableActionbtn}>
                        <div>
                          <Switch
                            isloading={pid === products._id && showloader}
                            status={products.isActive}
                            onClick={() => {
                              setPid(products._id);
                              handleSwitchChange(
                                products._id,
                                products.isActive
                              );
                            }}
                          />
                        </div>
                        <div>
                          <GrShare
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              gotoShowMusicProduction(products._id);
                            }}
                          />
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

export default ASMusicProduction;
