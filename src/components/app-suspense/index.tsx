import { useErrors } from '@/components/error';
import { Spinner } from '@cloudscape-design/components';
import { ReactNode, Suspense, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

function AppProgress() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
      }}
    >
      <Spinner />
    </div>
  );
}

export default function AppSuspense(props: Props) {
  const { errors, setErrors } = useErrors();

  useEffect(() => {
    return () => {
      if (errors.length > 0) {
        setErrors([]);
      }
    };
  }, [errors]);

  return <Suspense fallback={<AppProgress />}>{props.children}</Suspense>;
}
