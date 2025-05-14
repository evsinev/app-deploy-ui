'use client';

import routing from '@routing';
import { env } from '@/models/env';
import { RequestError } from '@/components/error/models/error-model';
import { RequestErrorModel } from '@/components/error/models/types';

interface ClientPostProps {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: any;
  options?: {
    proxy: boolean;
  }
}

const getFetchData = async <T>(response: Response): Promise<T> => {
  const text = await response.text();
  if (!text) {
    throw new RequestError({
      title: 'Empty response',
      type: 'Request error',
      status: response.status,
      detail: {
        path: response.url,
      },
    });
  }
  try {
    return JSON.parse(text) as T;
  } catch (e) {
    return text as T;
  }
};

export async function apiRequest<T>(props: ClientPostProps): Promise<T> {
  const url = env.PUBLIC_API_BASE_URL + props.url;

  const body = props.method === 'GET'
    ? undefined
    : props.params
      ? JSON.stringify(props.params)
      : '{}';

  const response = await fetch(url, {
    method: props.method || 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body,
  });

  if (response.status === 401) {
    window.location.href = env.PUBLIC_BASE_PATH + routing.login;
    throw new RequestError({ title: 'not authorized', status: 401, type: 'Unauthorized' });
  }

  if (!response.ok) {
    const errorMessage = await getFetchData<RequestErrorModel>(response);
    throw new RequestError(errorMessage);
  }

  return getFetchData<T>(response);
}
