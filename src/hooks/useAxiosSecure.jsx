// =============== use insideside react components ===================
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from './useAuth';

const instance = axios.create({
  baseURL: 'https://smart-deals-server-0wyg.onrender.com',
  // baseURL: 'https://smart-deals-server-three-ebon.vercel.app',
  // baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  // console.log('fb user', user);
  // console.log(user?.accessToken);
  // console.log(user?.getIdToken());

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user?.getIdToken();
          // const token = user?.accessToken;
          // console.log(token);
          if (token) {
            config.headers.authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        // console.log('res correct', res);
        return res;
      },
      (err) => {
        // console.log('res wrong', err);
        // console.log(err.status);
        // console.log(err.response?.status);
        // const status = err.status;
        const status = err.response?.status;

        if (status === 401 || status === 403) {
          signOutUser().then(() => {
            navigate('/signin', { replace: true });
            toast.warning('sign out for bad status code');
          });
        }
        return Promise.reject(err);
      }
    );
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
