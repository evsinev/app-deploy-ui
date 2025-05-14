import { useEffect, useState } from 'react';
import { Alert } from '@cloudscape-design/components';

interface SystemMessageProps {
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
}

export default function useSystemMessage() {
  const [state, setState] = useState<SystemMessageProps | undefined>(undefined);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (state) {
      timeout = setTimeout(() => setState(undefined), 2000);
    }
    return () => clearTimeout(timeout);
  }, [state]);

  const showMessage = (props: SystemMessageProps) => setState(props);

  const message = state
    ? (
      <div
        style={{
          position: 'fixed',
          zIndex: 1000,
          maxWidth: '280px',
          top: 30,
          left: 0,
          right: 0,
          margin: '0 auto',
          alignItems: 'center',
        }}
      >
        <Alert
          statusIconAriaLabel={state.severity}
          onDismiss={() => setState(undefined)}
        >
          {state.message}
        </Alert>
      </div>
    )
    : null;

  return {
    showMessage,
    message,
  };
}
