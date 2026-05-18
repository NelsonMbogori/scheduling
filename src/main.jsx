import React from 'react';
import { createRoot } from 'react-dom/client';
import HemingwaysScheduler from './HemingwaysScheduler.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HemingwaysScheduler />
  </React.StrictMode>
);
