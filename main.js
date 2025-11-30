import React from './src/react.js';
import { createRoot } from './src/react-dom-client.js';
import App from './src/App.js';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Не удалось найти контейнер приложения');
}

const root = createRoot(rootElement);
root.render(React.createElement(App));
