import { useQueryParams } from '@/hooks/use-query-params';
import { PROPERTY_FILTERS_QUERY_PARAM_KEY, parsePropertyFilterQuery, saveQueryFilter } from '@/libs/parse-property-filter';
import { APP_LIST_COLUMN_DEFINITIONS, APP_LIST_FILTERING_PROPERTIES } from '@/pages/app-instance-list/app-list-table-config';
import { useRemoteAppList } from '@/remote/app-remote';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { ContentLayout, Header, PropertyFilter, StatusIndicator } from '@cloudscape-design/components';
import Table from '@cloudscape-design/components/table';

export default function AppInstanceListPage() {
  const { data: unsortedApps, isValidating } = useRemoteAppList('');
  const { getQueryParam, setQueryParam } = useQueryParams();
  const {
    items: apps,
    collectionProps,
    propertyFilterProps,
  } = useCollection(unsortedApps?.apps || [], {
    sorting: {},
    propertyFiltering: {
      filteringProperties: APP_LIST_FILTERING_PROPERTIES,
      defaultQuery: parsePropertyFilterQuery(getQueryParam(PROPERTY_FILTERS_QUERY_PARAM_KEY)),
    },
  });

  return (
    <ContentLayout
      header={
        <Header
          info={isValidating && <StatusIndicator type="loading" />}
          description="Application Instances with environments"
        >
          App Instances
        </Header>
      }
    >
      <Table
        {...collectionProps}
        columnDefinitions={APP_LIST_COLUMN_DEFINITIONS}
        items={apps}
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            onChange={(event) => {
              saveQueryFilter(event, setQueryParam);
              propertyFilterProps.onChange(event);
            }}
          />
        }
      />
    </ContentLayout>
  );
}
