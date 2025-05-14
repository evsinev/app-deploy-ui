import ReactDOM from 'react-dom/client';
import App from './app';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
} else {
  throw new Error('Root container not found in HTML');
}
