
import fileDownload from "js-file-download";
import api from "./api"
import { partnerAccess } from "../config/partnerAccess";

class Appapi{
  
 getStudios = async (limit,active ,pageCount) => {
  let link = ""
  if(partnerAccess){
    link = " /owners/studios/studioId"
  }else{
    link = "/studios-all"
  }

  const response = await api.get(link, {
    params: {
      limit: 8,
      page :pageCount,
      // active: active
    }
  });
  console.log("res ===>", response.data)
  return response.data;
 };

 getServices = async (limit, Type, active ,pageCount) => {
    const response = await api.get(`/services`,{ 
        params: {
            limit: 8,
            serviceType: Type,
            // active: active,
            page:pageCount,
        }
    });
    const {status} = response.data
    console.log("res ===>", response.data)
    return response.data;
   };

 createService = async (serviceData) => {
    const response = await api.post(`services/create`, 
      serviceData
    );
    const {status} = response.data
    console.log("postdata ===>", response.data)
    return response.data;

   };
 

   createStudio = async (studioData) => {
      const response = await api.post(`studios/create`,studioData);
      const {status} = response.data
      console.log("postdata ===>", response.data)
      return response.data;
   
     };

   updateService = async (serviceId, serviceData) => {

    try {
      const response = await api.put(`services/update/${serviceId}`,
      serviceData
      );
      const {status} = response.data
      console.log("postdata ===>", response.data)
      return response.data;
    } catch (error) {
      console.log(error)

      return error
    }
      
   
     };
     
   updateStudio = async (studioId, studioData) => {
      const response = await api.patch(`studios/${studioId}`,
      studioData
      );
      const {status} = response.data
      console.log("postdata ===>", response.data)
      return response.data;
   
     };

     filterData = async (allfilterData) => {

    const filteredObject = {};
    for (const key in allfilterData) {
      if (allfilterData[key]) {
        filteredObject[key] = allfilterData[key];
      }
    }
      filteredObject.limit = 7;

      const response = await api.get("/studios-all",{ 
          params: filteredObject
      });
      const {status} = response.data
      console.log("res ===>", response.data)
      return response.data;
     };

     filterServiceData = async (allserviceFiltrer) => {
      const filteredObject = {};
      for (const key in allserviceFiltrer) {
        if (allserviceFiltrer[key]) {
          filteredObject[key] = allserviceFiltrer[key];
        }
      }
        filteredObject.limit = 5;
      const response = await api.get(`/services`,{ 
          params: filteredObject
      });
      const {status} = response.data
      console.log("res ===>", response.data)
      return response.data;
     };


     downloadData = async (allfilterData) => {

      const filteredObject = {};
      for (const key in allfilterData) {
        if (allfilterData[key]) {
          filteredObject[key] = allfilterData[key];
        }
      }
        
        const response = await api.get(`/exportStudiosData`,{ 
            params: filteredObject,
            responseType:'blob',
        }).then((res)=>{
          fileDownload(res.data,"studioData.xlsx")
        })
        const {status} = response.data
        console.log("res ===>", response.data)
        return response.data;
       };

     downloadServiceData = async (allfilterData) => {

      const filteredObject = {};
      for (const key in allfilterData) {
        if (allfilterData[key]) {
          filteredObject[key] = allfilterData[key];
        }
      }
        
        const response = await api.get(`/exportServicesData`,{ 
            params: filteredObject,
            responseType:'blob',
        }).then((res)=>{
          fileDownload(res.data,"serviceData.xlsx")
        })
        const {status} = response.data
        console.log("res ===>", response.data)
        return response.data;
       };

     downloadBookingServiceData = async (type) => {

   
        
        const response = await api.get(`exportBookingData`,{ 
            params: type,
            responseType:'blob',
        }).then((res)=>{
          fileDownload(res.data,"bookings.xlsx")
        })
        const {status} = response.data
        console.log("res ===>", response.data)
        return response.data;
       };
       updateStudioStatus = async (studioId) => {
        const response = await api.patch(`/studios/studioId/active`,{
         
            studioId: studioId,
         
        }
        
       
        );
        const {status} = response.data
        console.log("postdata ===>", response.data)
        return response.data;
     
       };

       updateServiceStatus = async (studioId,isActive) => {
        const response = await api.put(`/services/update/${studioId}`,{
         
           isActive,
         
        }
        
       
        );
        const {status} = response.data
        console.log("postdata ===>", response.data)
        return response.data;
     
       };


}






export default new Appapi();

