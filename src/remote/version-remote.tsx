import useSWR from 'swr';
import { apiRequest } from '@/libs/api-request';

export type AvailableAppVersionsResponse = {
  appId: string;
  appVersions: AppVersionItem[];
};

export type AppVersionItem = {
  appVersion: string;
  appVersionNumber: number;
  timestamp: string;
  size: number;
  sizeFormatted: string;
};

export function useRemoteVersionListAvailable(appId: string) {
  return useSWR(
    `/version/list-available/${appId}`,
    (url) => apiRequest<AvailableAppVersionsResponse>({ url, params: { appId } }),
    {
      keepPreviousData: true,
      suspense: false,
    },
  );
}
