import React, { useEffect, useState } from "react";
import StudioPatners from "../teamsSection/StudioPatners";
import TeamsActionBar from "../teamsSection/TeamActionBar";
import style from "../../pages/admin/studios/studio.module.css";
import Button from "../../pages/admin/layout/Button";
import { FaDownload } from "react-icons/fa6";
import teamsApi from "../../services/teamsApi";
import PaginationNav from "../../pages/admin/layout/PaginationNav";
import ChoiraLoder2 from "../loader/ChoiraLoder2";
import { CiFilter } from "react-icons/ci";
import DateAndSearchFilter from "../../pages/admin/layout/filterComponent/DateAndSearchFilter";
import { RiDeleteBin5Fill, RiExpandUpDownLine } from "react-icons/ri";
import { GrShare } from "react-icons/gr";
import userApi from "../../services/userApi";
import imageNotFound from "../../assets/imagesNotFound.png";
import { FaRegEye } from "react-icons/fa";
import CheckboxFilter from "../../pages/admin/layout/filterComponent/CheckboxFilter";
import UserProfile from "./UserProfile";

let userAllFilterData = {
  sortfield: "",
  status: "",
  searchUser: "",
  startDate: undefined,
  endDate: undefined,
};
function ShowAllUser() {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [filterNav, setfilterNav] = useState(false);
  const [shortby, setShortby] = useState(false);
  const status = ["active", "inactive"];

  const [shortBySrNo, setShortBySrNo] = useState(false);
  const [shortByUser, setShortByUser] = useState(false);
  const [shortByEmail, setShortByEmail] = useState(false);

  const handelStatusFilter = () => {
    setShowstatusFilter((prevState) => {
      if (!prevState) {
        // If toggling to true, set other filters to false

        setShowRoomFilter(false);
      }
      return !prevState;
    });
  };

  useEffect(() => {
    console.log(" -----");
    setProducts([]);

    // checking if filter has any data

    console.log(selectedStatus);
    if (selectedStatus[0]) {
      let status;
      if (selectedStatus[0] == "active") {
        status = 1;
        userAllFilterData.status = status;
      } else if (selectedStatus[0] == "inactive") {
        status = 0;
        userAllFilterData.status = status;
      } else {
        status = undefined;
        userAllFilterData.status = status;
      }
      userApi
        .getAllUser(pageCount, userAllFilterData)
        .then((response) => {
          console.log(`====================> response `, response);
          console.log("response.data.users", response.users);
          if (response.users) {
            setProducts(response.users);
            setTotalPage(response.paginate.totalPages);

            // setPageCount(response.paginate.page);
          }
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    } else {
      let dataTosend;

      if (shortByUser) {
        dataTosend = "fullName";
        userAllFilterData.sortfield = dataTosend;
      } else if (shortByEmail) {
        dataTosend = "email";
        userAllFilterData.sortfield = dataTosend;
      } else {
        dataTosend = "";
        userAllFilterData.sortfield = dataTosend;
      }
      userApi
        .getAllUser(pageCount, userAllFilterData)
        .then((response) => {
          console.log(`====================> response `, response);
          console.log("response.data.users", response.users);
          if (response.users) {
            setProducts(response.users);
            setTotalPage(response.paginate.totalPages);

            // setPageCount(response.paginate.page);
          }
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    }

    // const type =  ;

    console.log("inside useEffect");
  }, [pageCount, shortByUser, shortByEmail]);

  const [selectedCity, setSelectedCity] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [showstatusFilter, setShowstatusFilter] = useState(false);
  const closeAllFilter = () => {
    setShowstatusFilter(false);
  };

  // var selectedDate = "";
  const [priceFilter, setPriceFilter] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const [showRoomFilter, setShowRoomFilter] = useState(false);
  const [showCityFilter, setShowCityFilter] = useState(false);
  const userFiler = true;

  const handleSortBySrNo = () => {
    console.log("shortBySrNo", shortBySrNo);

    setShortBySrNo(!shortBySrNo);
    setShortByUser(false);
    setShortByEmail(false);
  };
  useEffect(() => {
    console.log("shortBySrNo", shortBySrNo);
    if (shortBySrNo) {
      setProducts((prev) => [...prev].reverse());
    }
  }, [shortBySrNo]);

  const handleSortByUser = () => {
    setShortBySrNo(false);
    setShortByUser(!shortByUser);
    setShortByEmail(false);
  };

  const handleSortByEmail = () => {
    setShortBySrNo(false);
    setShortByUser(false);
    setShortByEmail(!shortByEmail);
  };
  const [userFilterText, setUserFilterText] = useState("");
  const [showUserProfile, setShowUserProfile] = useState(false);

  return (
    <>
      {showUserProfile ? (
        <UserProfile />
      ) : (
        <>
          <div className={style.allStudioDetailsPage}>
            <div
              className={style.bookingStudiobtn}
              style={{ marginBottom: "2%" }}
            >
              <div>
                <div style={{ background: "none" }}>All User</div>
              </div>
              <div>
                <Button
                  name={"Export"}
                  icon={<FaDownload />}
                  style={{ height: "60%", gap: "5%" }}
                />
              </div>
            </div>

            <div className={style.studioTabelDiv}>
              <DateAndSearchFilter
                // setProducts={setProducts}
                // setTotalPage={setTotalPage}
                // bookingPageCount={bookingPageCount}
                // filterNav={filterNav}
                // setfilterNav={setfilterNav}
                // sendFilterDataToapi={sendFilterDataToapi}
                // setSelectedCity={setSelectedCity}
                // setSelectedRoom={setSelectedRoom}
                // setSelectedStatus={setSelectedStatus}
                // setPriceFilter={setPriceFilter}
                // setShortby={setShortby}
                // bookingPageCount={bookingPageCount}
                // setfilterNav={setfilterNav}
                setProducts={setProducts}
                setTotalPage={setTotalPage}
                pageCount={pageCount}
                setPageCount={setPageCount}
                userFiler={userFiler}
                setUserFilterText={setUserFilterText}
                userFilterText={userFilterText}
                userAllFilterData={userAllFilterData}
              />
              <div>
                <table>
                  <thead className={style.studiotabelHead}>
                    <tr>
                      <th style={{ width: "8%" }}>
                        <div className={style.headingContainer}>
                          S.No.
                          <div
                            className={style.filterBox}
                            onClick={handleSortBySrNo}
                            style={{
                              backgroundColor: shortBySrNo ? "#ffc70133" : "",
                            }}
                          >
                            <RiExpandUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th style={{ width: "20%" }}>
                        <div className={style.headingContainer}>
                          Users
                          <div
                            className={style.filterBox}
                            onClick={handleSortByUser}
                            style={{
                              backgroundColor: shortByUser ? "#ffc70133" : "",
                            }}
                          >
                            <span
                            //  onClick={handelpriceFilter}
                            >
                              <RiExpandUpDownLine />
                            </span>
                          </div>
                        </div>
                      </th>

                      <th style={{ width: "10%" }}>
                        <div className={style.headingContainer}>
                          Mobile
                          <div
                            className={style.filterBox}
                            style={{
                              visibility: "hidden",
                            }}
                          >
                            <span
                            //  onClick={handellocationFilter}
                            >
                              <RiExpandUpDownLine />
                            </span>
                          </div>
                        </div>
                      </th>
                      <th style={{ width: "20%" }}>
                        <div className={style.headingContainer}>
                          Email
                          <div
                            className={style.filterBox}
                            onClick={handleSortByEmail}
                            style={{
                              backgroundColor: shortByEmail ? "#ffc70133" : "",
                            }}
                          >
                            <span
                            // onClick={handelRoomFilter}
                            >
                              <RiExpandUpDownLine />
                            </span>
                          </div>
                        </div>
                      </th>
                      <th style={{ width: "10%" }}>
                        <div className={style.headingContainer}>
                          Created on
                          <div
                            className={style.filterBox}
                            style={{
                              visibility: "hidden",
                            }}
                          >
                            <span
                            // onClick={handelRoomFilter}
                            >
                              <CiFilter />
                            </span>
                          </div>
                        </div>
                      </th>
                      <th style={{ width: "10%" }}>
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
                                // sendFilterDataToapi={sendFilterDataToapi}
                                setProducts={setProducts}
                                setTotalPage={setTotalPage}
                                pageCount={pageCount}
                                setPageCount={setPageCount}
                                // bookingPageCount={bookingPageCount}
                                // setfilterNav={setfilterNav}
                                closeAllFilter={closeAllFilter}
                                userFiler={userFiler}
                                userAllFilterData={userAllFilterData}
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
                      products?.map((products, index) => {
                        return (
                          <tr key={products._id}>
                            <td
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                              }}
                            >
                              {index + 1 * (pageCount - 1) * 10 + 1}
                            </td>
                            <td
                              style={{
                                // border: "1px solid red",
                                height: "100%",
                                width: "20%",
                              }}
                            >
                              <td
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  // justifyContent: "space-around",
                                  height: "100%",
                                  width: "100%",
                                  // border: "1px solid #e6e6e6",
                                }}
                              >
                                <div className={style.studioImage}>
                                  {products.studioPhotos ? (
                                    <img
                                      src={products.profileUrl}
                                      alt=""
                                      onError={(e) => {
                                        e.target.src = imageNotFound;
                                      }}
                                    />
                                  ) : (
                                    <img src={imageNotFound} alt="" />
                                  )}
                                </div>
                                <br />
                                &nbsp;&nbsp;{products.fullName}
                              </td>
                            </td>

                            <td>{products.phone}</td>
                            <td>{products.email}</td>
                            <td>{products.creationTimeStamp}</td>
                            <td className={style.tableActionbtn}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <FaRegEye style={{ cursor: "pointer" }} />

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
                // bookingPageCount={bookingPageCount}
              />
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
}

export default ShowAllUser;
