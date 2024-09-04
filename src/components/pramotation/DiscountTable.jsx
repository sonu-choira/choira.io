import React, { useEffect, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import ChoiraLoder2 from "../loader/ChoiraLoder2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GrShare } from "react-icons/gr";
import { FaPencilAlt, FaRegEye } from "react-icons/fa";
import promotionApi from "../../services/promotionApi";
import CopyToClipboard from "../../pages/admin/layout/CopyToClipboard ";
import Switch from "../../pages/admin/layout/Switch";
import { clearEmptyField } from "../../utils/helperFunction";

function DiscountTable({ editData, setEditData }) {
  const [products, setProducts] = useState("");
  const [showloader, setShowloader] = useState(false);
  const [pid, setPid] = useState(0);

  const gotoEditPage = (id) => {
    console.log(id);
    setEditData(products.filter((item) => item._id === id)[0]);
  };
  useEffect(() => {
    promotionApi.getAllDiscount().then((res) => {
      console.log(res.discounts);
      setProducts(res.discounts);
    });
  }, []);

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

  return (
    <>
      <div
        className={style.studioTabelDiv}
        style={{ width: "100%", height: "100%" }}
      >
        <div style={{ display: "none" }}></div>
        <div style={{ width: "98%", height: "100%" }}>
          <table>
            <thead
              className={style.studiotabelHead}
              style={{ borderRadius: "100px" }}
            >
              <tr>
                <th style={{ width: "10%" }}>S.No.</th>
                <th>Discount Name</th>
                <th>Discount Type</th>
                <th>discountPercentage</th>
                <th>Max. Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.length === 0 ? (
                <tr>
                  <td>
                    <ChoiraLoder2 />
                  </td>
                </tr>
              ) : (
                products?.map((discount, i) => (
                  <tr key={i}>
                    <td> {i + 1}</td>
                    {/* <td title={discount.discountName}>
                      <CopyToClipboard textToCopy={discount?.discountName} />
                    </td> */}
                    <td title={discount.discountName}>
                      {/* <CopyToClipboard textToCopy={discount?.discountName} /> */}
                      {discount.discountName}
                    </td>
                    <td>{discount.discountType}</td>
                    <td>{discount.discountPercentage}</td>

                    <td>{discount.maxCapAmount}</td>
                    <td>
                      <Switch
                        isloading={pid === discount._id && showloader}
                        status={discount.active}
                        onClick={() => {
                          setPid(discount._id);
                          updateStatus(discount._id, discount.active);
                        }}
                      />
                    </td>

                    <td className={style.tableActionbtn}>
                      <div>
                        <FaRegEye
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            // Add your share logic here
                          }}
                        />{" "}
                        &nbsp; &nbsp;
                        <FaPencilAlt
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            gotoEditPage(discount._id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DiscountTable;
