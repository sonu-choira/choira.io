import api from "./api";

class chartApi {
  getAllCharts = async (timeframe, analytics) => {
    const response = await api.get("/dashboard/analytics", {
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