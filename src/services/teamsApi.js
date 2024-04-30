
import fileDownload from "js-file-download";
import api from "./api"

class teamApi{
  
 getTeams = async (limit,active ,pageCount) => {
  

  const response = await api.get(`/owners`, {
    params: {
      limit: 10,
      skip :pageCount,
      // active: active
    }
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

