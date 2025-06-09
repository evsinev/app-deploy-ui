import { useErrors } from '@/components/error';
import { Outlet, useLocation } from 'react-router';
import '@cloudscape-design/global-styles/index.css';
import { AutoBreadCrumbs } from '@/app/components/layout/components/auto-bread-crumbs';
import { AppLayout } from '@cloudscape-design/components';
import NavList from './components/nav-list';

export default function Layout() {
  const location = useLocation();
  const { ErrorsList } = useErrors();

  return (
    <AppLayout
      key={location.pathname}
      content={<Outlet />}
      navigation={<NavList />}
      breadcrumbs={<AutoBreadCrumbs />}
      notifications={ErrorsList}
    />
  );
}
