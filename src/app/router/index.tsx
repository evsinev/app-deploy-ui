import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from 'src/pages/login';
import AppInstanceListPage from 'src/pages/app-instance-list';
import AppInstanceViewPage from 'src/pages/app-instance-view';
import Layout from '@/app/components/layout';
import routing from '@/app/router/config';
import { env } from '@/models/env';
import AppSuspense from '@/components/app-suspense';

import NotFound from '@/pages/error/not-found';
import TestForm from '@/pages/test-dynamic-form';
import RefreshTest from '@/pages/refresh-test';
import DeployLogPage from '@/pages/deploy-log';
import DeployListPage from '@/pages/deploy-list';

const router = createBrowserRouter([
  {
    path: routing.login,
    element: (
      <AppSuspense>
        <Login />
      </AppSuspense>
    ),
  },
  {
    path: routing.home,
    element: <Layout />,
    children: [
      {
        path: routing.home,
        element: (
          <AppSuspense>
            <AppInstanceListPage />
          </AppSuspense>
        ),
      },
      {
        path: routing.appInstanceView,
        element: (
          <AppSuspense>
            <AppInstanceViewPage />
          </AppSuspense>
        ),
      },
      {
        path: routing.deployLog,
        element: (
          <AppSuspense>
            <DeployLogPage />
          </AppSuspense>
        ),
      },
      {
        path: routing.deployList,
        element: (
          <AppSuspense>
            <DeployListPage />
          </AppSuspense>
        ),
      },
      {
        path: routing.form,
        element: (
          <AppSuspense>
            <TestForm />
          </AppSuspense>
        ),
      },
      {
        path: routing.refresh,
        element: (
          <AppSuspense>
            <RefreshTest />
          </AppSuspense>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
], {
  basename: env.PUBLIC_BASE_PATH,
});

export default function Router() {
  return (
    <RouterProvider router={router} />
  );
}
