// import React, { useEffect, useMemo, useState } from "react";
// import style from "../../../pages/admin/studios/studio.module.css";

// import { GrShare } from "react-icons/gr";
// import { GoEye } from "react-icons/go";
// import { MdEdit } from "react-icons/md";
// import { RiDeleteBin5Fill, RiExpandUpDownLine } from "react-icons/ri";

// import { IoIosArrowBack } from "react-icons/io";
// import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";

// import Button from "../../../pages/admin/layout/Button";
// import Switch from "../../../pages/admin/layout/Switch";
// import Pagination from "../../../pages/admin/studios/Pagination";
// import { LuFilePlus } from "react-icons/lu";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import bookingPageApi from "../../../services/bookingPageApi";
// import ChoiraLoder2 from "../../loader/ChoiraLoder2";
// import { IoCalendarOutline } from "react-icons/io5";
// import { BiSearchAlt } from "react-icons/bi";
// import moment from "moment";
// import { CiFilter } from "react-icons/ci";
// import CheckboxFilter from "../../../pages/admin/layout/filterComponent/CheckboxFilter";
// let PageSize = 10;
// let sendFilterDataToapi = {};

// function StudioBookingDetail({
//   products,
//   setProducts,
//   handleChange,
//   getStatusColor,
//   bookingPageCount,
// }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();
//   // const gotoShowDetails = (id) => {
//   //   const selectedProduct = products.find((product) => product._id === id);
//   //   console.log("navigated=======>", selectedProduct);

//   //   navigate(`/service/showBookingDetails?id=${id}`, {
//   //     state: { productData: selectedProduct },
//   //   });
//   // };

//   const gotoShowDetails = (id) => {
//     const isEditMode = true;
//     const selectedProduct = products.find((product) => product._id === id);
//     console.log("navigated=======>", selectedProduct);

//     navigate(`/studio/edit?id=${id}`, {
//       state: {
//         productData: selectedProduct,
//         navCount: 4,
//         isEditMode: isEditMode,
//         showMode: true,
//       },
//     });
//   };
//   const currentTableData = useMemo(() => {
//     const firstPageIndex = (currentPage - 1) * PageSize;
//     const lastPageIndex = firstPageIndex + PageSize;
//     return products.slice(firstPageIndex, lastPageIndex);
//   }, [currentPage, products]);

//   const [selectedStatus, setSelectedStatus] = useState([]);

//   useEffect(() => {
//     setProducts(products);
//   }, [products]);

//   const getNoOfhours = (bookingTime) => {
//     return moment
//       .duration(
//         moment(bookingTime?.endTime, "HH:mm").diff(
//           moment(bookingTime?.startTime, "HH:mm")
//         )
//       )
//       .asHours();
//   };
//   const closeAllFilter = () => {
//     setShowstatusFilter(false);
//   };
//   const headers = [
//     { title: "Id", width: "5%", icon: <RiExpandUpDownLine /> },
//     { title: "User Name", width: "10%", icon: <RiExpandUpDownLine /> },
//     { title: "Studio Name", width: "10%", icon: <RiExpandUpDownLine /> },
//     { title: "Hours", width: "5%", icon: <CiFilter /> },
//     { title: "Creation Date", width: "10%", icon: <CiFilter /> },
//     { title: "Booking Date", width: "10%", icon: <CiFilter /> },
//     { title: "Time Slot", width: "10%", icon: <CiFilter /> },
//     { title: "Amount", width: "10%", icon: <CiFilter /> },
//     { title: "Project Status", width: "10%", icon: <CiFilter /> },
//     { title: "", width: "10%", icon: "" },
//   ];
//   const [totalPage, setTotalPage] = useState(0);
//   const getDynamicStyle = (shortby, criteria) => ({
//     backgroundColor: shortby !== criteria ? "#ffc70133" : "",
//   });
//   const status = ["active", "cancelled", "completed"];
//   const [showstatusFilter, setShowstatusFilter] = useState(false);

//   return (
//     <>
//       <div className={style.studioTabelDiv}>
//         <div className={style.searchDiv}>
//           <div className={style.puredisabled}>
//             <p>Search by Date </p>
//             <label htmlFor="selectDate">
//               <IoCalendarOutline />
//             </label>
//             {/* <input type="date" id="selectDate" style={{ border: "none" }} /> */}
//           </div>
//           <div className={style.puredisabled}>
//             <BiSearchAlt /> <br />
//             <input
//               type="text"
//               placeholder="Search"
//               className={style.puredisabled}
//               disabled
//               readOnly
//             />
//           </div>
//         </div>
//         <div>
//           <table>
//             <thead className={style.studiotabelHead}>
//               <tr>
//                 {headers.map((header, index) => (
//                   <th key={index} style={{ width: header.width }}>
//                     <div className={style.headingContainer}>
//                       {header.title}
//                       <div
//                         className={header.icon !== "" ? style.filterBox : ""}
//                         // style={getDynamicStyle(shortby, "creationTimeStamp:desc")}
//                         onClick={() => {
//                           if (index == 8) {
//                             setShowstatusFilter(!showstatusFilter);
//                           }
//                         }}
//                         // onClick={handelShortbyClick}
//                       >
//                         <span>{header.icon}</span>
//                         {index == 8 &&
//                           (showstatusFilter ? (
//                             <CheckboxFilter
//                               data={status}
//                               cusstyle={{ left: "-355%" }}
//                               disabledsearch={true}
//                               selectedData={selectedStatus}
//                               setSelectedData={setSelectedStatus}
//                               sendFilterDataToapi={sendFilterDataToapi}
//                               setProducts={setProducts}
//                               setTotalPage={setTotalPage}
//                               bookingPageCount={bookingPageCount}
//                               closeAllFilter={closeAllFilter}
//                             />
//                           ) : (
//                             ""
//                           ))}
//                       </div>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {products.length === 0 ? (
//                 <ChoiraLoder2 />
//               ) : (
//                 currentTableData.map((products, i) => {
//                   return (
//                     <tr key={i}>
//                       <td title={products._id}>#{products._id.slice(-4)}</td>
//                       <td>{products.userName}</td>
//                       <td>
//                         {products.studioName}
//                         <br />
//                         <small>Room name</small>
//                       </td>
//                       <td>{getNoOfhours(products.bookingTime)}</td>
//                       <td
//                         style={{ textAlign: "center" }}
//                         title={moment(products.creationTimeStamp).format(
//                           "Do MMM  YY, hh:mm a "
//                         )}
//                       >
//                         {moment(products.creationTimeStamp).format(
//                           "Do MMM  YY"
//                         )}
//                       </td>
//                       <td
//                         style={{ textAlign: "center" }}
//                         title={moment(products.bookingDate).format(
//                           "Do MMM  YY, hh:mm a "
//                         )}
//                       >
//                         {moment(products.bookingDate).format("Do MMM  YY")}
//                       </td>

//                       {/* <td>{products.planId}</td> */}
//                       <td>
//                         {`${products?.bookingTime?.startTime} - ${products?.bookingTime?.endTime}`}
//                       </td>
//                       <td>₹{products?.totalPrice}</td>
//                       <td>
//                         <div
//                           className={style.userProjectStatus}
//                           style={{
//                             backgroundColor:
//                               parseInt(products.bookingStatus) === 0
//                                 ? "#FFF3CA"
//                                 : parseInt(products.bookingStatus) == 1
//                                 ? "#DDFFF3"
//                                 : "#FFDDDD",
//                           }}
//                         >
//                           {parseInt(products.bookingStatus) === 0
//                             ? "Pending"
//                             : parseInt(products.bookingStatus) == 1
//                             ? "Complete"
//                             : "Cancelled"}
//                         </div>
//                       </td>
//                       <td className={style.tableActionbtn}>
//                         <div>
//                           <GoEye
//                             style={{ cursor: "pointer" }}
//                             onClick={() => {
//                               // gotoShowDetails(products._id);
//                             }}
//                           />{" "}
//                           &nbsp;
//                           <RiDeleteBin5Fill
//                             style={{ color: "red", cursor: "pointer" }}
//                           />
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className={style.tabelpaginationDiv}>
//         <Pagination
//           className="pagination-bar"
//           currentPage={currentPage}
//           totalCount={products.length}
//           pageSize={PageSize}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//       </div>
//     </>
//   );
// }

// export default StudioBookingDetail;
