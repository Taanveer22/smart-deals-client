import { Navigate, useLocation } from 'react-router';
import Spinner from '../components/Spinner';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();
  // console.log(location.pathname);

  if (loading) {
    return <Spinner></Spinner>;
  }
  if (user) {
    return children;
  }

  return <Navigate state={location?.pathname} to="/signin"></Navigate>;
};

export default PrivateRoute;
