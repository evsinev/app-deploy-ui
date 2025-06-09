import { AppStatusIndicator } from '@/components/app-status-indicator';
import CloudLink from '@/components/cloud-link/cloud-link';
import { STRING_OPERATORS } from '@/libs/parse-property-filter';
import { AppInstanceItem } from '@/remote/app-remote';
import { PropertyFilterProperty } from '@cloudscape-design/collection-hooks';
import { TableProps } from '@cloudscape-design/components/table';
import routing from '@routing';

export const APP_LIST_COLUMN_DEFINITIONS: ReadonlyArray<TableProps.ColumnDefinition<AppInstanceItem>> = [
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

export const APP_LIST_FILTERING_PROPERTIES: PropertyFilterProperty[] = [
  {
    propertyLabel: 'App Instance',
    key: 'instancePath',
    groupValuesLabel: 'Instance values',
    operators: STRING_OPERATORS,
  },
  {
    propertyLabel: 'App',
    key: 'app',
    groupValuesLabel: 'App values',
    operators: STRING_OPERATORS,
  },
  {
    propertyLabel: 'Env',
    key: 'envName',
    groupValuesLabel: 'Env values',
    operators: STRING_OPERATORS,
  },
];
