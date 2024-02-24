import axios from "axios";
import api from "./api"

class Appapi{
  
 getStudios = async (limit,active) => {
  

  const response = await api.get(`/studios-all`, {
    params: {
      limit: limit,
      active: active
    }
  });
  console.log("res ===>", response.data)
  return response.data;
 };

 getServices = async (limit, Type, active) => {
    const response = await api.get(`/services`,{ 
        params: {
            limit: limit,
            serviceType: Type,
            active: active
        }
    });
    const {status} = response.data
    console.log("res ===>", response.data)
    return response.data;
   };
 

}


export default new Appapi();

