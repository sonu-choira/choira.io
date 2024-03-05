
class TokenService {

    getSettings = () => {
      const settings = JSON.parse(localStorage.getItem("settings"));
      return settings;
    }

    setSettings = () => {
      const settings = JSON.parse(localStorage.setItem("settings"));
      return settings;
    }

    getLocalRefreshToken = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.refreshToken;
    }
  
    getLocalAccessToken = () => {
      const token = localStorage.getItem("token")
      // console.log("token-----", token);
      let parsedToken;
      if (token && token !== undefined) {parsedToken = JSON.parse(token) 
      }
      return parsedToken;
    }
  
    updateLocalAccessToken = (token) => {
      localStorage.setItem("token", JSON.stringify(token));
    }
  
    getUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      return user;
    }
  
    setUser = (user) => {
      // console.log("user----", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    removeUser = () => {
      localStorage.removeItem("user");
    }
  
    getData = (key) => {
      const user = JSON.parse(localStorage.getItem(key));
      return user;
    }
  
    setData = (key, value) => {
      //   console.log(JSON.stringify(user));
      localStorage.setItem(key, JSON.stringify(value));
    }
  
    removeData = (key) => {
      localStorage.removeItem(key);
    }
  
    getUserID = () => {
  
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.userInfo?.id
    }
  }
  
  export default new TokenService();