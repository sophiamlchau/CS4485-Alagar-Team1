import { createBrowserRouter } from 'react-router';
import { AuthLayout } from './layouts/AuthLayout';
import { Root } from './pages/Root';
import { Dashboard } from './pages/Dashboard';
import { Expenses } from './pages/Expenses';
import { BudgetCreator } from './pages/BudgetCreator';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';

export const router = createBrowserRouter([
  {
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/',
        Component: Root,
        children: [
          { index: true, Component: Dashboard },
          { path: 'expenses', Component: Expenses },
          { path: 'budget-creator', Component: BudgetCreator },
          { path: 'settings', Component: Settings },
        ],
      },
    ],
  },
]);