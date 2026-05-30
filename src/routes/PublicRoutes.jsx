import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import AllProducts from '../pages/AllProducts';
import BuyerBids from '../pages/BuyerBids';
import CreateProduct from '../pages/CreateProduct';
import Home from '../pages/Home';
import Register from '../pages/Register';
import SellerProducts from '../pages/SellerProducts';
import Signin from '../pages/Signin';

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
      {
        path: '/createProduct',
        element: <CreateProduct></CreateProduct>,
      },
      {
        path: '/sellerProducts',
        element: <SellerProducts></SellerProducts>,
      },
      {
        path: '/buyerBids',
        element: <BuyerBids></BuyerBids>,
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
