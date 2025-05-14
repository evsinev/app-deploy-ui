import { AppStatusIndicator } from '@/components/app-status-indicator';
import CloudLink from '@/components/cloud-link/cloud-link';
import { DeployListItem, useRemoteDeployList } from '@/remote/deploy-remote';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { ContentLayout, Header, StatusIndicator } from '@cloudscape-design/components';
import Table, { TableProps } from '@cloudscape-design/components/table';
import routing from '@routing';

const defaultSorting = { sorting: {} };

const columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<DeployListItem>> = [
  {
    id: 'version',
    header: 'Deploy',
    cell: (it) => <CloudLink href={routing.deployLog.replace(':deployId', it.deployId)}>{`${it.oldVersion} ⮕ ${it.newVersion}`}</CloudLink>,
    sortingField: 'newVersion',
    isRowHeader: true,
  },
  {
    id: 'statusIndicator',
    header: 'Deploy Status',
    cell: (it) => <StatusIndicator type={it.statusIndicator}>{it.statusErrorMessage?.substring(0, 30)}</StatusIndicator>,
    sortingField: 'statusIndicator',
    isRowHeader: true,
  },
  {
    id: 'instanceArn',
    header: 'App Instance',
    cell: (it) => <CloudLink href={routing.appInstanceView.replace(':arn', it.instanceArn)}>{it.instanceName}</CloudLink>,
    sortingField: 'instanceName',
    isRowHeader: true,
  },
  {
    id: 'app',
    header: 'App',
    cell: (it) => it.appId,
    sortingField: 'appId',
    isRowHeader: true,
  },
  {
    id: 'envName',
    header: 'Env',
    cell: (it) => it.envName,
    sortingField: 'envName',
    isRowHeader: true,
  },
  {
    id: 'appStatusIndicator',
    header: 'Running Version',
    cell: (it) => <AppStatusIndicator arn={it.instanceArn} />,
    sortingField: 'instanceArn',
    isRowHeader: true,
  },
];

export default function DeployListPage() {
  const { data: unsortedApps, isValidating } = useRemoteDeployList();

  const { items: deploys, collectionProps } = useCollection(unsortedApps.deploys, defaultSorting);

  return (
    <ContentLayout
      header={
        <Header
          info={isValidating && <StatusIndicator type="loading" />}
          description="Recent Deploments (max 50)"
        >
          Deployments
        </Header>
      }
    >
      <Table
        {...collectionProps}
        columnDefinitions={columnDefinitions}
        items={deploys}
      />
    </ContentLayout>
  );
}
