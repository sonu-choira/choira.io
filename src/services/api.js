import axios from "axios";
import TokenService from "./token.service";
import { SERVER_API } from '../config/config';

const instance = axios.create({

  baseURL: `${SERVER_API}`, // HOST_API,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin" : "*"
  },
});
// console.log("INSTAN", instance)
instance.interceptors.request.use(
  (config) => {
    // console.log("SERVER_API-----", SERVER_API);
    const token = TokenService.getLocalAccessToken();
    // console.log(token);
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    // console.log("config", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    console.log("the response is =============>",res);
    return res;
  },
  // async (err) => {
  //   const originalConfig = err.config;
  //   if (originalConfig.url !== "/auth/signin" && err.response) {
  //     // Access Token was expired
  //     if (err.response.status === 401 && !originalConfig._retry) {
  //       originalConfig._retry = true;
  //       try {
  //           console.log("err-----", err);
  //         // const rs = await instance.post("/auth/refreshtoken", {
  //         //   refreshToken: TokenService.getLocalRefreshToken(),
  //         // });
  //         // const { accessToken } = rs.data;
  //         // TokenService.updateLocalAccessToken(accessToken);
  //         return instance(originalConfig);
  //       } catch (_error) {
  //         return Promise.reject(_error);
  //       }
  //     }else if(err.response.status === 417){
  //       return Promise.resolve(err);
  //     }
  //   }
  //   return Promise.reject(err);
  // }
);

export default instance;
