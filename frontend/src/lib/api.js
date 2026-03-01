import axios from 'axios';
 
const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL ;

const api = axios.create({
  baseURL : `${BACKEND_SERVER_URL}/api`,
  withCredentials : true 
})

api.interceptors.request.use( (config) => {
  const token = localStorage.getItem('inspiroai_access_token');
  if(token){
    config.headers.Authorization =`Bearer ${token}`;
  }

  return config;
})

export default api;