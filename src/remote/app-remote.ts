import useSWR from 'swr';
import { apiRequest } from '@/libs/api-request';

export type HealthCheckResult = {
  type: 'OK' | 'ERROR' | 'NO_HEALTH_CHECK_URL';
  errorMessage: string;
};

export type AppListResponse = {
  apps: AppInstanceItem[];
};

export type AppInstanceItem = {
  appId: string;
  envName: string;
  envArn: string;
  instanceName: string;
  instanceArn: string;
  instancePath: string;
  runningVersion: string;
  envHealthCheckResult: HealthCheckResult;
};

export type AppViewResponse = {
  appId: string;
  envName: string;
  instanceName: string;
  instanceArn: string;
};

export function useRemoteAppList(filter: string) {
  return useSWR(
    `/app/list/${filter}`,
    (url) => apiRequest<AppListResponse>({ url, params: { filter } }),
    {
      keepPreviousData: true,
      suspense: true,
    },
  );
}

export function useRemoteAppView(arn: string) {
  return useSWR(
    `/app/view/${arn}`,
    (url) => apiRequest<AppViewResponse>({ url, params: { arn } }),
    {
      keepPreviousData: true,
      suspense: true,
    },
  );
}
