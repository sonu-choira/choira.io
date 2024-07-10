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
  createDiscount = async (discountData) => {
    const response = await api.post("/discounts/create", discountData);
    console.log("discount create  ===>", response.data)
    return response.data;
  }

  updateDiscount = async (id, discountData) => {
    const response = await api.patch(`discounts/${id}`,
      discountData
    );
    const {status} = response.data
    console.log("discount update  ===>", response.data)
    return response.data;
 
   };
  updateBanner = async (BannerData) => {
    const response = await api.patch(`/settings/editBanner`,
      BannerData
    );
    const {status} = response.data
    console.log("discount update  ===>", response.data)
    return response.data;
 
   };
   createBanner = async (bannerData) => {
    const response = await api.post("/settings/createBanner", bannerData);
    console.log("Banner create  ===>", response.data)
    return response.data;
  }
  
}

export default new promotionApi();
