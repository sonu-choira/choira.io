
import api from "./api"

 class bookingApi {
  getBookings = async (limit ,active) => {
  

    const response = await api.get(`/bookings`, {
      params: {
        limit: limit,
        active: active
      }
    });
    const {status} = response.data
    console.log("res ===>", response.data)
    return response.data;
   };

   musicProduction = async (limit, Type, active) => {
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




 export default new bookingApi();