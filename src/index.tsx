import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './styles/styles.css';
import '@nmw/react-components/dist/main.css';
import './images/recipe-512.png';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
