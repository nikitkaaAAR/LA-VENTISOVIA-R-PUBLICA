import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App.js';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Не удалось найти контейнер приложения');
}

const root = createRoot(rootElement);
root.render(React.createElement(App));
