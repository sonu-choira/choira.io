import React, { useContext, useEffect, useMemo, useState } from "react";
import { Table, Tooltip } from "antd";
import style from "../../../pages/admin/studios/studio.module.css";

import { GrShare } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

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
import CopyToClipboard from "../../../pages/admin/layout/CopyToClipboard ";

import { AccessContext } from "../../../utils/context";

import moment from "moment";

const AllStudioDetail2 = ({
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
}) => {
  const navigate = useNavigate();
  const tableAccess = useContext(AccessContext);
  const [showloader, setShowloader] = useState(false);
  const [pid, setPid] = useState(0);

  const pageSize = 10; // You can adjust this based on your need

  let loading_timeout = null;
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

  const gotoShowStudioDetails = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);
    // alert(selectedProduct);
    navigate(`/studio/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        navCount: 4,
        isEditMode: isEditMode,
        showMode: true,
      },
    });
  };
  useEffect(() => {
    return () => {
      clearTimeout(loading_timeout);
    };
  }, []);
  const columns = [
    {
      title: (
        <div>
          Studio
          <RiExpandUpDownLine style={{ cursor: "pointer" }} />
        </div>
      ),
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={style.studioImage}>
            {record.studioPhotos ? (
              <img
                src={record.studioPhotos[0]}
                alt=""
                onError={(e) => {
                  e.target.src = imageNotFound;
                }}
              />
            ) : (
              <img src={imageNotFound} alt="" />
            )}
          </div>
          &nbsp;&nbsp;
          <CopyToClipboard textToCopy={text} />
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: ["roomsDetails", "0", "pricePerHour"],
      key: "pricePerHour",
      render: (price) => (
        <span>
          ₹{price || "N/A"} <br />
          <small>per hour</small>
        </span>
      ),
    },
    {
      title: "Location",
      dataIndex: "address",
      key: "address",
      render: (address, record) => (
        <>
          <CopyToClipboard textToCopy={address} textLength={30} />
          <br />
          <small>
            <CopyToClipboard textToCopy={record.state} />
          </small>
        </>
      ),
      filters: [
        {
          text: "Mumbai",
          value: "mumbai",
        },
        {
          text: "Delhi",
          value: "Delhi",
        },
        {
          text: "Bangalore",
          value: "Bangalore",
        },
        {
          text: "Chennai",
          value: "Chennai",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "No. of Rooms",
      dataIndex: "totalRooms",
      key: "totalRooms",
      filters: [
        {
          text: "1",
          value: "1",
        },
        {
          text: "2",
          value: "2",
        },
        {
          text: "3",
          value: "3",
        },
        {
          text: "4",
          value: "4",
        },
        {
          text: "5",
          value: "5",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Created on",
      dataIndex: "creationTimeStamp",
      key: "creationTimeStamp",
      render: (timestamp) => moment(timestamp).format("Do MMM YY, hh:mm a"),
    },
    {
      title: "Activity Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          loading={pid === record._id && showloader}
          onChange={() => {
            handleSwitchChange(record._id);
            setPid(products._id);
          }}
          disabled={tableAccess?.["app&more"]?.action === "read"}
        />
      ),
      filters: [
        {
          text: "active",
          value: 1,
        },
        {
          text: "inactive",
          value: "0",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },

    {
      title: "   ",
      dataIndex: "",
      key: "",
      render: (_, record) => (
        <div>
          <Tooltip title="view">
            <GoEye
              style={{ cursor: "pointer" }}
              onClick={() => {
                gotoShowStudioDetails(record._id);
              }}
            />
          </Tooltip>
          &nbsp; &nbsp;
          <Tooltip title="Edit">
            <MdEdit
              style={{ cursor: "pointer" }}
              onClick={() => {
                gotoEdit(record._id);
              }}
            />
          </Tooltip>
          &nbsp; &nbsp;
          <Tooltip title="Delete">
            <RiDeleteBin5Fill
              style={{ cursor: "pointer", marginLeft: 8 }}
              onClick={() => console.log("Delete", record._id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={style.studioTabelDiv}>
        <DateAndSearchFilter
          setProducts={setProducts}
          setTotalPage={setTotalPage}
          // bookingPageCount={bookingPageCount}
          // filterNav={filterNav}
          // setfilterNav={setfilterNav}
          // sendFilterDataToapi={sendFilterDataToapi}
          // setSelectedCity={setSelectedCity}
          // setSelectedRoom={setSelectedRoom}
          // setSelectedStatus={setSelectedStatus}
          // setPriceFilter={setPriceFilter}
          // setShortby={setShortby}
        />
        <div>
          <Table
            columns={columns}
            dataSource={products}
            rowKey="_id"
            pagination={false} // Disable Ant Design's default pagination
          />

          {/* Your Custom Pagination Component */}
        </div>
      </div>
      <div className={style.tabelpaginationDiv}>
        <PaginationNav
          pageCount={pageCount}
          totalPage={totalPage}
          setPageCount={setPageCount}
          bookingPageCount={pageSize} // Page size or items per page
        />
      </div>
    </>
  );
};

export default AllStudioDetail2;
