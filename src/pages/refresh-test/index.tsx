import { useUserListPolling } from '@/remote/user';

export default function RefreshTest() {
  const { data } = useUserListPolling();

  // eslint-disable-next-line no-console
  console.log('refresh', data);

  return (
    <div>refresh</div>
  );
}
