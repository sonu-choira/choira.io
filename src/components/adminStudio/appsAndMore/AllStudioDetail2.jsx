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
import appAndmoreApi from "../../../services/appAndmoreApi";
import LoaderUpdating from "../../../pages/admin/layout/LoaderUpdating";
import { errorAlert } from "../../../pages/admin/layout/Alert";
import { GoEye } from "react-icons/go";

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
  let loading_timeout = null;
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

  // const [activityStatus, setActivityStatus] = useState({});
  const [showloader, setShowloader] = useState(false);
  const [pid, setPid] = useState(0);

  const handleSwitchChange = (studioId) => {
    setShowloader(true);
    appAndmoreApi
      .updateStudioStatus(studioId)
      .then((response) => {
        console.log("response=======>", response.studio);
        setProducts((prevState) => {
          return prevState.map((product) => {
            if (product._id === studioId) {
              return {
                ...product,
                isActive: response.studio.isActive,
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
  const [shortby, setShortby] = useState("creationTimeStamp:desc");
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  // var selectedDate = "";
  const [priceFilter, setPriceFilter] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const handelShortbyClick = () => {
    if (shortby == "creationTimeStamp:asc") {
      setShortby("creationTimeStamp:desc");
    } else {
      setShortby("creationTimeStamp:asc");
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

  useEffect(() => {
    setProducts([]);
    appAndmoreApi
      .filterData(sendFilterDataToapi)
      .then((response) => {
        console.log("filter applied:", response);
        setProducts(response.studios);
        setTotalPage(response.paginate.totalPages);
      })
      .catch((error) => {
        console.error("Error filter studio:", error);
      });

    return () => {
      setProducts([]);
    };
  }, [shortby]);

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
                <th>
                  <div className={style.headingContainer}>
                    Studio
                    <div
                      className={style.filterBox}
                      onClick={handelShortbyClick}
                      style={{
                        backgroundColor:
                          shortby !== "creationTimeStamp:desc"
                            ? "#ffc70133"
                            : "",
                      }}
                    >
                      <RiExpandUpDownLine />
                    </div>
                  </div>
                </th>
                <th>
                  <div className={style.headingContainer}>
                    Price
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
                        <CiFilter />
                      </span>
                      {showpricefilter ? (
                        <PriceFilter
                          closeAllFilter={closeAllFilter}
                          priceFilter={priceFilter}
                          setPriceFilter={setPriceFilter}
                          sendFilterDataToapi={sendFilterDataToapi}
                          setProducts={setProducts}
                          setTotalPage={setTotalPage}
                          bookingPageCount={bookingPageCount}
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
                    <div
                      className={style.filterBox}
                      style={{
                        backgroundColor:
                          selectedStatus.length > 0 ? "#ffc70133" : "",
                      }}
                    >
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
              {products?.length === 0 ? (
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
                        title={products.fullName}
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
                        &nbsp;&nbsp;{products.fullName.substring(0, 20)}...
                      </td>
                      <td style={{ padding: "0px 8rem 0px 0px" }}>
                        ₹{products?.roomsDetails?.[0]?.pricePerHour || "N/A"}
                        <br />
                        <small>per hour</small>
                      </td>
                      <td title={products.address}>
                        {products?.address?.substring(0, 30)}...
                        <br />
                        <small> {products.state}</small>
                      </td>
                      <td>{products.totalRooms}</td>
                      <td className={style.tableActionbtn}>
                        <div>
                          <Switch
                            isloading={pid === products._id && showloader}
                            status={products.isActive}
                            onClick={() => {
                              setPid(products._id);
                              handleSwitchChange(products._id);
                            }}
                          />
                        </div>
                        <div>
                          <GoEye
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
