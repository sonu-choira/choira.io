
import api from "./api"

class Appapi{
  
 getStudios = async (limit,active ,pageCount) => {
  

  const response = await api.get(`/studios-all`, {
    params: {
      limit: 10,
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
            limit: limit,
            serviceType: Type,
            active: active,
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
      const response = await api.post(`studios/create`,
        studioData
      );
      const {status} = response.data
      console.log("postdata ===>", response.data)
      return response.data;
   
     };

   updateService = async (serviceId, serviceData) => {
      const response = await api.put(`services/update/${serviceId}`,
      serviceData
      );
      const {status} = response.data
      console.log("postdata ===>", response.data)
      return response.data;
   
     };
     
   updateStudio = async (studioId, studioData) => {
      const response = await api.patch(`studios/${studioId}`,
      studioData
      );
      const {status} = response.data
      console.log("postdata ===>", response.data)
      return response.data;
   
     };

     filterData = async (limit, city,searchText) => {
      const response = await api.get(`/studios-all`,{ 
          params: {
              limit: limit,
              city: city,
              searchText: searchText,
              // active: active,
              // page:pageCount,
          }
      });
      const {status} = response.data
      console.log("res ===>", response.data)
      return response.data;
     };

     filterServiceData = async (serviceType, serviceName) => {
      const response = await api.get(`/services`,{ 
          params: {
            serviceType: serviceType,
              serviceName: serviceName,
              // searchText: searchText,
              // active: active,
              // page:pageCount,
          }
      });
      const {status} = response.data
      console.log("res ===>", response.data)
      return response.data;
     };
}






export default new Appapi();

