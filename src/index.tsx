import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClassPrefix } from '@carbon/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';
import { ThemePreference } from './utils/ThemePreference';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemePreference>
    <AuthProvider>
      <React.StrictMode>
        <ClassPrefix prefix="bcgov">
          <App />
        </ClassPrefix>
      </React.StrictMode>
    </AuthProvider>
  </ThemePreference>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
