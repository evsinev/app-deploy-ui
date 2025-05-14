import { Link as CloudscapeLink, LinkProps } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';
import { env } from '@/models/env';

export default function CloudLink(props: LinkProps) {
  const navigate = useNavigate();
  const actualHref = env.PUBLIC_BASE_PATH ? `${env.PUBLIC_BASE_PATH}${props.href}` : props.href;

  const onHref = () => {
    if (!props.href) {
      return;
    }
    navigate(props.href);
  };

  return (
    <CloudscapeLink
      {...props}
      href={actualHref!}
      onFollow={(e) => {
        e.preventDefault();
        onHref();
      }}
    />
  );
}
