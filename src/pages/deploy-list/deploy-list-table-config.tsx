import { AppStatusIndicator } from '@/components/app-status-indicator';
import CloudLink from '@/components/cloud-link/cloud-link';
import { ENUM_OPERATORS, STRING_OPERATORS } from '@/libs/parse-property-filter';
import { DeployListItem } from '@/remote/deploy-remote';
import { PropertyFilterProperty } from '@cloudscape-design/collection-hooks';
import { StatusIndicator } from '@cloudscape-design/components';
import { TableProps } from '@cloudscape-design/components/table';
import routing from '@routing';

export const DEPLOY_LIST_COLUMN_DEFINITIONS: ReadonlyArray<TableProps.ColumnDefinition<DeployListItem>> = [
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

export const DEPLOY_LIST_FILTERING_PROPERTIES: PropertyFilterProperty[] = [
  {
    propertyLabel: 'New Version',
    key: 'newVersion',
    groupValuesLabel: 'New Versions',
    operators: STRING_OPERATORS,
  },
  {
    propertyLabel: 'Old Version',
    key: 'oldVersion',
    groupValuesLabel: 'Old Versions',
    operators: STRING_OPERATORS,
  },
  {
    propertyLabel: 'Deploy Status',
    key: 'statusIndicator',
    groupValuesLabel: 'Deploy Statuses',
    operators: ENUM_OPERATORS,
  },
  {
    propertyLabel: 'Instance',
    key: 'instanceName',
    groupValuesLabel: 'Instances',
    operators: STRING_OPERATORS,
  },
  {
    propertyLabel: 'App',
    key: 'appId',
    groupValuesLabel: 'Apps',
    operators: STRING_OPERATORS,
  },
  {
    propertyLabel: 'Env',
    key: 'envName',
    groupValuesLabel: 'Envs',
    operators: STRING_OPERATORS,
  },
];
