import { RequestError } from '@/components/error/models/error-model';
import { Box, Button, Spinner } from '@cloudscape-design/components';
import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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

function ErrorComponent(props: { error: RequestError; resetErrorBoundary: () => void }) {
  // eslint-disable-next-line
  console.error(props.error);

  return (
    <div>
      <Box variant="p">Something went wrong...</Box>
      <Button onClick={props.resetErrorBoundary}>Reset</Button>
    </div>
  );
}

export default function AppSuspense(props: Props) {
  return (
    <ErrorBoundary fallbackRender={ErrorComponent}>
      <Suspense fallback={<AppProgress />}>{props.children}</Suspense>
    </ErrorBoundary>
  );
}
