import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');

if (container) {
  // Use a stable key that won't change between edits
  const ROOT_KEY = '__REACT_ROOT__';
  const win = window as any;
  
  if (!win[ROOT_KEY]) {
    win[ROOT_KEY] = createRoot(container);
  }

  win[ROOT_KEY].render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
