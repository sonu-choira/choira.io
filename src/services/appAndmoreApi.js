
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
}






export default new Appapi();

