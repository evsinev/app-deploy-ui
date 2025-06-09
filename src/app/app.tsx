import Router from '@/app/router';
import ErrorProvider from '@/components/error';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';

const LOCALE = 'en';

export default function App() {
  return (
    <ErrorProvider>
      <I18nProvider
        locale={LOCALE}
        messages={[messages]}
      >
        <Router />
      </I18nProvider>
    </ErrorProvider>
  );
}
