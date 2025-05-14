import Router from '@/app/router';
import ErrorProvider from '@/components/error';

export default function App() {
  return (
    <ErrorProvider>
      <Router />
    </ErrorProvider>
  );
}
