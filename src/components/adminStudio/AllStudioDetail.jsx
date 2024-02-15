import React, { useEffect, useMemo, useState } from "react";
import Button from "../../pages/admin/layout/Button";
import Switch from "../../pages/admin/layout/Switch";
import { GrShare } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Pagination from "../../pages/admin/studios/Pagination";
import { IoIosArrowBack } from "react-icons/io";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";
import StudioFooter from "./StudioFooter";
import style from "../../pages/admin/studios/studio.module.css";

let PageSize = 10;

function AllStudioDetail({ setSelectTab }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  // useEffect(async () => {
  //   let data = await fetch("https://dummyjson.com/products?limit=100");
  //   data = await data.json();
  //   console.log(data);
  //   // .then(async (res) => {
  //   //   // console.log(await res?.json());
  //   //   res.json();
  //   // })
  //   // .then(console.log);
  // }, []);
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  return (
    <>
      {/* <div className={style.allStudiobtndiv}>
        <div>All Studios</div>
        <div>
          <Button
            name={"Card view"}
            icon={<FaTableCellsLarge />}
            style={{ height: "50%", width: "38%", gap: "5%" }}
          />
          <Button
            name={"Filter"}
            icon={<FaFilter />}
            style={{ height: "50%", width: "28%", gap: "5%" }}
          />
          <Button
            name={"Share"}
            icon={<FaShare />}
            style={{ height: "50%", width: "28%", gap: "5%" }}
          />
        </div>
        </div> */}
      {/* <div className={style.allStudiobtndiv}>
        <div
          className={style.bookingStudiobtn}
          style={{ width: "100%", height: "100%" }}
        >
          <div>
            <div>
              <div
                style={{
                  borderLeft: "none",
                  backgroundColor: bookingPageCount == 1 ? "#ffc701" : "",
                }}
                onClick={() => {
                  setBookingPageCount(1);
                }}
              >
                Studio
              </div>
              <div
                style={{
                  backgroundColor: bookingPageCount == 2 ? "#ffc701" : "",
                }}
                onClick={() => {
                  setBookingPageCount(2);
                }}
              >
                Music Production
              </div>
              <div
                style={{
                  backgroundColor: bookingPageCount == 3 ? "#ffc701" : "",
                }}
                onClick={() => {
                  setBookingPageCount(3);
                }}
              >
                Artist
              </div>
              <div
                style={{
                  borderRight: "none",
                  backgroundColor: bookingPageCount == 4 ? "#ffc701" : "",
                }}
                onClick={() => {
                  setBookingPageCount(4);
                }}
              >
                Mix-Master
              </div>
            </div>
          </div>
          <div style={{ justifyContent: bookingPageCount == 1 ? "" : "end" }}>
            <Button
              name={"Card view"}
              icon={<FaTableCellsLarge />}
              style={{ height: "50%", width: "20%", gap: "5%" }}
            />
            <Button
              name={"Filter"}
              icon={<FaFilter />}
              style={{ height: "50%", width: "15%", gap: "5%" }}
            />
            <Button
              name={"Share"}
              icon={<FaShare />}
              style={{ height: "50%", width: "15%", gap: "5%" }}
            />
            {bookingPageCount == 1 ? (
              <Button
                name={"Slot Booking"}
                icon={<LuFilePlus />}
                style={{ height: "50%", width: "28%", gap: "5%" }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div> */}

      <div className={style.studioTabelDiv}>
        <div>
          <table>
            <thead className={style.studiotabelHead}>
              <tr>
                <th>Studio</th>
                <th>Price</th>
                <th>Location</th>
                <th>No. of Rooms</th>
                <th>Activity Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((products) => {
                return (
                  <tr>
                    <td style={{ display: "flex", alignItems: "center" }}>
                      <div className={style.studioImage}>
                        <img src={products.thumbnail} alt="" />
                      </div>
                      &nbsp;&nbsp;{products.title}
                    </td>
                    <td>
                      ₹{products.price}
                      <br />
                      <small>per hour</small>
                    </td>
                    <td>
                      {products.category}
                      <br />
                      <small>Maharastra</small>
                    </td>
                    <td>{products.stock}</td>
                    <td className={style.tableActionbtn}>
                      <div>
                        <Switch />
                      </div>
                      <div>
                        <GrShare style={{ cursor: "pointer" }} />
                        <MdEdit
                          style={{ color: "#ffc701", cursor: "pointer" }}
                        />
                        <RiDeleteBin5Fill
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className={style.tabelpaginationDiv}>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={products.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <StudioFooter setSelectTab={setSelectTab} />
    </>
  );
}

export default AllStudioDetail;
