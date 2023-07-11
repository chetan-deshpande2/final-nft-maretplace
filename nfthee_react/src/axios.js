import axios from 'axios';
import { logOut } from './Components/Layout/Navbar';
const userId = JSON.parse(localStorage.getItem('userLoggedIn')) || '';


const instance =  axios.create({
  // local
  // baseURL: process.env.REACT_APP_BASE_URL + '/',
  // baseURL: "http://192.168.1.143:8002" + '/',
  baseURL: process.env.REACT_APP_RENDER_BASE_URL + '/',
  

  // baseURL: process.env.REACT_APP_RENDER_BASE_URL + '/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userId.token}`
    ,

  },
});
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if(error.response && error.response.status === 401 && error.response.data.data.message === "jwt expired"){
      localStorage.clear();
      setTimeout(() => {
        logOut()
      },2000)
    }
    return Promise.reject(error);
  }
);
export default instance;
