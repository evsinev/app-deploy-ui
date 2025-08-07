import routing from '@/app/router/config';
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
        element={<Login />}
      />
      <Route
        path={routing.home}
        element={<AppList />}
      />
      <Route
        path={routing.appInstanceView}
        element={<AppView />}
      />
      <Route
        path={routing.deployList}
        element={<DeployList />}
      />
      <Route
        path={routing.deployLog}
        element={<DeployLog />}
      />
      <Route
        path={routing.refresh}
        element={<RefreshTest />}
      />
      <Route
        path={routing.form}
        element={<TestForm />}
      />
      <Route
        path="*"
        Component={NotFound}
      />
    </Routes>
  );
}
