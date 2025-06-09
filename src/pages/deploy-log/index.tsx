import CloudLink from '@/components/cloud-link/cloud-link';
import DeployLogEventsPanel from '@/pages/deploy-log/deploy-log-events-panel';
import { useRemoteDeployView } from '@/remote/deploy-remote';
import { Container, ContentLayout, Header, KeyValuePairs, SpaceBetween, StatusIndicator } from '@cloudscape-design/components';
import routing from '@routing';
import { useParams } from 'react-router';

export default function DeployLogPage() {
  const { deployId } = useParams() as { deployId: string };
  const { data, isValidating } = useRemoteDeployView(deployId);

  return (
    <ContentLayout
      header={
        <Header
          info={isValidating && <StatusIndicator type="loading" />}
          description={`Deploy: ${deployId}`}
        >
          Deployment logs
        </Header>
      }
    >
      <SpaceBetween size="xl">
        <Container header={<Header variant="h2">Deploy info</Header>}>
          <KeyValuePairs
            columns={3}
            items={[
              {
                label: 'Application',
                value: data?.appId,
              },

              {
                label: 'Environment',
                value: data?.envName,
              },

              {
                label: 'Instance',
                value: <CloudLink href={routing.appInstanceView.replace(':arn', data?.instanceArn || '')}>{data?.instanceName}</CloudLink>,
              },

              {
                label: 'Old Version',
                value: data?.oldVersion,
              },

              {
                label: 'New Version',
                value: data?.newVersion,
              },

              {
                label: 'Status',
                value: (
                  <StatusIndicator
                    iconAriaLabel={data?.status}
                    type={data?.statusIndicator}
                  >
                    {data?.statusErrorMessage}
                  </StatusIndicator>
                ),
              },
            ]}
          />
        </Container>

        {data?.logs && (
          <DeployLogEventsPanel
            logs={data?.logs}
            isValidating={isValidating}
          />
        )}
      </SpaceBetween>
    </ContentLayout>
  );
}
