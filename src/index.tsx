import React from 'react';
import ReactDOM from 'react-dom/client';
import WebFont from 'webfontloader';
import './index.css';
import './components/HRDashboard/HRDashboard.css'; // Import HRDashboard styles
import App from './App';

WebFont.load({
  google: {
    families: ['Montserrat:400,700', 'Lato:400,700', 'sans-serif']
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
