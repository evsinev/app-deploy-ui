import { BreadcrumbGroup } from '@cloudscape-design/components';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group/interfaces';
import routing from '@routing';
import { useLocation, useNavigate } from 'react-router';

interface Item {
  text: string;
  href?: string;
}

function addLinkItem(items: Item[], pathname: string, substring: string, title: string, path: string) {
  if (pathname.includes(substring)) {
    items.push({
      text: title,
      href: path,
    });
  }
}

function addLastSegmentItem(items: Item[], pathname: string, substring: string) {
  if (pathname.includes(substring)) {
    const lastSegment = pathname.split('/').pop();
    items.push({
      text: `${lastSegment}`,
      href: undefined,
    });
  }
}

function createItems(pathname: string): readonly BreadcrumbGroupProps.Item[] {
  const items: BreadcrumbGroupProps.Item[] = [
    {
      text: 'Home',
      href: '/',
    },
  ];

  addLinkItem(items, pathname, routing.home, 'App Instances', routing.home);
  addLastSegmentItem(items, pathname, routing.home);

  addLinkItem(items, pathname, routing.deployList, 'Deploys', routing.deployList);
  addLastSegmentItem(items, pathname, routing.deployList);

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
