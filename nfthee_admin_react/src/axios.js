import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_ADMIN_BASE_URL + '/',

  // baseURL: process.env.REACT_APP_ADMIN_RENDER_BASE_URL + '/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error
      )
    if( error.response.status === 401 && error.response.data.message==="Invalid Token"|| error.response.data.error.message === "jwt expired"){
      localStorage.clear();
      setTimeout(() => {
        window.location.href = '/login';
      },2000)
    }
    return Promise.reject(error);
  }
);

export default instance;
