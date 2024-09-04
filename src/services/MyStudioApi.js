import api from "./api";
class MyStudioApi { 

  getStudios = async () => {
  
  
    const response = await api.get("/owners/studios/studioId", {
      // params: {
      //   limit: 8,
      //   page :pageCount,
      //   // active: active
      // 
    });
    console.log("res ===>", response.data)
    return response.data;
   };
  

   updateStatus = async () => {
  
  
    const response = await api.patch("/owners/studios/studioId/active ", {
      // params: {
      //   limit: 8,
      //   page :pageCount,
      //   // active: active
      // 
    });
    console.log("res ===>", response.data)
    return response.data;
   };

   updateStudio = async (id, studioData) => {
    const response = await api.patch(`/owners/studios/studioId`,{

      ...studioData
    }
    );
    const {status} = response.data
    console.log("postdata ===>", response.data)
    return response.data;
 
   };
}
export default new MyStudioApi();