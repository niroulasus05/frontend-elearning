import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import './index.css';
import { AdminProvider } from './context/AdminContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
      <Router />
    </AdminProvider>
  </React.StrictMode>
);
