import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Tooltip } from "antd";
import { GrShare } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GoEye } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AccessContext } from "../../../utils/context";
import MyStudioApi from "../../../services/MyStudioApi";
import style from "../../../pages/admin/studios/studio.module.css";
import ChoiraLoder2 from "../../../components/loader/ChoiraLoder2";
import DateAndSearchFilter from "../layout/filterComponent/DateAndSearchFilter";
import PaginationNav from "../layout/PaginationNav";
import CopyToClipboard from "../layout/CopyToClipboard ";
import imageNotFound from "../../../assets/imagesNotFound.png";
import { render } from "@testing-library/react";
import Switch from "../layout/Switch";

function MyStudioDetails({
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
}) {
  const navigate = useNavigate();
  const [showloader, setShowloader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tableAccess = useContext(AccessContext);
  const [pid, setPid] = useState(0);
  const gotoEdit = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    navigate(`/studio/edit?id=${id}`, {
      state: { productData: selectedProduct, navCount: 3, isEditMode },
    });
  };

  const gotoShowStudioDetails = (id) => {
    const isEditMode = true;
    const selectedProduct = products.find((product) => product._id === id);
    navigate(`/studio/edit?id=${id}`, {
      state: {
        productData: selectedProduct,
        navCount: 4,
        isEditMode,
        showMode: true,
      },
    });
  };

  const handleSwitchChange = (studioId) => {
    setShowloader(true);
    MyStudioApi.updateStatus(studioId)
      .then((response) => {
        setProducts((prevState) =>
          prevState.map((product) =>
            product._id === studioId
              ? { ...product, isActive: response.studio.isActive }
              : product
          )
        );
        setShowloader(false);
      })
      .catch((error) => {
        console.error(error);
        setShowloader(false);
      });
  };

  // Define columns for Ant Design Table
  const columns = [
    {
      title: "Studio",
      dataIndex: "studioName",
      key: "studioName",
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
          <CopyToClipboard textToCopy={record.fullName} />
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "pricePerHour",
      key: "pricePerHour",

      render: (text, record) => (
        <>
          ₹{record?.roomsDetails?.[0]?.pricePerHour || "N/A"}
          <br />
          <small>per hour</small>
        </>
      ),
    },
    {
      title: "Location",
      dataIndex: "address",
      key: "location",
      render: (text, record) => (
        <>
          <CopyToClipboard textToCopy={record.address} textLength={30} />
          <br />
          <small title={record.state}>
            <CopyToClipboard textToCopy={record.state} />
          </small>
        </>
      ),
    },
    {
      title: "No. of Rooms",
      dataIndex: "totalRooms",
      key: "totalRooms",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (text, record) => (
        <Switch
          isloading={pid === record._id && showloader}
          status={record.isActive}
          onClick={() => {
            setPid(record._id);
            handleSwitchChange(record._id);
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          {tableAccess ? (
            tableAccess["MyStudio"].action === "write" ? (
              <>
                <Tooltip title="View Details">
                  <GoEye
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      gotoShowStudioDetails(record._id);
                    }}
                  />
                </Tooltip>
                &nbsp;
                <Tooltip title="Edit">
                  <MdEdit
                    style={{ color: "#ffc701", cursor: "pointer" }}
                    onClick={() => {
                      gotoEdit(record._id);
                    }}
                  />
                </Tooltip>
                &nbsp;
                <Tooltip title="Delete">
                  <RiDeleteBin5Fill
                    style={{ color: "red", cursor: "pointer" }}
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="View Details">
                  <GoEye
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      gotoShowStudioDetails(record._id);
                    }}
                  />
                </Tooltip>
              </>
            )
          ) : (
            <>
              <Tooltip title="View Details">
                <GoEye
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    gotoShowStudioDetails(record._id);
                  }}
                />
              </Tooltip>
              &nbsp;
              <Tooltip title="Edit">
                <MdEdit
                  style={{ color: "#ffc701", cursor: "pointer" }}
                  onClick={() => {
                    gotoEdit(record._id);
                  }}
                />
              </Tooltip>
              &nbsp;
              <Tooltip title="Delete">
                <RiDeleteBin5Fill style={{ color: "red", cursor: "pointer" }} />
              </Tooltip>
            </>
          )}
        </>
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

export default MyStudioDetails;
