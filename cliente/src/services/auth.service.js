import axios from "axios";

const API_URL_REGISTRER = "http://localhost:5000/api/users/register";

const API_URL_LOGIN = "http://localhost:5000/api/users/login";

const signup = (nombre,userName, password) => {
  return axios
    .post(API_URL_REGISTRER, {
      nombre,
      userName,
      password,
    })
    .then((response) => {
      //console.log("SignUp "+response.data);
      
      if (response.data.success) {        
        localStorage.setItem("user", JSON.stringify(response.data.success));
      }
      return response.data;
    });
};

const login = (userName, password) => {
  return axios
    .post(API_URL_LOGIN , {
      userName:userName,
      password:password,
    })
    .then((response) => {
      //console.log("Login "+response.data.data);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
