import { DeployLogItem } from '@/remote/deploy-remote';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { Box, Header, StatusIndicator, Table } from '@cloudscape-design/components';
import { TableProps } from '@cloudscape-design/components/table';

const columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<DeployLogItem>> = [
  {
    id: 'dateFormatted',
    header: 'Date',
    cell: (it) => <Box variant="code">{it.dateFormatted}</Box>,
    sortingField: 'dateFormatted',
    isRowHeader: true,
  },
  {
    id: 'level',
    header: 'Level',
    cell: (it) => <Box variant="code">{it.level}</Box>,
    sortingField: 'level',
    isRowHeader: true,
  },
  {
    id: 'message',
    header: 'Message',
    cell: (it) => (
      <Box
        fontSize="body-s"
        padding="n"
        margin="n"
        variant="pre"
      >
        {it.message}
      </Box>
    ),
    sortingField: 'message',
    isRowHeader: true,
  },
];

type Props = {
  logs: DeployLogItem[];
  isValidating: boolean;
};

const defaultSorting = { sorting: {} };

export default function DeployLogEventsPanel({ logs, isValidating }: Props) {
  const { items: sortedLogs, collectionProps } = useCollection(logs || [], defaultSorting);

  return (
    <Table
      header={<Header info={isValidating && <StatusIndicator type="loading" />}>Logs</Header>}
      {...collectionProps}
      columnDefinitions={columnDefinitions}
      items={sortedLogs}
    />
  );
}
