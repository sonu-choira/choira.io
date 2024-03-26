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
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

let PageSize = 10;

function AllStudioDetail2({
  products,
  setProducts,
  pageDetails,
  setPageCount,
  pageCount,
  totalPage,
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
    setshowpricefilter((prevState) => !prevState);
  };
  const [showloactionfilter, setshowloactionfilter] = useState(false);
  const handellocationFilter = () => {
    setshowloactionfilter((prevState) => !prevState);
  };
  return (
    <>
      <div className={style.studioTabelDiv}>
        <div className={style.searchDiv}>
          <div>
            <DatePicker onChange={onChange} className={style.antCustomcss} />
          </div>
          <div>
            <BiSearchAlt /> <br />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div>
          <table>
            <thead className={style.studiotabelHead}>
              <tr>
                <th>
                  <div className={style.headingContainer}>
                    Studioa
                    <div className={style.filterBox}>
                      <RiExpandUpDownLine />
                    </div>
                  </div>
                </th>
                <th>
                  <div className={style.headingContainer}>
                    Price
                    <div className={style.filterBox}>
                      <CiFilter onClick={handelpriceFilter} />
                      {showpricefilter ? (
                        <div className={style.filteractionBox}>
                          <div>Price Range</div>
                          <div>
                            <p>start Price</p>
                            <input type="text" placeholder="₹|" />
                          </div>
                          <div>
                            <p>End Price</p>
                            <input type="text" placeholder="₹|" />
                          </div>
                          <div>
                            <p>reset </p>
                            <Button name={"ok"} />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </th>

                <th>
                  <div className={style.headingContainer}>
                    Location
                    <div className={style.filterBox}>
                      <CiFilter onClick={handellocationFilter} />
                      {showloactionfilter ? (
                        <div className={style.filteractionBox2}>
                          <div>
                            <input
                              type="text"
                              placeholder="Search for Region"
                            />
                          </div>
                          <div>
                            <div>
                              <input
                                type="checkbox"
                                name="mumbai"
                                id="mumbai"
                              />
                              <label htmlFor="mumbai">Mumbai</label>
                            </div>
                          </div>
                          <div>
                            <div>
                              <input
                                type="checkbox"
                                name="mumbai"
                                id="mumbai"
                              />
                              <label htmlFor="mumbai">Mumbai</label>
                            </div>
                          </div>
                          <div>
                            <div>
                              <input
                                type="checkbox"
                                name="mumbai"
                                id="mumbai"
                              />
                              <label htmlFor="mumbai">Mumbai</label>
                            </div>
                          </div>
                          <div style={{ justifyContent: "space-around" }}>
                            <p>reset </p>
                            <Button name={"ok"} />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </th>
                <th>
                  <div className={style.headingContainer}>
                    No. of Rooms
                    <div className={style.filterBox}>
                      <CiFilter />
                    </div>
                  </div>
                </th>
                <th>
                  <div className={style.headingContainer}>
                    Activity Status
                    <div className={style.filterBox}>
                      <CiFilter />
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
        />
      </div>
    </>
  );
}

export default AllStudioDetail2;
