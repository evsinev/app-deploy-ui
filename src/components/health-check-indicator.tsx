import { StatusIndicator } from '@cloudscape-design/components';
import { HealthCheckResult } from '@/remote/app-remote';

type Props = {
  healthCheckResult: HealthCheckResult;
};

export function HealthCheckIndicator({ healthCheckResult }: Props) {
  const { type } = healthCheckResult;

  if (type === 'OK') {
    return <StatusIndicator type="success" />;
  }

  if (type === 'ERROR') {
    return <StatusIndicator type="error">{healthCheckResult.errorMessage}</StatusIndicator>;
  }

  return <StatusIndicator type="warning">{healthCheckResult.errorMessage}</StatusIndicator>;
}
