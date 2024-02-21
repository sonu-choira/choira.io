import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';


// pages
import Signin from '../pages/home/Signin';

// components
import ChoiraLoader from '../components/loader/ChoiraLoader';

// utils
import { isValidToken, setSession } from '../utils/jwt.js';
// Services
import TokenService from '../services/token.service';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [requestedLocation, setRequestedLocation] = useState(null);
  const accessToken = TokenService.getLocalAccessToken();

  useEffect(() => {
    const initialize = async () => {
      try {
        if (accessToken && isValidToken(accessToken)) {

        //   const adminId = TokenService.getUser().userInfo.id;
          let user = {auth: true, info : {}  }
        //   const response = await axios.post('/api/user/info', { adminId });
        //   const userData = response.data?.data.userInfo;
        //   if(userData) user.info = userData

          TokenService.setData("userDetails",user );
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setIsInitialized(true);
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
        setIsInitialized(true);
      }
    };

    initialize();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/signin', { email, password });
      const { accessToken, status: AuthenticationStatus } = response.data;
      const user = response.data;
      setSession(accessToken);
      TokenService.setUser(response.data);
      setIsAuthenticated(AuthenticationStatus);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    setSession(null);
    TokenService.removeUser();
    setIsAuthenticated(false);
  };

  if (!isInitialized) {
    return <ChoiraLoader isDashboard={''} />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Signin />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  if (isAuthenticated) {
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
