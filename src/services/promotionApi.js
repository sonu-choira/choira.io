import api from "./api";

class promotionApi {
  getAllDiscount = async () => {
    const response = await api.get(`/discounts`);
    console.log("Discount detail ===>", response.data);
    return response.data;
  };

  getAllBanner = async () => {
    const response = await api.get(`/settings/banner`);
    console.log("Banner detail ===>", response.data);
    return response.data;
  };

  updateDiscount = async (id, discountData) => {
    const response = await api.patch(`discounts/${id}`,
      discountData
    );
    const {status} = response.data
    console.log("discount update  ===>", response.data)
    return response.data;
 
   };
}

export default new promotionApi();
