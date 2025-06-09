import { apiRequest } from '@/libs/api-request';
import { User } from '@/models/user';
import { useParams } from 'react-router';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import useSWRMutation from 'swr/mutation';

const HOUR = 3600000;
const STATIC_DATA = {
  keepPreviousData: true,
  dedupingInterval: 0,
  refetchInterval: HOUR + 1,
  refreshInterval: HOUR,
};

export function useUserList() {
  return useSWRImmutable('/posts', (url) => apiRequest<User[]>({ url, method: 'GET' }), STATIC_DATA);
}

export function useUserListPolling() {
  return useSWR('/posts', (url) => apiRequest<User[]>({ url, method: 'GET' }), {
    refreshInterval: 5000,
    keepPreviousData: true,
  });
}

export function useUser() {
  const { id } = useParams() as { id: string };

  return useSWRImmutable(`/posts/${id}`, (url) => apiRequest<User>({ url, method: 'GET' }), STATIC_DATA);
}

export function useUserCreate() {
  return useSWRMutation<User, Error, string, User>('/posts', (url, { arg }) => apiRequest({ url, params: arg, method: 'POST' }));
}

export function useUserUpdate() {
  const { id } = useParams() as { id: string };

  return useSWRMutation<User, Error, string, User>(`/posts/${id}`, (url, { arg }) => apiRequest({ url, params: arg, method: 'PUT' }));
}

export function useUserDelete() {
  const { id } = useParams() as { id: string };

  return useSWRMutation<boolean, Error, string>(`/posts/${id}`, (url) => apiRequest({ url, method: 'DELETE' }));
}
