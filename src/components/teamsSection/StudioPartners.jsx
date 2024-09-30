import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tooltip } from "antd";
import { RiDeleteBin5Fill, RiExpandUpDownLine } from "react-icons/ri";
import moment from "moment";

import style from "../../pages/admin/studios/studio.module.css";
import CopyToClipboard from "../../pages/admin/layout/CopyToClipboard ";
import PaginationNav from "../../pages/admin/layout/PaginationNav";
import DateAndSearchFilter from "../../pages/admin/layout/filterComponent/DateAndSearchFilter";
import { useNavigate } from "react-router-dom";
import Switch from "../../pages/admin/layout/Switch";
import userNotFound from "../../assets/img/userNotFound.jpg";
import { render } from "@testing-library/react";
import { GoEye } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import dynamicNav from "../../utils/dynamicNav";
import ChoiraLoder2 from "../loader/ChoiraLoder2";

const StudioPartners = ({
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
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activityStatus, setActivityStatus] = useState({});

  const navigate = useNavigate();
  const gotoEdit = (id, type) => {
    if (type == "edit") {
      type = "isEditMode";
    } else {
      type = "showMode";
    }

    const selectedProduct = products.find((product) => product._id === id);
    console.log("navigated=======>", selectedProduct);

    navigate(`/${dynamicNav}/Teams/AddStudioPatner?id=${id}`, {
      state: {
        productData: selectedProduct,
        navCount: 3,
        [type]: true,
      },
    });
  };

  const handleSwitchChange = (studioId, status) => {
    setActivityStatus((prevStatus) => ({
      ...prevStatus,
      [studioId]: !prevStatus[studioId],
    }));
  };

  const handleSortByClick = () => {
    setShortby(shortby === "desc" ? "asc" : "desc");
  };

  const columns = [
    {
      title: "Sr.No.",
      dataIndex: "serialNumber",
      key: "serialNumber",
      sorter: (a, b) => handleSortByClick(),
      render: (text, record, index) => {
        return shortby === "asc"
          ? index + 1 + (pageCount - 1) * perPage
          : totalResult - pageCount * perPage + perPage - index;
      },
    },
    {
      title: "Partner Name",
      dataIndex: "firstName",
      key: "partnerName",
      render(text, record) {
        return (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className={
                  record.ownerImage === ""
                    ? `${style.studioImageNotFound}`
                    : `${style.studioImage} `
                }
              >
                <img
                  src={record?.ownerImage || userNotFound}
                  alt=""
                  onError={(e) => (e.target.src = userNotFound)}
                />
              </div>
              &nbsp;&nbsp;
              <CopyToClipboard textToCopy={record.firstName} />
            </div>
          </>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <CopyToClipboard textToCopy={record.email} textLength={25} />
      ),
    },
    {
      title: "Studio Name",
      dataIndex: "studioName",
      key: "studioName",
      render: (text, record) => (
        <CopyToClipboard textToCopy={record.studioName} />
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) =>
        moment(record.creationTimeStamp).format(
          // "DD/MM/YYYY hh:mm:ss a"
          "Do MMM  YY, hh:mm a "
        ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Tooltip title="view">
            <GoEye
              style={{ cursor: "pointer" }}
              onClick={() => {
                gotoEdit(record._id, "showMode");
              }}
            />
          </Tooltip>
          &nbsp; &nbsp;
          <Tooltip title="Edit">
            <MdEdit
              style={{ cursor: "pointer" }}
              onClick={() => {
                gotoEdit(record._id, "edit");
              }}
            />
          </Tooltip>
          &nbsp; &nbsp;
          <Tooltip title="Delete">
            <RiDeleteBin5Fill style={{ color: "red", cursor: "pointer" }} />
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    sendFilterDataToapi.sortBy = shortby;
    console.log(sendFilterDataToapi);
  }, [shortby]);

  return (
    <>
      <div className={style.studioTabelDiv}>
        <DateAndSearchFilter
          setProducts={setProducts}
          setTotalPage={setTotalPage}
          searchDisable={true}
          dateDisable={true}

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
            locale={{ emptyText: <ChoiraLoder2 /> }}
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
};

export default StudioPartners;
