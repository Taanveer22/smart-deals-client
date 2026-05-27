import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import AllProducts from '../pages/AllProducts';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Signin from '../pages/Signin';
import PrivateRoute from './PrivateRoute';

let PublicRoutes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/allProducts',
        element: (
          <PrivateRoute>
            <AllProducts></AllProducts>
          </PrivateRoute>
        ),
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/signin',
        element: <Signin></Signin>,
      },
    ],
  },
]);

export default PublicRoutes;
