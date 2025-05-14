import { Link as CloudscapeLink, LinkProps } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export default function Link(props: LinkProps) {
  const navigate = useNavigate();

  const onHref = () => {
    if (!props.href) return;
    navigate(props.href);
  };

  return (
    <CloudscapeLink
      {...props}
      href={undefined}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick?.(e);
        onHref();
      }}
    />
  );
}
