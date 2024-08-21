
import fileDownload from "js-file-download";
import api from "./api"

class teamApi{
  
 getStudioOwners = async (perPage,active ,pageCount,shortby) => {
  

  const response = await api.get(`/owner`, {
    params: {
      limit: perPage || 7,
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

 
addStudioPartner = async (data) => {
  // let {studioId,roomId,bookingDate,bookingHours} = slotData
  

  const response = await api.post(`/owners/create`, 
    data
  );
  console.log("res ===>", response.data)
  return response.data;
 };

 updateStudioPartner = async (id, data) => {
  const response = await api.patch(`/owners/${id}`,
    data
  );
  const {status} = response.data
  console.log("Studio partner update  ===>", response.data)
  return response.data;

 };


}





export default new teamApi();

