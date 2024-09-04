
import api from "./api"

 class bookingApi {
  getBookings = async ({limit, active,bookingType,pageCount,startDate,endDate,searchField}) => {
  


    const response = await api.get(`/bookings`, {
      params: {
        limit: 8,
        active: active,
        bookingType: bookingType,
        page:pageCount,
        startDate,
        endDate,
        searchField,

      }
    });
    const {status} = response.data
    console.log("res ===>", response.data)
    return response.data;
   };

   musicProduction = async ({limit, bookingType, category,pageCount}) => {
    const response = await api.get(`/bookings/services`,{ 
        params: {
            limit: 8,
            bookingType: category,
            page:pageCount,
            
           
            
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
   
   getPartnerBookings = async ({limit, active,bookingType,pageCount,startDate,endDate,searchField}) => {
  
    const response = await api.get(`/owners/bookings/studioId`,{
      params: {
        limit: 8,
        active: active,
        bookingType:bookingType,
        page:pageCount,
        startDate,
        endDate,
        searchField,}

    });
    const {status} = response.data
    console.log("res ===>", response.data)
    return response.data;
   };

 }




 export default new bookingApi();