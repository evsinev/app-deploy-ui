import { useRemoteMutateRunDeploy } from '@/remote/deploy-remote';
import { AppVersionItem, useRemoteVersionListAvailable } from '@/remote/version-remote';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { Button, Header, SpaceBetween, StatusIndicator, Table } from '@cloudscape-design/components';
import { TableProps } from '@cloudscape-design/components/table';
import routing from '@routing';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const defaultSorting = { sorting: {} };

type Props = {
  appId: string;
  instanceArn: string;
};

const columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<AppVersionItem>> = [
  {
    id: 'appVersion',
    header: 'Version',
    cell: (it) => it.appVersion,
    sortingField: 'appVersionNumber',
    isRowHeader: true,
  },
  {
    id: 'timestamp',
    header: 'Date',
    cell: (it) => it.timestamp,
    sortingField: 'timestamp',
    isRowHeader: true,
  },
  {
    id: 'sizeFormatted',
    header: 'Size',
    cell: (it) => it.sizeFormatted,
    sortingField: 'size',
    isRowHeader: true,
  },
];

export default function AvailableVersionsPanel({ appId, instanceArn }: Props) {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<AppVersionItem[]>([]);
  const { data, isValidating, isLoading } = useRemoteVersionListAvailable(appId);
  const { trigger } = useRemoteMutateRunDeploy();
  const { items: versions, collectionProps } = useCollection(data?.appVersions || [], defaultSorting);

  async function installVersion() {
    const { appVersion } = selectedItems[0];
    const deployResponse = await trigger({ instanceArn, appVersion });
    navigate(routing.deployLog.replace(':deployId', deployResponse.deployId));
  }

  return (
    <Table
      header={
        <Header
          info={isValidating && <StatusIndicator type="loading" />}
          actions={
            <SpaceBetween
              direction="horizontal"
              size="xs"
            >
              <Button
                onClick={() => installVersion()}
                disabled={selectedItems?.length === 0}
              >
                Install version {`${selectedItems[0]?.appVersion || ''}`}
              </Button>
            </SpaceBetween>
          }
        >
          Available Versions
        </Header>
      }
      {...collectionProps}
      columnDefinitions={columnDefinitions}
      loading={isLoading}
      items={versions}
      selectionType="single"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
    />
  );
}
