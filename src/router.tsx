import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RequireAuth } from './components/RequireAuth';
import { ROUTES } from './constants';
import { Login, NotFound, PetDetail, PetList, TodoDetail, Todos } from './pages';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.main,
        element: (
          <RequireAuth>
            <Navigate to={ROUTES.todos} replace />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.todos,
        element: (
          <RequireAuth>
            <Todos />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.todoDetail,
        element: (
          <RequireAuth>
            <TodoDetail />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.petList,
        element: (
          <RequireAuth>
            <PetList />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.petDetail,
        element: (
          <RequireAuth>
            <PetDetail />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.login,
        element: <Login />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
