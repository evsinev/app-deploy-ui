import { useRemoteAppStatusView } from '@/remote/app-status-remote';
import { StatusIndicator } from '@cloudscape-design/components';

type Props = {
  arn: string;
};

export function AppStatusIndicator({ arn }: Props) {
  const { data, isLoading, isValidating } = useRemoteAppStatusView(arn);

  if (isLoading) {
    return <StatusIndicator type="loading" />;
  }

  const type = data?.type;

  if (type === 'OK') {
    return (
      <StatusIndicator
        type="success"
        colorOverride={isValidating ? 'grey' : undefined}
      >
        {data?.appVersion}
      </StatusIndicator>
    );
  }

  if (type === 'ERROR') {
    return (
      <StatusIndicator
        type="error"
        colorOverride={isValidating ? 'grey' : undefined}
      >
        {data?.errorMessage}
      </StatusIndicator>
    );
  }

  // NOT_MATCHED
  return (
    <StatusIndicator
      type="warning"
      colorOverride={isValidating ? 'grey' : undefined}
    >
      {data?.errorMessage}
    </StatusIndicator>
  );
}
