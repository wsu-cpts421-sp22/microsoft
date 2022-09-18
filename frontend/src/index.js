import React from 'react';
import './static/css/index.css';
import { MapPage } from './Pages/App/MapPage';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<MapPage />);
