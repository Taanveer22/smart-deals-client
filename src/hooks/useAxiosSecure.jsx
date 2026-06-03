import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from './useAuth';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  console.log('fb user', user);

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        console.log('res correct', res);
        return res;
      },
      (err) => {
        console.log('res wrong', err);
        console.log(err.status);
        const status = err.status;
        // console.log(err.response?.status);
        // const status = err.response?.status;

        if (status === 401 || status === 403) {
          console.log('sign out user');
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
