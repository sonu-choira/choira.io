import api from "./api";
import axios from '../utils/axios';

// utils
import { isValidToken, setSession } from '../utils/jwt';

class AuthService {


    ChangePassword = async (adminId, oldPassword, newPassword) => {
        const response = await api
            .post("/auth/change-password", {
                 adminId, oldPassword, newPassword
            });
        // console.log("response",response)
        if (response.data) {
            return response.data;
        }
    }

    login = async (phoneNumber='', userType='NUMBER', role="user") => {
        const response = await axios.post('/auth/signin', {
            phoneNumber,
            userType,
            role
        });
        const { token, user } = response.data;
        const auth = response.data.status
        const userData = { auth, user, token }
    
        setSession(token);
        console.log("res ===>", userData)
        TokenService.setUser(userData)
        // window.localStorage.setItem('accessToken', accessToken);
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

}

export default new AuthService();