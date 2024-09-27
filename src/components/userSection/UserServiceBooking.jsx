import React, { useEffect, useState } from "react";
import { Table, Button, Pagination, Tooltip } from "antd";
import { GrShare } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import style from "../../pages/admin/studios/studio.module.css";

import DateAndSearchFilter from "../../pages/admin/layout/filterComponent/DateAndSearchFilter";
import {
  FaFilter,
  FaRegEye,
  FaShare,
  FaTableCellsLarge,
} from "react-icons/fa6";
import CopyToClipboard from "../../pages/admin/layout/CopyToClipboard ";
import PaginationNav from "../../pages/admin/layout/PaginationNav";
import ChoiraLoder2 from "../loader/ChoiraLoder2";

let PageSize = 10;

function UserServiceBooking({
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

  const columns = [
    {
      title: "Booking Id",
      dataIndex: "_id",
      key: "_id",
      render: (text) => `#${text.substring(0, 6)}`,
    },
    {
      title: "Service Name",
      dataIndex: "serviceFullName",
      key: "serviceName",
    },
    {
      title: "Package Name",
      dataIndex: "package",
      key: "packageName",
      render: (pkg) => <CopyToClipboard textToCopy={pkg?.name} />,
    },
    {
      title: "Date",
      dataIndex: "bookingDate",
      key: "date",
      render: (bookingDate) => (
        <span>{moment(bookingDate).format("Do MMM  YY, hh:mm a")}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "price",
    },
    {
      title: "Project Status",
      dataIndex: "bookingStatus",
      key: "status",
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
      title: "Actions",
      key: "actions",
      dataIndex: "",
      render: (text) => (
        <Tooltip title="View">
          <FaRegEye style={{ cursor: "pointer" }} />
        </Tooltip>
      ),
    },
  ];

  const gotoEdit = (id) => {
    const selectedProduct = products.find((product) => product._id === id);
    navigate(`/studio/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        navCount: 3,
        isEditMode: true,
      },
    });
  };

  useEffect(() => {
    // Example of pagination and data fetching logic
    const fetchData = async () => {
      // Fetch data logic here
      // setProducts(fetchedData);
      // setTotalPage(totalPages);
    };

    fetchData();
  }, [currentPage, shortby]);

  return (
    <>
      <div className={style.studioTabelDiv}>
        <DateAndSearchFilter searchDisable={true} dateDisable={true} />
        <div>
          <Table
            columns={columns}
            dataSource={products}
            rowKey="_id"
            pagination={false}
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

export default UserServiceBooking;
