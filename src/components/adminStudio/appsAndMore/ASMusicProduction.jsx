import React, { useEffect, useState } from "react";
import { Table, Switch as AntSwitch, Button } from "antd";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GoEye } from "react-icons/go";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import PaginationNav from "../../../pages/admin/layout/PaginationNav";

import imageNotFound from "../../../assets/imagesNotFound.png";
import appAndmoreApi from "../../../services/appAndmoreApi";
import ChoiraLoder2 from "../../loader/ChoiraLoder2";
import DateAndSearchFilter from "../../../pages/admin/layout/filterComponent/DateAndSearchFilter";
import style from "../../../pages/admin/studios/studio.module.css";
import CopyToClipboard from "../../../pages/admin/layout/CopyToClipboard ";
import Switch from "../../../pages/admin/layout/Switch";

const ASMusicProduction = ({
  products,
  setProducts,
  setPageCount,
  pageCount,
  totalPage,
  bookingPageCount,
  setTotalPage,
  sendFilterDataToapi,
  perPage,
}) => {
  const [pid, setPid] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});
  const navigate = useNavigate();

  const handleSwitchChange = (studioId, isActive) => {
    setShowLoader(true);
    appAndmoreApi
      .updateServiceStatus(studioId, isActive ? 0 : 1)
      .then((response) => {
        setProducts((prevState) =>
          prevState.map((product) =>
            product._id === studioId
              ? { ...product, isActive: response.updatedService.isActive }
              : product
          )
        );
        setShowLoader(false);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        setShowLoader(false);
      });
  };

  const gotoEdit = (id) => {
    const selectedProduct = products.find((product) => product._id === id);
    navigate(`/service/musicProduction/edit?id=${id}`, {
      state: { productData: selectedProduct, isEditMode: true, navCount: 3 },
    });
  };

  const gotoShowMusicProduction = (id) => {
    const selectedProduct = products.find((product) => product._id === id);
    navigate(`/service/musicProduction/edit?id=${id}`, {
      state: { productData: selectedProduct, showMode: true, navCount: 3 },
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
      render: (text, record) => (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className={
                record.profileUrl === ""
                  ? `${style.studioImageNotFound}`
                  : `${style.studioImage} `
              }
            >
              <img
                src={record.servicePhotos?.[0] || imageNotFound}
                alt=""
                onError={(e) => {
                  e.target.src = imageNotFound;
                }}
              />
            </div>
            &nbsp;&nbsp;
            <CopyToClipboard textToCopy={record.fullName} />
          </div>
        </>
      ),
    },
    {
      title: "Amount",
      dataIndex: "pricing",
      render: (pricing) => `Starting from ₹${pricing?.["IN"]?.price || 0}`,
    },
    {
      title: "No. of Services",
      dataIndex: "packages",
      render: (packages, record) => (
        <>
          {packages?.length}
          <br />
          <small>{record.state}</small>
        </>
      ),
    },
    {
      title: "Created on",
      dataIndex: "creationTimeStamp",
      // sorter: (a, b) =>
      //   moment(a.creationTimeStamp) - moment(b.creationTimeStamp),
      render: (creationTimeStamp) =>
        moment(creationTimeStamp).format("Do MMM YY, hh:mm a"),
    },
    {
      title: "Activity Status",
      dataIndex: "isActive",
      render: (isActive, record) => (
        <Switch
          status={isActive}
          isloading={pid === record._id && showLoader}
          onClick={() => {
            setPid(record._id);
            handleSwitchChange(record._id, isActive);
          }}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <GoEye
            onClick={() => gotoShowMusicProduction(id)}
            style={{ cursor: "pointer" }}
          />
          <MdEdit
            onClick={() => gotoEdit(id)}
            style={{ color: "#ffc701", cursor: "pointer" }}
          />
          <RiDeleteBin5Fill style={{ color: "red", cursor: "pointer" }} />
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
          bookingPageCount={bookingPageCount}
          sendFilterDataToapi={sendFilterDataToapi}
          searchDisable={true}
          dateDisable={true}
        />

        <Table
          columns={columns}
          dataSource={products}
          pagination={false}
          rowKey="_id"
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
};

export default ASMusicProduction;
