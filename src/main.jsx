import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import './index.css';
import AuthProvider from './providers/AuthProvider';
import PublicRoutes from './routes/PublicRoutes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer></ToastContainer>
      <RouterProvider router={PublicRoutes}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
