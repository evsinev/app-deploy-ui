import { Container, Header, KeyValuePairs, StatusIndicator } from '@cloudscape-design/components';
import { useRemoteAppStatusView } from '@/remote/app-status-remote';

type Props = {
  arn: string;
};

function LazyData(isLoading : boolean, value: string | number | undefined) {
  if (isLoading) {
    return <StatusIndicator type="loading" />;
  }

  if (value === undefined) {
    return <span>&nbsp;</span>;
  }
  return value;
}

export default function AppStatusPanel({ arn } : Props) {
  const { data, isValidating, isLoading } = useRemoteAppStatusView(arn);

  return (
    <Container header={(
      <Header
        variant="h2"
        info={isValidating && <StatusIndicator type="loading" />}
      >
        App Status
      </Header>
    )}
    >
      <KeyValuePairs
        columns={3}
        items={[
          {
            label: 'State',
            value: LazyData(isLoading, data?.type),
          },

          {
            label: 'Message',
            value: LazyData(isLoading, data?.errorMessage),
          },

          {
            label: 'App Instance Name',
            value: LazyData(isLoading, data?.appInstanceName),
          },

          {
            label: 'Running Version',
            value: LazyData(isLoading, data?.appVersion),
          },

          {
            label: 'Hostname',
            value: LazyData(isLoading, data?.hostname),
          },

          {
            label: 'Port',
            value: LazyData(isLoading, data?.port),
          },

          {
            label: 'Check Time',
            value: LazyData(isLoading, data?.responseDateFormatted),
          },

          {
            label: 'Uptime',
            value: LazyData(isLoading, data?.uptimeFormatted),
          },

        ]}
      />
    </Container>
  );
}
