import React, { useEffect, useState } from "react";
import StudioPartners from "../teamsSection/StudioPartners";
import TeamsActionBar from "../teamsSection/TeamActionBar";
import style from "../../pages/admin/studios/studio.module.css";
import Button from "../../pages/admin/layout/Button";
import { FaDownload } from "react-icons/fa6";
import teamsApi from "../../services/teamsApi";
import PaginationNav from "../../pages/admin/layout/PaginationNav";
import ChoiraLoder2 from "../loader/ChoiraLoder2";
import { CiFilter } from "react-icons/ci";
import DateAndSearchFilter from "../../pages/admin/layout/filterComponent/DateAndSearchFilter";
import { RiDeleteBin5Fill, RiExpandUpDownLine } from "react-icons/ri";
import { GrShare } from "react-icons/gr";
import userApi from "../../services/userApi";
import imageNotFound from "../../assets/imagesNotFound.png";
import { FaRegEye } from "react-icons/fa";
import userNotFound from "../../assets/img/userNotFound.jpg";
import CheckboxFilter from "../../pages/admin/layout/filterComponent/CheckboxFilter";
import UserProfile from "./UserProfile";
import Alert from "antd/es/alert/Alert";
import { errorAlert } from "../../pages/admin/layout/Alert";
import moment from "moment";

import Switch from "../../pages/admin/layout/Switch";

import axios from "axios";
import CopyToClipboard from "../../pages/admin/layout/CopyToClipboard ";
import { Table, Tooltip } from "antd";
import { useMutation, useQuery } from "react-query";

let userAllFilterData = {
  sortfield: "",
  status: "",
  searchUser: "",
  startDate: undefined,
  endDate: undefined,
};
function ShowAllUser() {
  const [products, setProducts] = useState([]);
  const [totalResult, setTotalResult] = useState();
  const [selectedStatus, setSelectedStatus] = useState([]);

  const [perPage, setPerPage] = useState(7);
  const [totalPage, setTotalPage] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [filterNav, setfilterNav] = useState(false);
  const [shortby, setShortby] = useState(false);
  const status = ["active", "inactive"];

  const [shortBySrNo, setShortBySrNo] = useState(false);
  const [shortByUser, setShortByUser] = useState(false);
  const [shortByEmail, setShortByEmail] = useState(false);

  const handelStatusFilter = () => {
    setShowstatusFilter((prevState) => {
      if (!prevState) {
        // If toggling to true, set other filters to false

        setShowRoomFilter(false);
      }
      return !prevState;
    });
  };

  const useFilteredUsers = () => {
    return useMutation(
      ({ perPage, pageCount, userAllFilterData }) =>
        userApi.getAllUser(perPage, pageCount, userAllFilterData),
      {
        // On success, update the state with the response data
        onSuccess: (response) => {
          if (response.users) {
            setProducts(response.users);
            setTotalPage(response.paginate.totalPages);
            setTotalResult(response.paginate.totalResults);
          }
        },
        // Handle any errors that occur during the API request
        onError: (error) => {
          console.error("Error fetching users:", error);
        },
      }
    );
  };
  const { mutate: fetchFilteredUsers, isLoading, error } = useFilteredUsers();

  // Handle the API call when the filter is applied
  const handleFilterApi = (pageCount, userAllFilterData) => {
    fetchFilteredUsers({
      perPage,
      pageCount,
      userAllFilterData,
    });
  };

  useEffect(() => {
    setProducts([]); // Clear products on filter/sort change

    if (selectedStatus[0]) {
      userAllFilterData.status =
        selectedStatus[0] === "active"
          ? 1
          : selectedStatus[0] === "inactive"
          ? 0
          : undefined;
    } else {
      let dataToSend;
      if (shortByUser) {
        dataToSend = "fullName";
        userAllFilterData.sortfield = dataToSend;
        userAllFilterData.sortDirection =
          userAllFilterData.sortDirection === "asc" ? "desc" : "asc";
      } else if (shortByEmail) {
        dataToSend = "email";
        userAllFilterData.sortfield = dataToSend;
        userAllFilterData.sortDirection =
          userAllFilterData.sortDirection === "asc" ? "desc" : "asc";
      } else if (shortBySrNo) {
        userAllFilterData.sortDirection =
          userAllFilterData.sortDirection === "asc" ? "desc" : "asc";
      }
    }
  }, [
    selectedStatus,
    shortByUser,
    shortByEmail,
    shortBySrNo,
    userAllFilterData,
  ]);
  const fetchUsers = async ({ queryKey }) => {
    const [_, perPage, pageCount, userAllFilterData, cancelToken] = queryKey;
    const response = await userApi.getAllUser(
      perPage,
      pageCount,
      userAllFilterData,
      { cancelToken }
    );
    return response;
  };
  const { data, isloading, isFetching } = useQuery(
    ["users", perPage, pageCount, userAllFilterData],
    async ({ signal }) => {
      const source = axios.CancelToken.source();
      signal.addEventListener("abort", () => {
        source.cancel();
      });
      return fetchUsers({
        queryKey: [
          "users",
          perPage,
          pageCount,
          userAllFilterData,
          source.token,
        ],
      });
    },
    {
      keepPreviousData: true, // Keeps previous data to prevent flickering
      onSuccess: (response) => {
        if (response.users) {
          setProducts(response.users);
          setTotalPage(response.paginate.totalPages);
          setTotalResult(response.paginate.totalResults);
        }
      },
      onError: (error) => {
        console.error("Error fetching users:", error);
      },
      refetchOnWindowFocus: false, // Optional: prevent refetch on window focus
    }
  );

  const [selectedCity, setSelectedCity] = useState([]);

  const [showstatusFilter, setShowstatusFilter] = useState(false);
  const closeAllFilter = () => {
    setShowstatusFilter(false);
  };

  // var selectedDate = "";
  const [priceFilter, setPriceFilter] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const [showRoomFilter, setShowRoomFilter] = useState(false);
  const [showCityFilter, setShowCityFilter] = useState(false);
  const userFiler = true;

  const handleSortBySrNo = () => {
    console.log("shortBySrNo", shortBySrNo);

    setShortBySrNo(!shortBySrNo);
    setShortByUser(false);
    setShortByEmail(false);
  };
  useEffect(() => {
    userAllFilterData.sortDirection = shortBySrNo ? "asc" : "desc";
    handleFilterApi(pageCount, userAllFilterData);

    // setProducts((prev) => [...prev].reverse());
  }, [shortBySrNo]);

  const handleSortByUser = () => {
    setShortBySrNo(false);
    setShortByUser(!shortByUser);
    setShortByEmail(false);
  };
  const handelShortBySrno = () => {
    setShortBySrNo(false);
    setShortByUser(!shortByUser);
    setShortByEmail(false);
  };

  const handleSortByEmail = () => {
    setShortBySrNo(false);
    setShortByUser(false);
    setShortByEmail(!shortByEmail);
  };
  const [userFilterText, setUserFilterText] = useState("");
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userAllDetails, setuserAllDetails] = useState("");
  let userid = "";
  const showUserDetails = (id) => {
    console.log("id", id);
    userid = id;
    console.log(userid, "user id is------------------------");
    setuserAllDetails("");
    setShowUserProfile(true);

    userApi
      .getSpecificUser(id)
      .then((response) => {
        console.log(`====================> response `, response);
        // console.log("response.data.users", response.data.user);
        console.log("response.users", response.user);

        if (response.user) {
          setuserAllDetails(response.user);
        }
      })
      .catch((error) => {
        console.error("Error fetching studios:", error);
        setShowUserProfile(false);
        errorAlert("Something went wrong");
      });

    // setShowUserProfile(true);
  };
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  let loaderText = "Downloading ...";
  const downloadUserData = () => {
    setShowBtnLoader(true);
    userApi
      .downloadUserData(userAllFilterData)
      .then((response) => {
        console.log("data download", response);
        setShowBtnLoader(false);
      })
      .catch((error) => {
        console.error("Error download data:", error);
        setShowBtnLoader(false);
      });
  };
  const handleTableChange = (pagination, filters, sorter) => {
    let selectedData = filters?.status?.[0] || "";

    setProducts([]);
    setPageCount(1);

    userAllFilterData.status = selectedData;

    userApi
      .getAllUser(perPage, pageCount, userAllFilterData)
      .then((response) => {
        console.log("filter applied:", response);
        setProducts(response.users);
        setTotalPage(response.paginate.totalPages);
      })
      .catch((error) => {
        console.error("Error filter studio:", error);
      });
  };
  const columns = [
    {
      title: " Sr.No.",
      dataIndex: "srNo",
      sorter: (a, b) => handleSortBySrNo(),

      render: (_, __, index) =>
        !shortBySrNo
          ? isNaN(totalResult - pageCount * perPage + perPage - index)
            ? "N/A"
            : index + 1 + (pageCount - 1) * perPage
          : isNaN(index + 1 + (pageCount - 1) * perPage)
          ? "N/A"
          : totalResult - pageCount * perPage + perPage - index,
    },

    {
      title: "Users",
      dataIndex: "fullName",
      sorter: (a, b) => handleSortByUser(),

      render(text, record) {
        return (
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
                  src={record?.profileUrl || userNotFound}
                  alt=""
                  onError={(e) => (e.target.src = userNotFound)}
                />
              </div>
              &nbsp;&nbsp;
              <CopyToClipboard textToCopy={record.fullName} />
            </div>
          </>
        );
      },
    },
    {
      title: "Mobile",
      dataIndex: "phone",
      render: (phone) => <CopyToClipboard textToCopy={phone} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => <CopyToClipboard textToCopy={email} />,
      sorter: (a, b) => handleSortByEmail(),
    },
    {
      title: "Created on",
      dataIndex: "creationTimeStamp",
      render: (creationTimeStamp) =>
        moment(creationTimeStamp).format("Do MMM  YY, hh:mm a"),
    },
    {
      title: "Activity Status",
      dataIndex: "status",
      render: (status) => <Switch status={status} switchDisabled={true} />,
      filters: [
        {
          text: "active",
          value: 1,
        },
        {
          text: "inactive",
          value: "0",
        },
      ],
      filterMultiple: false,
    },
    {
      title: "",
      render: (record) => (
        <Tooltip title="View Details">
          <FaRegEye onClick={() => showUserDetails(record._id)} />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      {showUserProfile ? (
        <UserProfile
          userAllDetails={userAllDetails}
          setShowUserProfile={setShowUserProfile}
          userid={userid}
        />
      ) : (
        <>
          <div className={style.allStudioDetailsPage}>
            <div
              className={style.bookingStudiobtn}
              style={{ marginBottom: "2%" }}
            >
              <div>
                <div style={{ background: "none" }}>All User</div>
              </div>
              <div>
                <Button
                  name={"Download"}
                  icon={<FaDownload />}
                  style={{ height: "60%", gap: "5%" }}
                  // disabled={true}
                  onClick={downloadUserData}
                  showBtnLoader={showBtnLoader}
                  loaderText={loaderText}
                />
              </div>
            </div>
            <div className={style.studioTabelDiv}>
              <DateAndSearchFilter
                setProducts={setProducts}
                setTotalPage={setTotalPage}
                pageCount={pageCount}
                perPage={perPage}
                setPageCount={setPageCount}
                userFiler={userFiler}
                setUserFilterText={setUserFilterText}
                userFilterText={userFilterText}
                userAllFilterData={userAllFilterData}
              />
              <div>
                <Table
                  columns={columns}
                  dataSource={products}
                  rowKey="_id"
                  pagination={false} // Disable Ant Design's default pagination
                  onChange={handleTableChange}
                  locale={{ emptyText: <ChoiraLoder2 /> }}
                  // loading={loader}
                />

                {/* Your Custom Pagination Component */}
              </div>
            </div>
            <div className={style.tabelpaginationDiv}>
              <PaginationNav
                pageCount={pageCount}
                totalPage={totalPage}
                setPageCount={setPageCount}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ShowAllUser;
