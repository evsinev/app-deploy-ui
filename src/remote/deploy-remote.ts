import { apiRequest } from '@/libs/api-request';
import { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator/internal';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export type RunDeployRequest = {
  instanceArn: string;
  appVersion: string;
};

export type RunDeployResponse = {
  deployId: string;
};

export type DeployViewResponse = {
  deployId: string;
  appId: string;
  newVersion: string;
  oldVersion: string;
  instanceName: string;
  instanceArn: string;
  envName: string;
  logs: DeployLogItem[];
  status: string;
  statusIndicator: StatusIndicatorProps.Type;
  statusErrorMessage: string | undefined;
};

export type DeployLogItem = {
  dateFormatted: string;
  level: string;
  message: string;
};

export type DeployListResponse = {
  deploys: DeployListItem[];
};

export type DeployListItem = {
  deployId: string;
  appId: string;
  newVersion: string;
  oldVersion: string;
  instanceName: string;
  instanceArn: string;
  envName: string;
  status: string;
  statusIndicator: StatusIndicatorProps.Type;
  statusErrorMessage: string | undefined;
};

export function useRemoteMutateRunDeploy() {
  return useSWRMutation<RunDeployResponse, Error, string, RunDeployRequest>('/deploy/run-deploy', (url, { arg }) => apiRequest<RunDeployResponse>({ url, params: arg }));
}

export function useRemoteDeployView(deployId: string) {
  return useSWR(`/deploy/view-deploy/${deployId}`, (url) => apiRequest<DeployViewResponse>({ url, params: { deployId } }), {
    refreshInterval: 5_000,
    keepPreviousData: true,
    suspense: true,
  });
}

export function useRemoteDeployList() {
  return useSWR('/deploy/deploy-list', (url) => apiRequest<DeployListResponse>({ url, params: { count: 50 } }), {
    keepPreviousData: true,
    suspense: true,
  });
}
