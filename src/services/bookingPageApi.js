
import api from "./api"

 class bookingApi {
  getBookings = async (limit, active,bookingType,category) => {
  

    const response = await api.get(`/bookings`, {
      params: {
        limit: limit,
        active: active,
        bookingType: bookingType,
        category: category,
      }
    });
    const {status} = response.data
    console.log("res ===>", response.data)
    return response.data;
   };

   musicProduction = async (limit, Type, active) => {
    const response = await api.get(`/bookings/services`,{ 
        params: {
            // limit: limit,
            bookingType: Type,
            // active: active
        }
    });
    const {status} = response.data
    console.log("res ===>", response.data)
    return response.data;
   };

   updateStatus = async (id, selectedstatus) => {
    const response = await api.post(`/bookings/update`,{
      bookingId: id,
      
      bookingStatus: parseInt(selectedstatus),
    });
    const {status} = response.data
    console.log("res ===>", response.data)
    return response.data;
   };

 }




 export default new bookingApi();