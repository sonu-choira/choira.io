import { partnerAccess } from "../config/partnerAccess";
import api from "./api";

class chartApi {
  getAllCharts = async (timeframe, analytics) => {
let page = "";
if(partnerAccess){
page = "/owners"
}
    const response = await api.get(`${page}/dashboard/analytics`, {
      params: {
        timeframe,
        analytics,
      },
    });

    console.log("res ===>", response.data);
    return response.data;
  };
}

export default new chartApi();