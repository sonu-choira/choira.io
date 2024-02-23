import axios from 'axios';
// config
import { SERVER_API } from '../config/config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: `${SERVER_API}/api`, // HOST_API,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin" : "*"
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
