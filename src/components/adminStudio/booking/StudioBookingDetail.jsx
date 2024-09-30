import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Table, Popconfirm, Tag, Tooltip } from "antd";
import style from "../../../pages/admin/studios/studio.module.css";

import { GrShare } from "react-icons/gr";
import { GoEye } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill, RiExpandUpDownLine } from "react-icons/ri";

import { IoIosArrowBack } from "react-icons/io";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";

import Button from "../../../pages/admin/layout/Button";
import Switch from "../../../pages/admin/layout/Switch";
import Pagination from "../../../pages/admin/studios/Pagination";
import { LuFilePlus } from "react-icons/lu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bookingPageApi from "../../../services/bookingPageApi";
import ChoiraLoder2 from "../../loader/ChoiraLoder2";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import moment from "moment";
import { CiFilter } from "react-icons/ci";
import CheckboxFilter from "../../../pages/admin/layout/filterComponent/CheckboxFilter";
import CheckBoxFilterComponent from "../../../pages/admin/layout/filterComponent/CheckBoxFilterComponent";
import appAndmoreApi from "../../../services/appAndmoreApi";
import userApi from "../../../services/userApi";
import PaginationNav from "../../../pages/admin/layout/PaginationNav";
import CopyToClipboard from "../../../pages/admin/layout/CopyToClipboard ";
import DateAndSearchFilter from "../../../pages/admin/layout/filterComponent/DateAndSearchFilter";
import DateAndSearchFilterComponent from "../../../pages/admin/layout/filterComponent/DateAndSearchFilterComponent";
import { clearEmptyField } from "../../../utils/helperFunction";
import { errorAlert } from "../../../pages/admin/layout/Alert";
import { AccessContext } from "../../../utils/context";
import { partnerAccess } from "../../../config/partnerAccess";
let PageSize = 10;

let userFiler = true;
let setUserFilterText = {};

function StudioBookingDetail({
  products,
  setProducts,
  handleChange,
  getStatusColor,
  bookingPageCount,
  totalPage,
  pageCount,
  setPageCount,
  setTotalPage,
  sendFilterDataToapi,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [userFilterText, setUserFilterText] = useState("");
  // const gotoShowDetails = (id) => {
  //   const selectedProduct = products.find((product) => product._id === id);
  //   console.log("navigated=======>", selectedProduct);

  //   navigate(`/service/showBookingDetails?id=${id}`, {
  //     state: { productData: selectedProduct },
  //   });
  // };

  const gotoShowDetails = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);

    navigate(`/studio/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        navCount: 4,
        isEditMode: isEditMode,
        showMode: true,
      },
    });
  };

  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const closeAllFilter = () => {
    setShowstatusFilter(false);
  };
  const headers = [
    { title: "Id", width: "5%" },
    { title: "User Name", width: "10%" },
    { title: "Studio Name", width: "10%" },
    { title: "Hours", width: "5%" },
    { title: "Creation Date", width: "10%" },
    { title: "Booking Date", width: "10%" },
    { title: "Time Slot", width: "10%" },
    { title: "Amount", width: "10%" },
    { title: "Status", width: "10%", icon: <CiFilter /> },
    { title: "", width: "10%", icon: "" },
  ];
  const getDynamicStyle = (shortby, criteria) => ({
    backgroundColor: shortby !== criteria ? "#ffc70133" : "",
  });
  const status = {
    Pending: 0,
    Completed: 1,
    Cancelled: 2,
  };
  //  ["active", "cancelled", "completed"];
  const [showstatusFilter, setShowstatusFilter] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [userAllFilterData, setUserAllFilterData] = useState({});

  useEffect(() => {
    if (selectedData === "") {
      delete sendFilterDataToapi.bookingType;
      console.log("sendFilterDataToapi after reset:", sendFilterDataToapi);
      handleFilterData(sendFilterDataToapi);
    }
  }, [selectedData]);

  const handleResetFilter = () => {
    setSelectedData("");
    console.log("selectedData before reset:", selectedData);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    console.log("filters:", filters);
    let status = filters?.bookingStatus?.[0] || "";
    setProducts([]);
    setPageCount(1);
    delete sendFilterDataToapi.bookingType;
    if (status) {
      sendFilterDataToapi.bookingType = status;
    }
    sendFilterDataToapi.pageCount = pageCount;

    clearEmptyField(sendFilterDataToapi);
    let dynamicApi = "";
    if (partnerAccess) {
      dynamicApi = "getPartnerBookings";
    } else {
      dynamicApi = "getBookings";
    }

    bookingPageApi[dynamicApi](sendFilterDataToapi).then((response) => {
      console.log("date filter response:", response);
      if (response.status) {
        setProducts(response.data);
        setTotalPage(response?.paginate?.totalPages);
      }
    });
  };

  const handleFilterData = (sendFilterDataToapi) => {
    setProducts([]);
    setPageCount(1);
    // errorAlert(selectedData);
    console.log("selectedData:::::::::::::------>", selectedData);
    delete sendFilterDataToapi.bookingType;
    if (selectedData) {
      sendFilterDataToapi.bookingType = selectedData;
    }
    sendFilterDataToapi.pageCount = pageCount;

    clearEmptyField(sendFilterDataToapi);
    let dynamicApi = "";
    if (partnerAccess) {
      dynamicApi = "getPartnerBookings";
    } else {
      dynamicApi = "getBookings";
    }

    bookingPageApi[dynamicApi](sendFilterDataToapi).then((response) => {
      console.log("date filter response:", response);
      if (response.status) {
        setProducts(response.data);
        setTotalPage(response?.paginate?.totalPages);
      }
    });
  };
  const tableAccess = useContext(AccessContext);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      width: "5%",
      render: (text) => `#${text.slice(-4)}`,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      width: "10%",
      render: (text) => <CopyToClipboard textToCopy={text} />,
    },
    {
      title: "Studio Name",
      dataIndex: "studioName",
      key: "studioName",
      width: "10%",
      render: (text, record) => (
        <>
          <CopyToClipboard textToCopy={text} />
          <br />
          <small>
            <CopyToClipboard textToCopy={record.roomName} />
          </small>
        </>
      ),
    },
    {
      title: "Hours",
      dataIndex: "noOfHours",
      key: "noOfHours",
      width: "5%",
    },
    {
      title: "Creation Date",
      dataIndex: "creationTimeStamp",
      key: "creationTimeStamp",
      width: "10%",
      render: (text) => moment(text).format("Do MMM YY"),
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      width: "10%",
      render: (text) => moment(text).format("Do MMM YY"),
    },
    {
      title: "Time Slot",
      dataIndex: "bookingTime",
      key: "bookingTime",
      width: "10%",
      render: (bookingTime) =>
        `${moment(bookingTime?.startTime, ["HH:mm"]).format(
          "hh:mm a"
        )} - ${moment(bookingTime?.endTime, ["HH:mm"]).format("hh:mm a")}`,
    },
    {
      title: "Amount",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "10%",
      render: (text) => `₹${text}`,
    },
    {
      title: "Status",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      width: "10%",
      filters: [
        {
          text: "Pending",
          value: "0",
        },
        {
          text: "Completed",
          value: 1,
        },
        {
          text: "Cancelled",
          value: 2,
        },
        {
          text: "Payment Pending",
          value: 3,
        },
      ],
      filterMultiple: false,

      render: (status) => (
        <div
          className={style.userProjectStatus}
          style={{
            backgroundColor:
              parseInt(status) === 0
                ? "#FFF3CA"
                : parseInt(status) == 1
                ? "#DDFFF3"
                : parseInt(status) == 3
                ? "#9c9d9d73"
                : "#FFDDDD",
            // : "#FFDDDD",
          }}
        >
          {parseInt(status) === 0
            ? "Pending"
            : parseInt(status) == 1
            ? "Complete"
            : parseInt(status) == 3
            ? "Payment Pending"
            : parseInt(status) == 2
            ? "Cancelled"
            : ""}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "10%",

      render: (text, record) => (
        <div>
          <Tooltip title="View">
            <GoEye
              style={{ cursor: "pointer" }}
              // onClick={() => gotoShowDetails(record._id)}
            />
          </Tooltip>
          &nbsp;
          <Tooltip title="Delete">
            {/* <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => console.log("Deleted", record._id)}
              okText="Yes"
              cancelText="No"
            > */}
            <RiDeleteBin5Fill style={{ color: "red", cursor: "pointer" }} />
            {/* </Popconfirm> */}
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={style.studioTabelDiv}>
        <DateAndSearchFilterComponent
          setProducts={setProducts}
          setTotalPage={setTotalPage}
          pageCount={pageCount}
          setPageCount={setPageCount}
          userFiler={userFiler}
          setUserFilterText={setUserFilterText}
          userFilterText={userFilterText}
          userAllFilterData={userAllFilterData}
          handleFilterData={handleFilterData}
          sendFilterDataToapi={sendFilterDataToapi}
        />
        <div>
          <Table
            columns={columns}
            dataSource={products}
            pagination={false}
            onChange={handleTableChange}
            rowKey={(record) => record._id}
            // loading={products.length === 0}
            locale={{ emptyText: <ChoiraLoder2 /> }}
          />
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

export default StudioBookingDetail;
