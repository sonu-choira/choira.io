import React, { useEffect, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import Button from "../../pages/admin/layout/Button";
import { FaDownload, FaRegEye } from "react-icons/fa";
import { RiDeleteBin5Fill, RiExpandUpDownLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import userApi from "../../services/userApi";
import imageNotFound from "../../assets/imagesNotFound.png";
import PaginationNav from "../../pages/admin/layout/PaginationNav";
import ChoiraLoder2 from "../loader/ChoiraLoder2";
import DateAndSearchFilter from "../../pages/admin/layout/filterComponent/DateAndSearchFilter";
import CheckboxFilter from "../../pages/admin/layout/filterComponent/CheckboxFilter";
import UserProfile from "./UserProfile";
import { errorAlert } from "../../pages/admin/layout/Alert";

const userAllFilterData = {
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
  const [filterNav, setFilterNav] = useState(false);
  const [shortBySrNo, setShortBySrNo] = useState(false);
  const [shortByUser, setShortByUser] = useState(false);
  const [shortByEmail, setShortByEmail] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [showstatusFilter, setShowstatusFilter] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userAllDetails, setUserAllDetails] = useState("");

  const status = ["active", "inactive"];

  useEffect(() => {
    setProducts([]);
    if (selectedStatus.length > 0) {
      const status =
        selectedStatus[0] === "active"
          ? 1
          : selectedStatus[0] === "inactive"
          ? 0
          : undefined;
      userAllFilterData.status = status;
    }
    userApi
      .getAllUser(pageCount, userAllFilterData)
      .then((response) => {
        if (response.users) {
          setProducts(response.users);
          setTotalPage(response.paginate.totalPages);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [pageCount, shortByUser, shortByEmail, selectedStatus]);

  const handleSortBySrNo = () => {
    setShortBySrNo((prev) => !prev);
    setShortByUser(false);
    setShortByEmail(false);
  };

  const handleSortByUser = () => {
    setShortBySrNo(false);
    setShortByUser((prev) => !prev);
    setShortByEmail(false);
  };

  const handleSortByEmail = () => {
    setShortBySrNo(false);
    setShortByUser(false);
    setShortByEmail((prev) => !prev);
  };

  const showUserDetails = (id) => {
    setShowUserProfile(true);
    userApi
      .getSpecificUser(id)
      .then((response) => {
        if (response.user) {
          setUserAllDetails(response.user);
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setShowUserProfile(false);
        errorAlert("Something went wrong");
      });
  };

  return (
    <>
      {showUserProfile ? (
        <UserProfile
          userAllDetails={userAllDetails}
          setShowUserProfile={setShowUserProfile}
          userid={userid}
        />
      ) : (
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
              setProducts={setProducts}
              setTotalPage={setTotalPage}
              pageCount={pageCount}
              setPageCount={setPageCount}
              userFiler={userFiler}
              setUserFilterText={setUserFilterText}
              userFilterText={userFilterText}
              userAllFilterData={userAllFilterData}
            />
            <div className={style.tableContainer}>
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
                          <RiExpandUpDownLine />
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
                          {showstatusFilter && (
                            <CheckboxFilter
                              data={status}
                              cusstyle={{ left: "-355%" }}
                              disabledsearch={true}
                              selectedData={selectedStatus}
                              setSelectedData={setSelectedStatus}
                              setProducts={setProducts}
                              setTotalPage={setTotalPage}
                              pageCount={pageCount}
                              setPageCount={setPageCount}
                              closeAllFilter={closeAllFilter}
                              userFiler={userFiler}
                              userAllFilterData={userAllFilterData}
                            />
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
                    products.map((product, index) => (
                      <tr key={product._id}>
                        <td style={{ textAlign: "center" }}>
                          {index + 1 + (pageCount - 1) * 10}
                        </td>
                        <td style={{ display: "flex", alignItems: "center" }}>
                          <div className={style.studioImage}>
                            <img
                              src={product.profileUrl || imageNotFound}
                              alt=""
                              onError={(e) => (e.target.src = imageNotFound)}
                            />
                          </div>
                          &nbsp;&nbsp;{product.fullName}
                        </td>
                        <td>{product.phone}</td>
                        <td>{product.email}</td>
                        <td>{product.creationTimeStamp}</td>
                        <td className={style.tableActionbtn}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <FaRegEye
                              style={{ cursor: "pointer" }}
                              onClick={() => showUserDetails(product._id)}
                            />
                            <RiDeleteBin5Fill
                              style={{ color: "red", cursor: "pointer" }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
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
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ShowAllUser;
