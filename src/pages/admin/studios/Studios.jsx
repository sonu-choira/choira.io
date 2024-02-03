import React, { useEffect, useMemo, useState } from "react";
import "../studios/studios.css";
import WebDashboard from "../../produce/WebDashboard";
import { IoSearch } from "react-icons/io5";
import { GrShare } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import {
  FaCheckDouble,
  FaFilter,
  FaRegBell,
  FaRegClock,
  FaShare,
} from "react-icons/fa6";
import { MdCalendarMonth, MdOutlineSettings } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { LuFilePlus } from "react-icons/lu";
import Pagination from "./Pagination";
import data from "../studios/mock-data.json";
import Button from "../layout/Button";
import { FaTableCellsLarge } from "react-icons/fa6";
import Switch from "../layout/Switch";

let PageSize = 10;
function Studios() {
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
      <div className="wrapper">
        <WebDashboard />
        <div className="studioMainScreen">
          <div className="studioHeader">
            <div>
              <input type="text" placeholder="search" />
            </div>
            <div>
              <IoSearch />
            </div>
            <div>
              <div className="notifyIcon">
                <GoDotFill />
              </div>
              <FaRegBell />
            </div>
            <div>
              <MdOutlineSettings />
            </div>
          </div>
          {/* <div className="onboardStudio">
            <div>👋 Hey Stacy!</div>
            <div>Let’s Onboard Studios</div>
            <div>
              <div>
                <div>
                  <FaRegClock />
                </div>
                <div>All studio</div>
              </div>
              <div>
                <div>
                  <LuFilePlus />
                </div>
                <div>Add new studio</div>
              </div>
              <div>
                <div>
                  <FaCheckDouble />
                </div>
                <div>Bookings</div>
              </div>
              <div>
                <div>
                  <MdCalendarMonth />
                </div>
                <div>Slot Booking</div>
              </div>
            </div>
          </div> */}
          <div className="allStudioDetailsPage">
            <div className="allStudiobtndiv">
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
            </div>
            <div className="studioTabelDiv">
              <div>
                <table>
                  <thead className="studiotabelHead">
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
                            <div className="studioImage">
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
                          <td className="tableActionbtn">
                            <div>
                              <Switch />
                            </div>
                            <div>
                              <GrShare />
                              <MdEdit style={{ color: "#ffc701" }} />
                              <RiDeleteBin5Fill style={{ color: "red" }} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="tabelpaginationDiv">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={products.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div className="studioFooter">
              <Button
                name={"Back"}
                icon={<IoIosArrowBack />}
                style={{ height: "55%" }}
              />
              <Button name={"Save"} style={{ height: "55%" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Studios;
