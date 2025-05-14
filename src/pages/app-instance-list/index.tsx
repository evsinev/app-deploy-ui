import Table, { TableProps } from '@cloudscape-design/components/table';
import { ContentLayout, Header, StatusIndicator } from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import routing from '@routing';
import { AppInstanceItem, useRemoteAppList } from '@/remote/app-remote';
import CloudLink from '@/components/cloud-link/cloud-link';
import { AppStatusIndicator } from '@/components/app-status-indicator';

const defaultSorting = { sorting: {} };

const columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<AppInstanceItem>> = [
  {
    id: 'instancePath',
    header: 'App Instance',
    cell: (it) => <CloudLink href={routing.appInstanceView.replace(':arn', it.instanceArn)}>{it.instancePath}</CloudLink>,
    sortingField: 'instancePath',
    isRowHeader: true,
  },
  {
    id: 'appStatusIndicator',
    header: 'Running Version',
    cell: (it) => <AppStatusIndicator arn={it.instanceArn} />,
    sortingField: 'instanceArn',
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
    id: 'envArn',
    header: 'Env',
    cell: (it) => it.envName,
    sortingField: 'envName',
    isRowHeader: true,
  },
];

export default function AppInstanceListPage() {
  const { data: unsortedApps, isValidating } = useRemoteAppList('');

  const { items: apps, collectionProps } = useCollection(unsortedApps.apps, defaultSorting);

  return (
    <ContentLayout
      header={(
        <Header
          info={isValidating && <StatusIndicator type="loading" />}
          description="Application Instances with environments"
        >
          App Instances
        </Header>
      )}
    >
      <Table
        {...collectionProps}
        columnDefinitions={columnDefinitions}
        items={apps}
      />
    </ContentLayout>
  );
}
