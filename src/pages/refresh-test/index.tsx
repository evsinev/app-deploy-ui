import { useUserListPolling } from '@/remote/user';

export default function RefreshTest() {
  const { data } = useUserListPolling();

  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('refresh', data);

  return <div>refresh</div>;
}
