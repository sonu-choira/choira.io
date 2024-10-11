// import React, { useContext, useEffect, useMemo, useState } from "react";
// import { Input, Table, Tooltip } from "antd";
// import style from "../../../pages/admin/studios/studio.module.css";

// import { GrShare } from "react-icons/gr";
// import { MdEdit } from "react-icons/md";
// import { RiDeleteBin5Fill } from "react-icons/ri";

// // import Button from "../../../pages/admin/layout/Button";
// import Switch from "../../../pages/admin/layout/Switch";
// import Pagination from "../../../pages/admin/studios/Pagination";
// import { LuFilePlus } from "react-icons/lu";
// import imageNotFound from "../../../assets/imagesNotFound.png";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import PaginationNav from "../../../pages/admin/layout/PaginationNav";
// import ChoiraLoader from "../../loader/ChoiraLoader";
// import ChoiraLoder2 from "../../loader/ChoiraLoder2";
// import { IoCalendarOutline } from "react-icons/io5";
// import { BiSearchAlt } from "react-icons/bi";
// import { RiExpandUpDownLine } from "react-icons/ri";
// import { CiFilter } from "react-icons/ci";
// import { DatePicker, Space } from "antd";
// import PriceFilter from "../../../pages/admin/layout/filterComponent/PriceFilter";
// import CheckboxFilter from "../../../pages/admin/layout/filterComponent/CheckboxFilter";
// import DateAndSearchFilter from "../../../pages/admin/layout/filterComponent/DateAndSearchFilter";
// import appAndmoreApi from "../../../services/appAndmoreApi";
// import LoaderUpdating from "../../../pages/admin/layout/LoaderUpdating";
// import { errorAlert } from "../../../pages/admin/layout/Alert";
// import { GoEye } from "react-icons/go";
// import CopyToClipboard from "../../../pages/admin/layout/CopyToClipboard ";
// import { DownOutlined } from "@ant-design/icons";
// import { AccessContext } from "../../../utils/context";

// import moment from "moment";
// import Button from "../../../pages/admin/layout/Button";

// const AllStudioDetail2 = ({
//   products,
//   setProducts,
//   setPageCount,
//   pageCount,
//   totalPage,
//   bookingPageCount,
//   setTotalPage,
//   filterNav,
//   setfilterNav,
//   sendFilterDataToapi,
// }) => {
//   const [selectedCity, setSelectedCity] = useState([]);
//   const [selectedRoom, setSelectedRoom] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState([]);
//   const [priceFilter, setPriceFilter] = useState([]);
//   const [shortby, setShortby] = useState("creationTimeStamp:desc");
//   const navigate = useNavigate();
//   const tableAccess = useContext(AccessContext);
//   const [loader, setLoader] = useState(false);
//   const [showloader, setShowloader] = useState(false);
//   const [pid, setPid] = useState(0);

//   const pageSize = 10; // You can adjust this based on your need

//   let loading_timeout = null;
//   const handleSwitchChange = (studioId) => {
//     setShowloader(true);
//     appAndmoreApi
//       .updateStudioStatus(studioId)
//       .then((response) => {
//         console.log("response=======>", response.studio);
//         setProducts((prevState) => {
//           return prevState.map((product) => {
//             if (product._id === studioId) {
//               return {
//                 ...product,
//                 isActive: response.studio.isActive,
//               };
//             }
//             return product;
//           });
//         });

//         loading_timeout = setTimeout(() => {
//           setShowloader(false);
//         }, 700);
//       })
//       .catch((error) => {
//         console.log("error=======>", error);
//         errorAlert(error.message || "Something went wrong");
//         setShowloader(false);
//       });
//   };
//   let data = "";
//   const hitallstudioApi = () => {
//     if (bookingPageCount === "c2" || bookingPageCount === "c3") {
//       const idToUse = bookingPageCount === "c2" ? "c2" : "c3";

//       appAndmoreApi
//         .getServices("10", idToUse, 1)
//         .then((response) => {
//           console.log(
//             `====================> response ${bookingPageCount}`,
//             response
//           );
//           if (response.status) {
//             setProducts(response.services.results);
//             console.log("lkasdnflkjsdnf", response.status);
//             setTotalPage(response.paginate.totalPages);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching studios:", error);
//         });
//     } else if (bookingPageCount === "c1") {
//       const limit = 64;
//       const active = 1;

//       appAndmoreApi
//         .getStudios(limit, active)
//         .then((response) => {
//           console.log(
//             `====================> response ${bookingPageCount}`,
//             response
//           );
//           console.log("response.data.studios", response.studios);
//           if (response.studios) {
//             setProducts(response.studios);
//             setTotalPage(response.paginate.totalPages);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching studios:", error);
//         });
//     } else {
//     }
//   };

//   const sendFilterDatatoapi = () => {
//     setProducts([]);
//     setLoader(true);
//     appAndmoreApi
//       .filterData(sendFilterDataToapi)
//       .then((response) => {
//         console.log("filter applied:", response);
//         setProducts(response.studios);
//         setLoader(false);
//         setTotalPage(response.paginate.totalPages);
//       })
//       .catch((error) => {
//         console.error("Error filter studio:", error);
//         setLoader(false);
//       });
//   };
//   const handleTableChange = (pagination, filters, sorter) => {
//     console.log("filters", filters);
//     sendFilterDataToapi.city = filters?.address?.[0];
//     sendFilterDataToapi.totalRooms = filters?.totalRooms?.[0];
//     sendFilterDataToapi.active = filters?.isActive?.[0];

//     sendFilterDatatoapi();
//   };
//   const gotoEdit = (id) => {
//     const isEditMode = true;
//     const selectedProduct = products.find((product) => product._id === id);
//     console.log("navigated=======>", selectedProduct);

//     navigate(`/studio/edit?id=${id}`, {
//       state: {
//         productData: selectedProduct,
//         navCount: 3,
//         isEditMode: isEditMode,
//       },
//     });
//   };
//   useEffect(() => {
//     sendFilterDataToapi.city = selectedCity[0];
//     sendFilterDataToapi.totalRooms = selectedRoom[0];
//     sendFilterDataToapi.active =
//       selectedStatus[0] === "active"
//         ? 1
//         : selectedStatus[0] === "inactive"
//         ? "0"
//         : "";
//     sendFilterDataToapi.minPricePerHour = priceFilter.minPrice;
//     sendFilterDataToapi.maxPricePerHour = priceFilter.maxPrice;
//     // sendFilterDataToapi.creationTimeStamp = selectedDate;
//     sendFilterDataToapi.sortBy = shortby;

//     console.log(sendFilterDataToapi);
//   }, [
//     selectedCity,
//     selectedRoom,
//     selectedStatus,
//     priceFilter,
//     // selectedDate,
//     shortby,
//   ]);

//   useEffect(() => {
//     setProducts([]);
//     appAndmoreApi
//       .filterData(sendFilterDataToapi)
//       .then((response) => {
//         console.log("filter applied:", response);
//         setProducts(response.studios);
//         setTotalPage(response.paginate.totalPages);
//       })
//       .catch((error) => {
//         console.error("Error filter studio:", error);
//       });

//     return () => {
//       setProducts([]);
//     };
//   }, [shortby]);
//   const handelShortbyClick = () => {
//     if (shortby == "creationTimeStamp:asc") {
//       setShortby("creationTimeStamp:desc");
//     } else {
//       setShortby("creationTimeStamp:asc");
//     }
//   };

//   const gotoShowStudioDetails = (id) => {
//     const isEditMode = true;
//     const selectedProduct = products.find((product) => product._id === id);
//     console.log("navigated=======>", selectedProduct);
//     // alert(selectedProduct);
//     navigate(`/studio/edit?id=${id}`, {
//       state: {
//         productData: selectedProduct,
//         navCount: 4,
//         isEditMode: isEditMode,
//         showMode: true,
//       },
//     });
//   };
//   useEffect(() => {
//     return () => {
//       clearTimeout(loading_timeout);
//     };
//   }, []);

//   const [startPrice, setStartPrice] = useState();
//   const [endPrice, setEndPrice] = useState();
//   const [filteredData, setFilteredData] = useState(data);

//   // Apply price filter
//   const handleApply = () => {
//     const filtered = data.filter((item) => {
//       const itemPrice = item.price;
//       const isWithinRange =
//         (!startPrice || itemPrice >= Number(startPrice)) &&
//         (!endPrice || itemPrice <= Number(endPrice));
//       return isWithinRange;
//     });
//     setFilteredData(filtered);
//   };

//   // Reset price filter
//   const handleReset = () => {
//     setStartPrice();
//     setEndPrice();
//     setFilteredData(data); // Reset to original data
//   };

//   const priceFilters = (
//     <div style={{ padding: 10 }}>
//       <div>
//         <label>Start Price</label>
//         <Input
//           value={startPrice}
//           onChange={(e) => setStartPrice(e.target.value)}
//           prefix="₹"
//           placeholder="Enter start price"
//           type="number" // Set input type as number
//           style={{ marginBottom: 8 }}
//         />
//       </div>
//       <div>
//         <label>End Price</label>
//         <Input
//           value={endPrice}
//           onChange={(e) => setEndPrice(e.target.value)}
//           prefix="₹"
//           placeholder="Enter end price"
//           type="number" // Set input type as number
//           style={{ marginBottom: 8 }}
//         />
//       </div>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <Button onClick={handleReset} size="small">
//           Reset
//         </Button>
//         <Button onClick={handleApply} type="primary" size="small">
//           OK
//         </Button>
//       </div>
//     </div>
//   );
//   const columns = [
//     {
//       title: "Studio",
//       dataIndex: "fullName",
//       key: "fullName",
//       sorter: (a, b) => handelShortbyClick(),
//       render: (text, record) => (
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <div className={style.studioImage}>
//             {record.studioPhotos ? (
//               <img
//                 src={record.studioPhotos[0]}
//                 alt=""
//                 onError={(e) => {
//                   e.target.src = imageNotFound;
//                 }}
//               />
//             ) : (
//               <img src={imageNotFound} alt="" />
//             )}
//           </div>
//           &nbsp;&nbsp;
//           <CopyToClipboard textToCopy={text} />
//         </div>
//       ),
//     },
//     {
//       title: "Price",
//       dataIndex: ["roomsDetails", "0", "pricePerHour"],
//       key: "pricePerHour",
//       filterDropdown: () => priceFilters, // Dropdown for custom price filter
//       filterIcon: () => <DownOutlined />, // Filter icon
//       render: (price) => (
//         <span>
//           ₹{price || "N/A"} <br />
//           <small>per hour</small>
//         </span>
//       ),
//     },
//     {
//       title: "Location",
//       dataIndex: "address",
//       key: "address",
//       render: (address, record) => (
//         <>
//           <CopyToClipboard textToCopy={address} textLength={30} />
//           <br />
//           <small>
//             <CopyToClipboard textToCopy={record.state} />
//           </small>
//         </>
//       ),
//       filters: [
//         {
//           text: "Mumbai",
//           value: "mumbai",
//         },
//         {
//           text: "Delhi",
//           value: "Delhi",
//         },
//         {
//           text: "Bangalore",
//           value: "Bangalore",
//         },
//         {
//           text: "Chennai",
//           value: "Chennai",
//         },
//       ],
//       filterMultiple: false,
//       // specify the condition of filtering result
//       // here is that finding the name started with `value`
//       // onFilter: (value, record) =>
//       //   console.log("valus is ", value, "record is ", record),

//       // onFilter: (value, record) => (
//       //   (sendFilterDataToapi.city = value), sendFilterDatatoapi()
//       // ),
//       reset: () => alert("Reset filters"),
//     },
//     {
//       title: "No. of Rooms",
//       dataIndex: "totalRooms",
//       key: "totalRooms",
//       filters: [
//         {
//           text: "1",
//           value: "1",
//         },
//         {
//           text: "2",
//           value: "2",
//         },
//         {
//           text: "3",
//           value: "3",
//         },
//         {
//           text: "4",
//           value: "4",
//         },
//         {
//           text: "5",
//           value: "5",
//         },
//       ],
//       filterMultiple: false,
//       // specify the condition of filtering result
//       // here is that finding the name started with `value`
//       // onFilter: (value, record) => record.name.indexOf(value) === 0,
//     },
//     {
//       title: "Created on",
//       dataIndex: "creationTimeStamp",
//       key: "creationTimeStamp",
//       render: (timestamp) => moment(timestamp).format("Do MMM YY, hh:mm a"),
//     },
//     {
//       title: "Activity Status",
//       dataIndex: "isActive",
//       key: "isActive",
//       render: (isActive, record) => (
//         <Switch
//           status={record.isActive}
//           isloading={pid === record._id && showloader}
//           onClick={() => {
//             setPid(record._id);
//             handleSwitchChange(record._id);
//           }}
//           disabled={tableAccess?.["app&more"]?.action === "read"}
//         />
//       ),
//       filters: [
//         {
//           text: "active",
//           value: 1,
//         },
//         {
//           text: "inactive",
//           value: "0",
//         },
//       ],
//       filterMultiple: false,
//       // specify the condition of filtering result
//       // here is that finding the name started with `value`
//       // onFilter: (value, record) => record.name.indexOf(value) === 0,
//     },

//     {
//       title: "   ",
//       dataIndex: "",
//       key: "",
//       render: (_, record) => (
//         <div>
//           <Tooltip title="view">
//             <GoEye
//               style={{ cursor: "pointer" }}
//               onClick={() => {
//                 gotoShowStudioDetails(record._id);
//               }}
//             />
//           </Tooltip>
//           &nbsp; &nbsp;
//           <Tooltip title="Edit">
//             <MdEdit
//               style={{ cursor: "pointer" }}
//               onClick={() => {
//                 gotoEdit(record._id);
//               }}
//             />
//           </Tooltip>
//           &nbsp; &nbsp;
//           <Tooltip title="Delete">
//             <RiDeleteBin5Fill
//               style={{ cursor: "pointer", marginLeft: 8 }}
//               onClick={() => console.log("Delete", record._id)}
//             />
//           </Tooltip>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div className={style.studioTabelDiv}>
//         <DateAndSearchFilter
//           setProducts={setProducts}
//           setTotalPage={setTotalPage}
//           bookingPageCount={bookingPageCount}
//           filterNav={filterNav}
//           setfilterNav={setfilterNav}
//           sendFilterDataToapi={sendFilterDataToapi}
//           setSelectedCity={setSelectedCity}
//           setSelectedRoom={setSelectedRoom}
//           setSelectedStatus={setSelectedStatus}
//           setPriceFilter={setPriceFilter}
//           setShortby={setShortby}
//         />
//         <div>
//           <Table
//             columns={columns}
//             dataSource={products}
//             rowKey="_id"
//             pagination={false} // Disable Ant Design's default pagination
//             onChange={handleTableChange}
//             loading={loader}
//           />

//           {/* Your Custom Pagination Component */}
//         </div>
//       </div>
//       <div className={style.tabelpaginationDiv}>
//         <PaginationNav
//           pageCount={pageCount}
//           totalPage={totalPage}
//           setPageCount={setPageCount}
//           bookingPageCount={pageSize} // Page size or items per page
//         />
//       </div>
//     </>
//   );
// };

// export default AllStudioDetail2;
