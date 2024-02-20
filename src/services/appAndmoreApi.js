import axios from "axios";

class Appapi{
  
  appAndmoreApi() {
    axios.get(
        "https://test.api.choira.io/api/services/bookings",

        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer debugTest",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        const data = response;
        if (data && data.data.services.results) {
          return data.data.services.results;
        }
      });
  }

}


export default new Appapi();

