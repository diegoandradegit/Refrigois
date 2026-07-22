import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { captureUTMs } from './utils/analytics';

// Guarda os utm_* da URL de entrada (se houver) na sessão do navegador —
// ver utils/analytics.ts para a convenção de UTM da Refrigóis e o motivo.
captureUTMs();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);