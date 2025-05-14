import { env } from '@/models/env';
import { SideNavigation, SideNavigationProps } from '@cloudscape-design/components';
import routing from '@routing';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function toHref(aRouterLink: string) {
  return env.PUBLIC_BASE_PATH + aRouterLink;
}
const navConfig: ReadonlyArray<SideNavigationProps.Item> = [
  { type: 'link', text: 'App Instances', href: toHref(routing.home) },
  { type: 'link', text: 'Deploys', href: toHref(routing.deployList) },
];

const getActiveHref = () => {
  if (window.location.pathname === env.PUBLIC_BASE_PATH) {
    return routing.home;
  }

  return window.location.pathname;
};

export default function NavList() {
  const [activeHref, setActiveHref] = useState(getActiveHref());
  const navigate = useNavigate();

  return (
    <SideNavigation
      activeHref={activeHref}
      header={{ href: env.PUBLIC_BASE_PATH + routing.home, text: 'App Deployment' }}
      onFollow={(event) => {
        event.preventDefault();
        const { href } = event.detail;
        if (href.startsWith('http')) {
          window.location.href = href;
        }
        setActiveHref(href);
        navigate(href.replace(env.PUBLIC_BASE_PATH, ''));
      }}
      items={navConfig}
    />
  );
}
