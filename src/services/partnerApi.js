import api from "./api";
import axios from '../utils/axios';
import TokenService from "../services/token.service"
import { SERVER_API } from "../config/config";

// utils
import { isValidToken, setSession } from '../utils/jwt';

class partnerApi {


    ChangePassword = async (adminId, oldPassword, newPassword) => {
        const response = await api
            .post("/auth/change-password", {
                 adminId, oldPassword, newPassword
            });
        // console.log("response",response)
        if (response.data) {
            return response.data;
        }
    };

    login = async (number='9876543210',role = "studio-owner", userType='NUMBER') => {

        const response = await axios.post('/owners/login', {
            number,
            role,
            userType,
            
        });

        const userData = response.data;

        return userData;
      };

    register = async (phoneNumber='', authType='NUMBER') => {
    const response = await axios.post('/users/send-signup-v2', {
        phoneNumber,
        authType,
    });

    const {status} = response.data
    console.log("res ===>", status)
    return status;
    };

    verifyOtp = async (phoneNumber, otp,role = "studio-owner",option) => {
        const response = await axios.get('/owner/verify-otp', {
           params: {
               phoneNumber,
               otp,
               role,
           }
        }).then((res) => {
            console.log("otp res ===>", res)
            return res.data;
        });
        return response;
    };
    

}

export default new partnerApi();