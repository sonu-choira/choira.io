import React, { useEffect, useMemo, useState } from "react";
import { Table, Button as AntButton, Tooltip } from "antd";
import axios from "axios";
import style from "../../../pages/admin/studios/studio.module.css";
import { GrShare } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";
import imageNotFound from "../../../assets/imagesNotFound.png";
import { LuFilePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import ChoiraLoder2 from "../../loader/ChoiraLoder2";
import { GoEye } from "react-icons/go";

import moment from "moment";
import PaginationNav from "../../../pages/admin/layout/PaginationNav";
import DateAndSearchFilter from "../../../pages/admin/layout/filterComponent/DateAndSearchFilter";
import appAndmoreApi from "../../../services/appAndmoreApi";
import { errorAlert } from "../../../pages/admin/layout/Alert";
import CopyToClipboard from "../../../pages/admin/layout/CopyToClipboard ";
import Switch from "../../../pages/admin/layout/Switch";

let PageSize = 10;

function ASMixandMaster({
  products,
  setProducts,
  setPageCount,
  pageCount,
  totalPage,
  bookingPageCount,
  setTotalPage,
  sendFilterDataToapi,
  perPage,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showloader, setShowloader] = useState(false);
  const [pid, setPid] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    sendFilterDataToapi = {};
    sendFilterDataToapi.serviceName = "";
    sendFilterDataToapi.serviceType = "";
  }, []);

  const gotoEdit = (id) => {
    const selectedProduct = products.find((product) => product._id === id);
    navigate(`/service/musicProduction/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        isEditMode: true,
        bookingPageCount: "c3",
      },
    });
  };

  const gotoShowMixAndMaster = (id) => {
    const selectedProduct = products.find((product) => product._id === id);
    navigate(`/service/musicProduction/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        navCount: 3,
        isEditMode: true,
        bookingPageCount: "c3",
        showMode: true,
      },
    });
  };

  const handleSwitchChange = (studioId, isActive) => {
    isActive = isActive === 1 ? 0 : 1;
    setShowloader(true);
    appAndmoreApi
      .updateServiceStatus(studioId, isActive)
      .then((response) => {
        setProducts((prevState) =>
          prevState.map((product) =>
            product._id === studioId
              ? { ...product, isActive: response.updatedService.isActive }
              : product
          )
        );
        setTimeout(() => setShowloader(false), 700);
      })
      .catch((error) => {
        errorAlert(error.message || "Something went wrong");
        setShowloader(false);
      });
  };

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1 + (pageCount - 1) * perPage,
    },
    {
      title: "Production",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={style.studioImage}>
            <img
              src={
                record.servicePhotos ? record.servicePhotos[0] : imageNotFound
              }
              alt=""
              onError={(e) => {
                e.target.src = imageNotFound;
              }}
            />
          </div>
          &nbsp;&nbsp;
          <CopyToClipboard textToCopy={record.fullName} />
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: ["pricing", "IN", "price"],
      key: "price",
      render: (price) => `Starting from ₹${price}`,
    },
    {
      title: "No. of services",
      dataIndex: "totalPlans",
      key: "totalPlans",
      render: (totalPlans, record) => (
        <>
          {totalPlans}
          <br />
          <small>{record.state}</small>
        </>
      ),
    },
    {
      title: "Created on",
      dataIndex: "creationTimeStamp",
      key: "creationTimeStamp",
      render: (timestamp) => moment(timestamp).format("Do MMM YY, hh:mm a"),
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => (
        <div className={style.tableActionbtn}>
          <Switch
            isloading={pid === record._id && showloader}
            status={record.isActive}
            onChange={() => {
              setPid(record._id);
              handleSwitchChange(record._id, record.isActive);
            }}
          />
          <GoEye
            style={{ cursor: "pointer", margin: "0 10px" }}
            onClick={() => gotoShowMixAndMaster(record._id)}
          />
          <MdEdit
            style={{ color: "#ffc701", cursor: "pointer", margin: "0 10px" }}
            onClick={() => gotoEdit(record._id)}
          />
          <RiDeleteBin5Fill style={{ color: "red", cursor: "pointer" }} />
        </div>
      ),
    },
  ];

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  return (
    <>
      <div className={style.studioTabelDiv}>
        <DateAndSearchFilter
          setProducts={setProducts}
          setTotalPage={setTotalPage}
          bookingPageCount={bookingPageCount}
          sendFilterDataToapi={sendFilterDataToapi}
          searchDisable={true}
          dateDisable={true}
        />
        <Table
          dataSource={currentTableData}
          columns={columns}
          rowKey="_id"
          pagination={false}
          locale={{ emptyText: <ChoiraLoder2 /> }}
        />
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

export default ASMixandMaster;
