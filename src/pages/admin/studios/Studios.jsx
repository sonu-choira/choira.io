import React, { useEffect, useMemo, useState } from "react";
import "../studios/studios.css";
import WebDashboard from "../../produce/WebDashboard";
import { IoSearch } from "react-icons/io5";
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
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
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
              <div>All Studio</div>
              <div>
                <Button
                  name={"Card view"}
                  icon={<FaTableCellsLarge />}
                  style={{ height: "50%", width: "28%", gap: "5%" }}
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
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                </tr>
              </thead>
              <tbody>
                {currentTableData.map((products) => {
                  return (
                    <tr>
                      <td>{products.id}</td>
                      <td>{products.title}</td>
                      <td>{products.description}</td>
                      <td>{products.stock}</td>
                      <td>{products.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={products.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Studios;
