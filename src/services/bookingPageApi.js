
import api from "./api"

 class bookingApi {
  getBookings = async (limit ,active) => {
  

    const response = await api.get(`/bookings/services`, {
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
    const response = await api.get(`/bookings/services`,{ 
        params: {
            limit: limit,
            bookingType: Type,
            active: active
        }
    });
    const {status} = response.data
    console.log("res ===>", response.data)
    return response.data;
   };

 }




 export default new bookingApi();