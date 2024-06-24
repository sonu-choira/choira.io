import fileDownload from "js-file-download";
import api from "./api"

class promotionApi{ 


  getAllDiscount = async () => {

  const response = await api.get(`/discounts`, {
    
  });
  console.log("Discount detail ===>", response.data)
  return response.data;
 };
}
export default new promotionApi();