import { BreadcrumbGroup } from '@cloudscape-design/components';
import { useLocation, useNavigate } from 'react-router-dom';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group/interfaces';
import routing from '@routing';

function addLinkItem(items: { text: string; href: any }[], pathname: string, substring: string, title: string, path: string) {
  if (pathname.includes(substring)) {
    items.push({
      text: title,
      href: path,
    });
  }
}

function addLastSegmentItem(items: { text: string; href: any }[], pathname: string, substring: string) {
  if (pathname.includes(substring)) {
    const lastSegment = pathname.split('/').pop();
    items.push({
      text: `${lastSegment}`,
      href: undefined,
    });
  }
}

function createItems(pathname : string) : readonly BreadcrumbGroupProps.Item[] {
  const items : BreadcrumbGroupProps.Item[] = [
    {
      text: 'Home',
      href: '/',
    },
  ];

  addLinkItem(items, pathname, '/app-instance', 'App Instances', routing.home);
  addLastSegmentItem(items, pathname, '/app-instance/');

  addLinkItem(items, pathname, '/deploys', 'Deploys', routing.deployList);
  addLastSegmentItem(items, pathname, '/deploys/');

  return items;
}

export function AutoBreadCrumbs() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <BreadcrumbGroup
      items={createItems(pathname)}
      onFollow={(e) => {
        e.preventDefault();
        navigate(e.detail.href);
      }}
    />
  );
}
