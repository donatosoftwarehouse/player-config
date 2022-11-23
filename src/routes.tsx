import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { SetupPage } from './pages/SetupPage/SetupPage';
import { ConfigurationsPage } from './pages/ConfigurationsPage/ConfigurationsPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/setup',
    element: <SetupPage />
  },
  {
    path: '/configurations',
    element: <ConfigurationsPage />
  }
]);
