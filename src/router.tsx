import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import EmployeeListPage from './pages/EmployeeListPage';
import WizardPage from './pages/WizardPage';
import Styleguide from './pages/styleguide';
import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Shared header/nav
    children: [
     
      {
        index: true,
        element: <Navigate to="/employees" replace />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'employees',
        element: <EmployeeListPage /> // Employee List Page
      },
      {
        path: 'wizard',
        element: <WizardPage /> // Role-based Wizard form
      },
      {
        path: 'style-guide',
        element: <Styleguide /> // STYLE GUIDE
      }
    ]
  }
]);

export const App = () => <RouterProvider router={router} />;