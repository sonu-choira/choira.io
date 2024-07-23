
import fileDownload from "js-file-download";
import api from "./api"

class userApi{
  
 getAllUser = async (pageCount,userAllFilterData,options={}) => {
  const { cancelToken } = options;
  let { searchUser, status, sortfield,startDate,endDate,sortDirection } = userAllFilterData;
  if (searchUser === "") {
    searchUser = undefined;
  } 
   if (status === "") {
    status = undefined;
  } 
   if (sortfield === "") {
    sortfield = undefined;
  }
   if (startDate === "") {
    startDate = undefined;
  }
   if (endDate === "") {
    endDate = undefined;
  }

  const response = await api.get('/users', {
    params: {

      limit: 5,
      page: pageCount,

      sortfield,
      sortDirection,
      status,
      searchUser,
      startDate,
      endDate,
    },
    cancelToken,
  });
  
  console.log("res ===>", response.data)
  return response.data;
 };

 getSpecificUser = async (userid) => {

  const response = await api.get(`/users/${userid}`, {
    
  });
  console.log("user data res ===>", response.data)
  return response.data;
 };


 getuserStudioBooking = async (userId,pageCount) => {
  

  const response = await api.get(`/bookings/user/${userId}`, {
    params: {
    
      source: "website",
      limit: 10,
      page :pageCount,
      // active: active
    }
  });
  console.log(" user service data res ===>", response)
  return response;
 };


 getUserServiceBooking = async (userId,pageCount) => {
  

  const response = await api.get(`/bookings/services/${userId}`, {
    params: {
    
      source: "website",
      limit: 10,
      page :pageCount,
      // active: active
    }
  });
  console.log(" user service data res ===>", response)
  return response;
 };


 getUserServiceBooking = async (userId,pageCount) => {
  

  const response = await api.get(`/bookings/services`, {
    params: {
      userId: userId,
      limit: 10,
      page :pageCount,
      // active: active
    }
  });
  console.log(" user service data res ===>", response.data)
  return response.data;
 };

 

//  getServices = async (limit, Type, active ,pageCount) => {
//     const response = await api.get(`/services`,{ 
//         params: {
//             limit: limit,
//             serviceType: Type,
//             active: active,
//             page:pageCount,
//         }
//     });
//     const {status} = response.data
//     console.log("res ===>", response.data)
//     return response.data;
//    };

 



 downloadUserData = async (allfilterData) => {

  const filteredObject = {};
  for (const key in allfilterData) {
    if (allfilterData[key]) {
      filteredObject[key] = allfilterData[key];
    }
  }
    
    const response = await api.get(`/userData/exports`,{ 
        params: filteredObject,
        responseType:'blob',
    }).then((res)=>{
      fileDownload(res.data,"userData.xlsx")
    })
    const {status} = response.data
    console.log("res ===>", response.data)
    return response.data;
   };


}






export default new userApi();

