import routing from '@/app/router/config';
import AppSuspense from '@/components/app-suspense';
import AppList from '@/pages/app-instance-list';
import AppView from '@/pages/app-instance-view';
import Login from '@/pages/login';
import { Route, Routes } from 'react-router';

import DeployList from '@/pages/deploy-list';
import DeployLog from '@/pages/deploy-log';
import NotFound from '@/pages/error/not-found';
import RefreshTest from '@/pages/refresh-test';
import TestForm from '@/pages/test-dynamic-form';

export default function Router() {
  return (
    <Routes>
      <Route
        path={routing.login}
        element={
          <AppSuspense>
            <Login />
          </AppSuspense>
        }
      />
      <Route
        path={routing.home}
        element={
          <AppSuspense>
            <AppList />
          </AppSuspense>
        }
      />
      <Route
        path={routing.appInstanceView}
        element={
          <AppSuspense>
            <AppView />
          </AppSuspense>
        }
      />
      <Route
        path={routing.deployList}
        element={
          <AppSuspense>
            <DeployList />
          </AppSuspense>
        }
      />
      <Route
        path={routing.deployLog}
        element={
          <AppSuspense>
            <DeployLog />
          </AppSuspense>
        }
      />
      <Route
        path={routing.refresh}
        element={
          <AppSuspense>
            <RefreshTest />
          </AppSuspense>
        }
      />
      <Route
        path={routing.form}
        element={
          <AppSuspense>
            <TestForm />
          </AppSuspense>
        }
      />
      <Route
        path="*"
        Component={NotFound}
      />
    </Routes>
  );
}
