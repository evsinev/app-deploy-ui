import { apiRequest } from '@/libs/api-request';
import useSWR from 'swr';

export type AppStatusResponse = {
  type: 'OK' | 'ERROR' | 'NOT_MATCHED';
  errorMessage: string | undefined;
  appInstanceName: string | undefined;
  appVersion: string | undefined;
  hostname: string | undefined;
  port: number | undefined;
  responseDateFormatted: string | undefined;
  uptimeFormatted: string | undefined;
};

export function useRemoteAppStatusView(arn: string) {
  return useSWR(`/app-status/instance/${arn}`, (url) => apiRequest<AppStatusResponse>({ url, params: { arn } }), {
    keepPreviousData: true,
  });
}
