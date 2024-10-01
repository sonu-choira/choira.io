import React, { useEffect, useState } from "react";
import { Table, Button, Skeleton } from "antd";
import { FaPencilAlt, FaRegEye } from "react-icons/fa";
import promotionApi from "../../services/promotionApi";
import ChoiraLoder2 from "../loader/ChoiraLoder2";
import style from "../../pages/admin/studios/studio.module.css";
import { clearEmptyField } from "../../utils/helperFunction";
import Switch from "../../pages/admin/layout/Switch";

function DiscountTable({ editData, setEditData }) {
  const [products, setProducts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [pid, setPid] = useState(0);

  useEffect(() => {
    promotionApi.getAllDiscount().then((res) => {
      setProducts(res.discounts);
    });
  }, []);

  const gotoEditPage = (id) => {
    setEditData(products.find((item) => item._id === id));
  };
  const [showloader, setShowloader] = useState(false);
  const updateStatus = (id, status) => {
    setShowloader(true);
    let data = products.find((item) => item._id === id);
    if (data.active === 1) {
      data.active = 0;
    } else {
      data.active = 1;
    }
    console.log(data);
    clearEmptyField(data);

    promotionApi
      .updateDiscount(id, data)
      .then((res) => {
        console.log(res);

        setProducts((prev) =>
          prev.map((item) => {
            if (item._id === id) {
              return {
                ...item,
                active: res.discount.active,
              };
            }
            return item;
          })
        );
        setShowloader(false);
      })
      .catch((err) => {
        console.log(err);
        setShowloader(false);
      });
  };

  const columns = [
    {
      title: "S.No.",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Discount Name",
      dataIndex: "discountName",
      key: "discountName",
      render: (text) => <span title={text}>{text}</span>,
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
      key: "discountType",
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Max. Amount",
      dataIndex: "maxCapAmount",
      key: "maxCapAmount",
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active, record) => (
        <Switch
          status={record.active}
          isloading={pid === record._id && showloader}
          onClick={() => {
            setPid(record._id);
            updateStatus(record._id, record.active);
            console.log(record.active, "----------------------->");
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className={style.tableActionbtn}>
          <FaRegEye style={{ cursor: "pointer" }} /> &nbsp; &nbsp;
          <FaPencilAlt
            style={{ cursor: "pointer" }}
            onClick={() => gotoEditPage(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {products.length === 0 ? (
        <Skeleton active />
      ) : (
        <Table
          columns={columns}
          dataSource={products}
          rowKey="_id"
          pagination={false}
        />
      )}
    </>
  );
}

export default DiscountTable;
