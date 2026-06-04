// =============== use outside react components ===============
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://smart-deals-server-0wyg.onrender.com',
  // baseURL: 'https://smart-deals-server-three-ebon.vercel.app',
  // baseURL: 'http://localhost:5000',
});

export default axiosInstance;
