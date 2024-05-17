

import api from "./api"

class deleteAccount{
  
  deleteAccount = async (phone) => {
    
  

  const response = await api.post(`/users/send-otp`, {
      phoneNumber:phone
  });
  console.log("delete res ===>", response.data)
  return response.data;
 };

  checkOtp = async (phone,otp) => {

  const response = await api.get(`/users/verify_otp`, {
    params: {
        phoneNumber:phone,
        otp,
    }
  });
  console.log("delete res ===>", response.data)
  return response.data;
 };

  permanentDeleteAcc = async (userid) => {

  const response = await api.get(`/users/${userid}/delete`, {
    
  });
  console.log("delete res ===>", response.data)
  return response.data;
 };


 



}






export default new deleteAccount();
