import Layout from '@/app/components/layout';
import Router from '@/app/router';
import ErrorProvider from '@/components/error';
import { env } from '@/models/env';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import { BrowserRouter } from 'react-router';

const LOCALE = 'en';

export default function App() {
  return (
    <ErrorProvider>
      <I18nProvider
        locale={LOCALE}
        messages={[messages]}
      >
        <BrowserRouter basename={env.PUBLIC_BASE_PATH}>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </I18nProvider>
    </ErrorProvider>
  );
}
