import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Switch,
  DatePicker,
  Dropdown,
  Menu,
  Space,
  Input,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import style from "../../pages/admin/studios/studio.module.css";

import {
  FaFilter,
  FaRegEye,
  FaShare,
  FaTableCellsLarge,
} from "react-icons/fa6";
import PriceFilter from "../../pages/admin/layout/filterComponent/PriceFilter";
import CheckboxFilter from "../../pages/admin/layout/filterComponent/CheckboxFilter";
import DateAndSearchFilter from "../../pages/admin/layout/filterComponent/DateAndSearchFilter";
import appAndmoreApi from "../../services/appAndmoreApi";
import moment from "moment";
import { render } from "@testing-library/react";
import PaginationNav from "../../pages/admin/layout/PaginationNav";
import ChoiraLoder2 from "../loader/ChoiraLoder2";

const { RangePicker } = DatePicker;

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
  const [currentPage, setCurrentPage] = useState(1);
  const [activityStatus, setActivityStatus] = useState({});
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [priceFilter, setPriceFilter] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const handleEdit = (id) => {
    const selectedProduct = products.find((product) => product._id === id);
    navigate(`/studio/edit?id=${id}`, {
      state: { productData: selectedProduct, isEditMode: true },
    });
  };

  const handleSwitchChange = (studioId) => {
    setActivityStatus((prevStatus) => ({
      ...prevStatus,
      [studioId]: !prevStatus[studioId],
    }));
  };

  const handleShortbyClick = () => {
    setShortby(shortby === "desc" ? "asc" : "desc");
  };

  const columns = [
    {
      title: "Booking Id",
      dataIndex: "_id",
      key: "bookingId",
      render: (text) => `#${text.substring(0, 6)}`,
    },
    {
      title: "Studio Name",
      dataIndex: "studioName",
      key: "studioName",
    },
    {
      title: "No. of hours",
      dataIndex: "no_of_hours",
      key: "hours",
    },
    {
      title: "Date",
      dataIndex: "creationTimeStamp",
      key: "date",
      render: (creationTimeStamp) =>
        moment(creationTimeStamp).format("Do MMM  YY, hh:mm a"),
    },
    {
      title: "Time Slot",
      dataIndex: "bookingTime",
      key: "status",
      render: (bookingTime) =>
        `${bookingTime?.startTime} - ${bookingTime?.endTime}`,
    },
    {
      title: "Project Status",
      dataIndex: "bookingStatus",
      key: "timeSlot",
      render: (bookingStatus) => (
        <>
          <div
            className={style.userProjectStatus}
            style={{
              backgroundColor:
                parseInt(bookingStatus) === 0
                  ? "#FFF3CA"
                  : parseInt(bookingStatus) == 1
                  ? "#DDFFF3"
                  : "#FFDDDD",
            }}
          >
            {parseInt(bookingStatus) === 0
              ? "Pending"
              : parseInt(bookingStatus) == 1
              ? "Complete"
              : "Cancelled"}
          </div>
        </>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "eye",
      render: (text) => (
        <Tooltip title="View">
          <FaRegEye style={{ cursor: "pointer" }} />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <div className={style.studioTabelDiv}>
        <DateAndSearchFilter searchDisable={true} dateDisable={true} />
        <div>
          <Table
            columns={columns}
            dataSource={products}
            rowKey="_id"
            locale={{ emptyText: <ChoiraLoder2 /> }}
            pagination={false} // Disable Ant Design's default
          />

          {/* Your Custom Pagination Component */}
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
