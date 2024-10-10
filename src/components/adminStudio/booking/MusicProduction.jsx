import React, { useEffect, useMemo, useState } from "react";
import { Table, Select, Button, Input, Tooltip } from "antd";
import { GrShare } from "react-icons/gr";
import style from "../../../pages/admin/studios/studio.module.css";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";
import { LuFilePlus } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { GoEye } from "react-icons/go";
import axios from "axios";
import PaginationNav from "../../../pages/admin/layout/PaginationNav";

import ChoiraLoder2 from "../../loader/ChoiraLoder2";
import CopyToClipboard from "../../../pages/admin/layout/CopyToClipboard ";
import DateAndSearchFilter from "../../../pages/admin/layout/filterComponent/DateAndSearchFilter";

const { Option } = Select;

function MusicProduction({
  products,
  setProducts,
  handleChange,
  getStatusColor,
  bookingPageCount,
  totalPage,
  pageCount,
  setPageCount,
  setTotalPage,
  perPage,
  isFetching,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState({});
  useEffect(() => {
    if (isFetching) {
      setProducts([]);
    }
  }, [isFetching]);

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1 + (pageCount - 1) * perPage,
    },
    {
      title: "Booking ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => `#${text.slice(-5)}`,
      width: "15%",
      align: "center",
    },
    {
      title: "User Name",
      dataIndex: "userFullName",
      key: "userFullName",
      render: (text) => <CopyToClipboard textToCopy={text} />,
    },
    {
      title: "Mobile No.",
      dataIndex: "userPhone",
      key: "userPhone",
      render: (text) => <CopyToClipboard textToCopy={text} />,
    },
    {
      title: "Production Name",
      dataIndex: "serviceFullName",
      key: "serviceFullName",
      render: (text) => <CopyToClipboard textToCopy={text} />,
    },
    {
      title: "Amount",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => `₹${text}`,
    },
    {
      title: "Project Status",
      key: "status",
      render: (record) => (
        <>
          <div className={style.tableActionbtn}>
            <div>
              <select
                value={selectedStatus[record._id] || record.bookingStatus}
                onChange={(e) => handleChange(record._id, e)}
                style={{
                  backgroundColor: getStatusColor(record.bookingStatus),
                }}
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value={0}>Active</option>
                {/* <option value="Pending">Pending</option> */}
                <option value={1}>Complete</option>
                <option value={2}>Cancelled</option>
              </select>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Tooltip title="view">
            <GoEye style={{ cursor: "pointer" }} onClick={() => {}} />
          </Tooltip>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Tooltip title="Delete">
            <RiDeleteBin5Fill style={{ color: "red", cursor: "pointer" }} />
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
}

export default MusicProduction;
