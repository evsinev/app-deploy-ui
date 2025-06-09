import { useQueryParams } from '@/hooks/use-query-params';
import { PROPERTY_FILTERS_QUERY_PARAM_KEY, parsePropertyFilterQuery, saveQueryFilter } from '@/libs/parse-property-filter';
import { DEPLOY_LIST_COLUMN_DEFINITIONS, DEPLOY_LIST_FILTERING_PROPERTIES } from '@/pages/deploy-list/deploy-list-table-config';
import { useRemoteDeployList } from '@/remote/deploy-remote';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { ContentLayout, Header, PropertyFilter, StatusIndicator } from '@cloudscape-design/components';
import Table from '@cloudscape-design/components/table';

export default function DeployListPage() {
  const { data: unsortedApps, isValidating } = useRemoteDeployList();

  const { getQueryParam, setQueryParam } = useQueryParams();
  const {
    items: deploys,
    collectionProps,
    propertyFilterProps,
  } = useCollection(unsortedApps?.deploys || [], {
    sorting: {},
    propertyFiltering: {
      filteringProperties: DEPLOY_LIST_FILTERING_PROPERTIES,
      defaultQuery: parsePropertyFilterQuery(getQueryParam(PROPERTY_FILTERS_QUERY_PARAM_KEY)),
    },
  });

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
        columnDefinitions={DEPLOY_LIST_COLUMN_DEFINITIONS}
        items={deploys}
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
