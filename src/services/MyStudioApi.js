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

  
}
export default new MyStudioApi();