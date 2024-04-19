import React, { useEffect, useMemo, useState } from "react";
import style from "../../../pages/admin/studios/studio.module.css";

import { GrShare } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Button from "../../../pages/admin/layout/Button";

import { IoIosArrowBack } from "react-icons/io";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";

// import Button from "../../../pages/admin/layout/Button";
import Switch from "../../../pages/admin/layout/Switch";
import Pagination from "../../../pages/admin/studios/Pagination";
import { LuFilePlus } from "react-icons/lu";
import imageNotFound from "../../../assets/imagesNotFound.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaginationNav from "../../../pages/admin/layout/PaginationNav";
import ChoiraLoader from "../../loader/ChoiraLoader";
import ChoiraLoder2 from "../../loader/ChoiraLoder2";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { RiExpandUpDownLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { DatePicker, Space } from "antd";
import PriceFilter from "../../../pages/admin/layout/filterComponent/PriceFilter";
import CheckboxFilter from "../../../pages/admin/layout/filterComponent/CheckboxFilter";
import DateAndSearchFilter from "../../../pages/admin/layout/filterComponent/DateAndSearchFilter";

let PageSize = 10;

function AllStudioDetail2({
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

  useEffect(() => {
    sendFilterDataToapi.city = selectedCity[0];
    sendFilterDataToapi.roomCount = selectedRoom[0];
    sendFilterDataToapi.status = selectedStatus[0];

    console.log(sendFilterDataToapi);
  }, [selectedCity, selectedRoom, selectedStatus]);

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
        />
        <div>
          <table>
            <thead className={style.studiotabelHead}>
              <tr>
                <th>
                  <div className={style.headingContainer}>
                    Studio
                    <div className={style.filterBox}>
                      <RiExpandUpDownLine />
                    </div>
                  </div>
                </th>
                <th>
                  <div className={style.headingContainer}>
                    Price
                    <div className={style.filterBox}>
                      <span onClick={handelpriceFilter}>
                        <CiFilter />
                      </span>
                      {showpricefilter ? (
                        <PriceFilter closeAllFilter={closeAllFilter} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </th>

                <th>
                  <div className={style.headingContainer}>
                    Location
                    <div
                      className={style.filterBox}
                      style={{
                        backgroundColor:
                          selectedCity.length > 0 ? "#ffc70133" : "",
                      }}
                    >
                      <span onClick={handellocationFilter}>
                        <CiFilter />
                      </span>
                      {showloactionfilter ? (
                        <CheckboxFilter
                          data={city}
                          setSelectedData={setSelectedCity}
                          selectedData={selectedCity}
                          sendFilterDataToapi={sendFilterDataToapi}
                          setProducts={setProducts}
                          setTotalPage={setTotalPage}
                          bookingPageCount={bookingPageCount}
                          closeAllFilter={closeAllFilter}
                          setfilterNav={setfilterNav}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </th>
                <th>
                  <div className={style.headingContainer}>
                    No. of Rooms
                    <div
                      className={style.filterBox}
                      style={{
                        backgroundColor:
                          selectedRoom.length > 0 ? "#ffc70133" : "",
                      }}
                    >
                      <span onClick={handelRoomFilter}>
                        <CiFilter />
                      </span>
                      {showRoomFilter ? (
                        <CheckboxFilter
                          data={room}
                          selectedData={selectedRoom}
                          setSelectedData={setSelectedRoom}
                          sendFilterDataToapi={sendFilterDataToapi}
                          setProducts={setProducts}
                          setTotalPage={setTotalPage}
                          bookingPageCount={bookingPageCount}
                          setfilterNav={setfilterNav}
                          closeAllFilter={closeAllFilter}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </th>
                <th>
                  <div className={style.headingContainer}>
                    Activity Status
                    <div className={style.filterBox}>
                      <span onClick={handelStatusFilter}>
                        <CiFilter />
                      </span>
                      {showstatusFilter ? (
                        <CheckboxFilter
                          data={status}
                          cusstyle={{ left: "-355%" }}
                          disabledsearch={true}
                          selectedData={selectedStatus}
                          setSelectedData={setSelectedStatus}
                          sendFilterDataToapi={sendFilterDataToapi}
                          setProducts={setProducts}
                          setTotalPage={setTotalPage}
                          bookingPageCount={bookingPageCount}
                          setfilterNav={setfilterNav}
                          closeAllFilter={closeAllFilter}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <ChoiraLoder2 />
              ) : (
                products.map((products) => {
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
                          {products.studioPhotos ? (
                            <img
                              src={products.studioPhotos[0]}
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
                      <td>
                        ₹{products.pricePerHour}
                        <br />
                        <small>per hour</small>
                      </td>
                      <td>
                        {products.address}
                        <br />
                        <small> {products.state}</small>
                      </td>
                      <td>{products.totalRooms}</td>
                      <td className={style.tableActionbtn}>
                        <div>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={
                                products.isActive === 1
                                // ? activityStatus[products._id]
                                // : false
                              }
                              onChange={() =>
                                handleSwitchChange(
                                  products._id,
                                  products.isActive
                                )
                              }
                            />
                            <span className="slider"></span>
                          </label>
                        </div>
                        <div>
                          <GrShare
                            style={{ cursor: "pointer" }}
                            onClick={() => gotoShowStudioDetaisl(products._id)}
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

export default AllStudioDetail2;
