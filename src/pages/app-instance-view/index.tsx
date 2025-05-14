import { Container, ContentLayout, Header, KeyValuePairs, SpaceBetween, StatusIndicator } from '@cloudscape-design/components';
import { useParams } from 'react-router-dom';
import { useRemoteAppView } from '@/remote/app-remote';
import AvailableVersionsPanel from '@/pages/app-instance-view/available-versions-panel';
import AppStatusPanel from '@/pages/app-instance-view/app-status-panel';

export default function AppInstanceViewPage() {
  const { arn } = useParams() as { arn: string };
  const { data: instance, isValidating } = useRemoteAppView(arn);

  return (
    <ContentLayout
      header={(
        <Header
          info={isValidating && <StatusIndicator type="loading" />}
          description={`Application Instance: ${arn}`}
        >
          App Instance
        </Header>
      )}
    >
      <SpaceBetween size="xl">
        <Container header={<Header variant="h2">App Instance</Header>}>
          <KeyValuePairs
            columns={3}
            items={[
              {
                label: 'Application',
                value: instance!.appId,
              },

              {
                label: 'Environment',
                value: instance?.envName,
              },

              {
                label: 'Instance',
                value: instance?.instanceName,
              },

            ]}
          />
        </Container>

        <AppStatusPanel arn={arn} />

        <AvailableVersionsPanel appId={instance.appId} instanceArn={instance?.instanceArn} />

      </SpaceBetween>
    </ContentLayout>
  );
}
