import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
// import EmployeeListPage from './pages/EmployeeListPage';
// import WizardPage from './pages/WizardPage';
import Styleguide from './pages/styleguide';
import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Shared header/nav
    children: [
     
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: 'home',
        element: <Home /> // The merged data list [cite: 52]
      },
    //   {
    //     path: 'employees',
    //     element: <EmployeeListPage /> // The merged data list [cite: 52]
    //   },
    //   {
    //     path: 'wizard',
    //     element: <WizardPage /> // Role-based form [cite: 5]
    //   },
      {
        path: 'style-guide',
        element: <Styleguide /> // Your custom CSS library
      }
    ]
  }
]);

export const App = () => <RouterProvider router={router} />;