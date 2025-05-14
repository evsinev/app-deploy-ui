import { Outlet } from 'react-router-dom';
import '@cloudscape-design/global-styles/index.css';
import { AppLayout } from '@cloudscape-design/components';
import NavList from './components/nav-list';
import { AutoBreadCrumbs } from '@/app/components/layout/components/auto-bread-crumbs';

export default function Layout() {
  return (
    <AppLayout
      content={<Outlet />}
      navigation={<NavList />}
      breadcrumbs={<AutoBreadCrumbs />}
    />
  );
}
