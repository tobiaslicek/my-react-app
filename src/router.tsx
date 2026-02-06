import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ROUTES } from './constants';
import { NotFound, TodoDetail, Todos } from './pages';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.main,
        element: <Navigate to={ROUTES.todos} replace />,
      },
      {
        path: ROUTES.todos,
        element: <Todos />,
      },
      {
        path: ROUTES.todoDetail,
        element: <TodoDetail />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
