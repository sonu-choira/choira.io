
import fileDownload from "js-file-download";
import api from "./api"

class teamApi{
  
 getStudioOwners = async (limit,active ,pageCount,shortby) => {
  

  const response = await api.get(`/owner`, {
    params: {
      limit: 10,
      page :pageCount,
      sortDirection: shortby,
      sortField :"creationTimeStamp"
      // active: active
    }
  });
  console.log("res ===>", response.data)
  return response.data;
 };

 getStudioPartner = async () => {
  

  const response = await api.get(`studios/unassignedstudios`, {
  
  });
  console.log("res ===>", response.data)
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

 



}






export default new teamApi();

