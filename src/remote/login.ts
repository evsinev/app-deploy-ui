import useSWRMutation from 'swr/mutation';

export interface LoginParams {
  login: string;
  password: string;
  otp: string;
}

const loginMock = (params: { url: string, params: LoginParams, method: string }) => !!params;

export function useLogin() {
  return useSWRMutation<boolean, Error, string, LoginParams>(
    '/login',
    (url, { arg }) => loginMock({ url, params: arg, method: 'POST' }),
  );
}
