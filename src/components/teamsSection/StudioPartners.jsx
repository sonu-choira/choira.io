import React, { useEffect, useMemo, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";

import { GrShare } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Button from "../../pages/admin/layout/Button";
import userNotFound from "../../assets/img/userNotFound.jpg";

import { IoIosArrowBack } from "react-icons/io";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";

// import Button from "../../pages/admin/layout/Button";
import Switch from "../../pages/admin/layout/Switch";
import Pagination from "../../pages/admin/studios/Pagination";
import { LuFilePlus } from "react-icons/lu";
import imageNotFound from "../../assets/imagesNotFound.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaginationNav from "../../pages/admin/layout/PaginationNav";
import ChoiraLoader from "../loader/ChoiraLoader";
import ChoiraLoder2 from "../loader/ChoiraLoder2";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { RiExpandUpDownLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { DatePicker, Space } from "antd";
import PriceFilter from "../../pages/admin/layout/filterComponent/PriceFilter";
import CheckboxFilter from "../../pages/admin/layout/filterComponent/CheckboxFilter";
import DateAndSearchFilter from "../../pages/admin/layout/filterComponent/DateAndSearchFilter";
import appAndmoreApi from "../../services/appAndmoreApi";
import moment from "moment";
import { GoEye } from "react-icons/go";
import CopyToClipboard from "../../pages/admin/layout/CopyToClipboard ";

let PageSize = 10;

function StudioPartners({
  products,
  setProducts,
  setPageCount,
  pageCount,
  totalPage,
  bookingPageCount,
  setTotalPage,
  filterNav,
  setfilterNav,
  sendFilterDataToapi,
  teamsPageCount,
  shortby,
  setShortby,
  perPage,
  totalResult,
}) {
  const navigate = useNavigate();
  const gotoEdit = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);

    navigate(`/adminDashboard/Teams/AddStudioPatner?id=${id}`, {
      state: {
        productData: selectedProduct,
        navCount: 3,
        isEditMode: isEditMode,
      },
    });
  };
  const [shortBySrNo, setShortBySrNo] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  // const gotoShowStudioDetaisl = (id) => {
  //   const isEditMode = true;
  //   const selectedProduct = products.find((product) => product._id === id);
  //   console.log("navigated=======>", selectedProduct);

  //   navigate(`/studio/edit?id=${id}`, {
  //     state: {
  //       productData: selectedProduct,
  //       navCount: 3,
  //       isEditMode: isEditMode,
  //       showMode: true,
  //     },
  //   });
  // };

  const [activityStatus, setActivityStatus] = useState({});
  const handleSwitchChange = (studioId, status) => {
    console.log(status);
    setActivityStatus((prevStatus) => ({
      ...prevStatus,
      [studioId]: !prevStatus[studioId], // Toggle the switch state
    }));
  };
  const [showpricefilter, setshowpricefilter] = useState(false);
  const handelpriceFilter = () => {
    setshowpricefilter((prevState) => {
      if (!prevState) {
        // If toggling to true, set other filters to false
        setshowloactionfilter(false);
        setShowRoomFilter(false);
        setShowstatusFilter(false);
      }
      return !prevState;
    });
  };
  const closeAllFilter = () => {
    setshowloactionfilter(false);
    setShowRoomFilter(false);
    setShowstatusFilter(false);
    setshowpricefilter(false);
  };

  const [showloactionfilter, setshowloactionfilter] = useState(false);
  const handellocationFilter = () => {
    setshowloactionfilter((prevState) => {
      if (!prevState) {
        // If toggling to true, set other filters to false
        setshowpricefilter(false);
        setShowRoomFilter(false);
        setShowstatusFilter(false);
      }
      return !prevState;
    });
  };

  const [showRoomFilter, setShowRoomFilter] = useState(false);
  const handelRoomFilter = () => {
    setShowRoomFilter((prevState) => {
      if (!prevState) {
        // If toggling to true, set other filters to false
        setshowpricefilter(false);
        setshowloactionfilter(false);
        setShowstatusFilter(false);
      }
      return !prevState;
    });
  };

  const [showstatusFilter, setShowstatusFilter] = useState(false);
  const handelStatusFilter = () => {
    setShowstatusFilter((prevState) => {
      if (!prevState) {
        // If toggling to true, set other filters to false
        setshowpricefilter(false);
        setshowloactionfilter(false);
        setShowRoomFilter(false);
      }
      return !prevState;
    });
  };

  const city = ["Mumbai", "Delhi", "Bangalore", "Chennai"];
  const room = ["1", "2", "3", "4", "5"];
  const status = ["active", "inactive"];

  const [selectedCity, setSelectedCity] = useState([]);

  const [selectedRoom, setSelectedRoom] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  // var selectedDate = "";
  const [priceFilter, setPriceFilter] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const handelShortbyClick = () => {
    if (shortby == "desc") {
      setShortby("asc");
    } else {
      setShortby("desc");
    }
  };

  useEffect(() => {
    sendFilterDataToapi.city = selectedCity[0];
    sendFilterDataToapi.totalRooms = selectedRoom[0];
    sendFilterDataToapi.active =
      selectedStatus[0] === "active"
        ? 1
        : selectedStatus[0] === "inactive"
        ? "0"
        : "";
    sendFilterDataToapi.minPricePerHour = priceFilter.minPrice;
    sendFilterDataToapi.maxPricePerHour = priceFilter.maxPrice;
    // sendFilterDataToapi.creationTimeStamp = selectedDate;
    sendFilterDataToapi.sortBy = shortby;

    console.log(sendFilterDataToapi);
  }, [
    selectedCity,
    selectedRoom,
    selectedStatus,
    priceFilter,
    // selectedDate,
    shortby,
  ]);

  // useEffect(() => {
  //   setProducts([]);
  //   appAndmoreApi
  //     .filterData(sendFilterDataToapi)
  //     .then((response) => {
  //       console.log("filter applied:", response);
  //       setProducts(response.studios);
  //       setTotalPage(response.paginate.totalPages);
  //     })
  //     .catch((error) => {
  //       console.error("Error filter studio:", error);
  //     });
  // }, [shortby]);

  return (
    <>
      <div className={style.studioTabelDiv}>
        <DateAndSearchFilter
          setProducts={setProducts}
          setTotalPage={setTotalPage}
          bookingPageCount={bookingPageCount}
          filterNav={filterNav}
          setfilterNav={setfilterNav}
          sendFilterDataToapi={sendFilterDataToapi}
          setSelectedCity={setSelectedCity}
          setSelectedRoom={setSelectedRoom}
          setSelectedStatus={setSelectedStatus}
          setPriceFilter={setPriceFilter}
          setShortby={setShortby}
          dateDisable={true}
          searchDisable={true}
        />
        <div>
          <table>
            <thead className={style.studiotabelHead}>
              <tr>
                <th style={{ width: "10%" }}>
                  <div className={style.headingContainer}>
                    S.No.
                    <div
                      className={style.filterBox}
                      onClick={handelShortbyClick}
                      style={{
                        backgroundColor: shortby !== "asc" ? "#ffc70133" : "",
                      }}
                    >
                      <RiExpandUpDownLine />
                    </div>
                  </div>
                </th>
                <th>
                  <div className={style.headingContainer}>
                    Partner Name
                    <div
                      className={style.filterBox}
                      style={{
                        backgroundColor:
                          priceFilter.minPrice || priceFilter.maxPrice !== ""
                            ? "#ffc70133"
                            : "",
                      }}
                    >
                      <span onClick={handelpriceFilter}>
                        {/* <CiFilter /> */}
                      </span>
                      {showpricefilter
                        ? // <PriceFilter
                          //   closeAllFilter={closeAllFilter}
                          //   priceFilter={priceFilter}
                          //   setPriceFilter={setPriceFilter}
                          //   sendFilterDataToapi={sendFilterDataToapi}
                          //   setProducts={setProducts}
                          //   setTotalPage={setTotalPage}
                          //   bookingPageCount={bookingPageCount}
                          //   setfilterNav={setfilterNav}
                          // />
                          ""
                        : ""}
                    </div>
                  </div>
                </th>

                <th style={{ width: "20%" }}>
                  <div className={style.headingContainer}>
                    Email
                    <div
                      className={style.filterBox}
                      style={{
                        backgroundColor:
                          selectedCity.length > 0 ? "#ffc70133" : "",
                      }}
                    >
                      <span onClick={handellocationFilter}>
                        {/* <CiFilter /> */}
                      </span>
                      {showloactionfilter
                        ? // <CheckboxFilter
                          //   data={city}
                          //   setSelectedData={setSelectedCity}
                          //   selectedData={selectedCity}
                          //   sendFilterDataToapi={sendFilterDataToapi}
                          //   setProducts={setProducts}
                          //   setTotalPage={setTotalPage}
                          //   bookingPageCount={bookingPageCount}
                          //   closeAllFilter={closeAllFilter}
                          //   setfilterNav={setfilterNav}
                          // />
                          ""
                        : ""}
                    </div>
                  </div>
                </th>
                <th style={{ width: "20%" }}>
                  <div className={style.headingContainer}>
                    Studio Name
                    <div
                      className={style.filterBox}
                      style={{
                        backgroundColor:
                          selectedRoom.length > 0 ? "#ffc70133" : "",
                      }}
                    >
                      <span onClick={handelRoomFilter}>
                        {/* <CiFilter /> */}
                      </span>
                      {showRoomFilter
                        ? // <CheckboxFilter
                          //   data={room}
                          //   selectedData={selectedRoom}
                          //   setSelectedData={setSelectedRoom}
                          //   sendFilterDataToapi={sendFilterDataToapi}
                          //   setProducts={setProducts}
                          //   setTotalPage={setTotalPage}
                          //   bookingPageCount={bookingPageCount}
                          //   setfilterNav={setfilterNav}
                          //   closeAllFilter={closeAllFilter}
                          ""
                        : // />
                          ""}
                    </div>
                  </div>
                </th>
                <th style={{ width: "15%" }}>
                  <div className={style.headingContainer}>
                    Date
                    <div
                      className={style.filterBox}
                      style={{
                        backgroundColor:
                          selectedRoom.length > 0 ? "#ffc70133" : "",
                      }}
                    >
                      <span onClick={handelRoomFilter}>
                        {/* <CiFilter /> */}
                      </span>
                      {showRoomFilter
                        ? // <CheckboxFilter
                          //   data={room}
                          //   selectedData={selectedRoom}
                          //   setSelectedData={setSelectedRoom}
                          //   sendFilterDataToapi={sendFilterDataToapi}
                          //   setProducts={setProducts}
                          //   setTotalPage={setTotalPage}
                          //   bookingPageCount={bookingPageCount}
                          //   setfilterNav={setfilterNav}
                          //   closeAllFilter={closeAllFilter}
                          // />
                          ""
                        : ""}
                    </div>
                  </div>
                </th>
                <th style={{ width: "12%" }}>
                  <div className={style.headingContainer}>
                    Activity Status
                    <div
                      className={style.filterBox}
                      style={{
                        backgroundColor:
                          selectedStatus.length > 0 ? "#ffc70133" : "",
                      }}
                    >
                      <span onClick={handelStatusFilter}>
                        {/* <CiFilter /> */}
                      </span>
                      {showstatusFilter
                        ? ""
                        : // <CheckboxFilter
                          //   data={status}
                          //   cusstyle={{ left: "-355%" }}
                          //   disabledsearch={true}
                          //   selectedData={selectedStatus}
                          //   setSelectedData={setSelectedStatus}
                          //   sendFilterDataToapi={sendFilterDataToapi}
                          //   setProducts={setProducts}
                          //   setTotalPage={setTotalPage}
                          //   bookingPageCount={bookingPageCount}
                          //   setfilterNav={setfilterNav}
                          //   closeAllFilter={closeAllFilter}
                          // />
                          ""}
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.length === 0 ? (
                <tr>
                  <td>
                    <ChoiraLoder2 />
                  </td>
                </tr>
              ) : (
                products?.map((products, index) => {
                  return (
                    <tr key={products._id}>
                      <td style={{ textAlign: "center" }}>
                        {shortby == "asc"
                          ? isNaN(
                              totalResult -
                                pageCount * perPage +
                                perPage -
                                index
                            )
                            ? "N/A"
                            : index + 1 + (pageCount - 1) * perPage
                          : isNaN(index + 1 + (pageCount - 1) * perPage)
                          ? "N/A"
                          : totalResult - pageCount * perPage + perPage - index}
                      </td>
                      <td
                        title={products.firstName}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div
                          className={
                            products.ownerImage === ""
                              ? `${style.studioImageNotFound}`
                              : `${style.studioImage} `
                          }
                        >
                          <img
                            src={products?.ownerImage || userNotFound}
                            alt=""
                            onError={(e) => (e.target.src = userNotFound)}
                          />
                        </div>
                        &nbsp;&nbsp;
                        <CopyToClipboard textToCopy={products.firstName} />
                      </td>
                      {/* <td>{products.firstName}</td> */}
                      <td title={products.email}>
                        <CopyToClipboard textToCopy={products.email} />
                      </td>
                      <td title={products.studioName}>
                        <CopyToClipboard textToCopy={products.studioName} />
                      </td>

                      <td>
                        {moment(products.creationTimeStamp).format(
                          // "DD/MM/YYYY hh:mm:ss a"
                          "Do MMM  YY, hh:mm a "
                        )}
                      </td>
                      <td className={style.tableActionbtn}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <GoEye
                            style={{ cursor: "pointer" }}
                            // onClick={() => gotoShowStudioDetaisl(products._id)}
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

export default StudioPartners;
