import { useErrors } from '@/components/error';
import { ReactNode } from 'react';
import { useLocation } from 'react-router';
import '@cloudscape-design/global-styles/index.css';
import { AutoBreadCrumbs } from '@/app/components/layout/components/auto-bread-crumbs';
import { AppLayout } from '@cloudscape-design/components';
import NavList from './components/nav-list';

export default function Layout(props: { children: ReactNode }) {
  const location = useLocation();
  const { ErrorsList } = useErrors();

  return (
    <AppLayout
      key={location.pathname}
      content={props.children}
      navigation={<NavList />}
      breadcrumbs={<AutoBreadCrumbs />}
      notifications={ErrorsList}
    />
  );
}
