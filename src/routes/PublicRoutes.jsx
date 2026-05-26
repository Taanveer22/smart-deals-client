import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import AllProducts from '../pages/AllProducts';
import Home from '../pages/Home';

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
        element: <AllProducts></AllProducts>,
      },
    ],
  },
]);

export default PublicRoutes;
