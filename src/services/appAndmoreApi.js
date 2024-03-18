
import api from "./api"

class Appapi{
  
 getStudios = async (limit,active ,pageCount) => {
  

  const response = await api.get(`/studios-all`, {
    params: {
      limit: 10,
      page :pageCount,
      sortBy: "_id:desc"
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
            sortBy: "_id:desc"
        }
    });
    const {status} = response.data
    console.log("res ===>", response.data)
    return response.data;
   };
 

}


export default new Appapi();

