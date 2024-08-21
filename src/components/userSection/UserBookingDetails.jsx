import React, { useEffect, useMemo, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";

import { GrShare } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Button from "../../pages/admin/layout/Button";

import { IoIosArrowBack } from "react-icons/io";
import {
  FaFilter,
  FaRegEye,
  FaShare,
  FaTableCellsLarge,
} from "react-icons/fa6";

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
import CopyToClipboard from "../../pages/admin/layout/CopyToClipboard ";

let PageSize = 10;

function UserBookingDetails({
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
}) {
  const navigate = useNavigate();
  const gotoEdit = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);

    navigate(`/studio/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        navCount: 3,
        isEditMode: isEditMode,
      },
    });
  };
  const [currentPage, setCurrentPage] = useState(1);
  const gotoShowStudioDetaisl = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);

    navigate(`/studio/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        navCount: 3,
        isEditMode: isEditMode,
        showMode: true,
      },
    });
  };

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
      <div
        className={style.studioTabelDiv}
        style={{ height: "90%", width: "100%" }}
      >
        <DateAndSearchFilter
          dateDisable={true}
          searchDisable={true}
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
        />
        <div>
          <table>
            <thead className={style.studiotabelHead}>
              <tr>
                <th style={{ width: "10%" }}>
                  <div className={style.headingContainer}>
                    Booking Id
                    {/* <div
                      className={style.filterBox}
                      onClick={handelShortbyClick}
                      style={{
                        backgroundColor: shortby !== "asc" ? "#ffc70133" : "",
                      }}
                    >
                      <RiExpandUpDownLine />
                    </div> */}
                  </div>
                </th>
                <th>
                  <div className={style.headingContainer}>
                    Studio Name
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

                <th style={{ width: "12%" }}>
                  <div className={style.headingContainer}>
                    No. of hours
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
                          ""
                        : // />
                          ""}
                    </div>
                  </div>
                </th>
                <th style={{ width: "10%" }}>
                  <div className={style.headingContainer}>
                    Time Slot
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
                    Project Status
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
                <th style={{ width: "10%" }}>
                  <div className={style.headingContainer}>
                    <div
                      className={style.filterBox}
                      style={{
                        backgroundColor:
                          selectedStatus.length > 0 ? "#ffc70133" : "",
                      }}
                    ></div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.length === 0 ? (
                <ChoiraLoder2 />
              ) : (
                products?.map((products, index) => {
                  return (
                    <tr key={products?._id} className={style.customUserTd}>
                      <td>
                        <span title={products._id}>
                          #{products._id?.substring(0, 6)}
                        </span>
                      </td>
                      <td title={products?.studioName}>
                        <CopyToClipboard textToCopy={products?.studioName} />
                      </td>
                      <td>{products?.no_of_hours} Hour</td>
                      <td>
                        {moment(products.bookingDate).format(
                          "Do MMM  YY, hh:mm a"
                        )}
                      </td>
                      <td>
                        {products?.bookingTime?.startTime}-
                        {products?.bookingTime?.endTime}
                      </td>
                      <td className={style.tableActionbtn}>
                        <div
                          className={style.userProjectStatus}
                          style={{
                            backgroundColor:
                              parseInt(products.bookingStatus) === 0
                                ? "#FFF3CA"
                                : parseInt(products.bookingStatus) == 1
                                ? "#DDFFF3"
                                : "#FFDDDD",
                          }}
                        >
                          {parseInt(products.bookingStatus) === 0
                            ? "Pending"
                            : parseInt(products.bookingStatus) == 1
                            ? "Complete"
                            : "Cancelled"}
                        </div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <FaRegEye />
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

export default UserBookingDetails;
