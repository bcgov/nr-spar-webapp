/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
/* eslint-disable jsdoc/require-jsdoc */
import { GlobalTheme } from '@carbon/react';
import React, {
  createContext, useContext, useEffect, useState
} from 'react';

const ThemePreferenceContext = createContext();
const currentMode = localStorage.getItem('mode');

function useThemePreference() {
  return useContext(ThemePreferenceContext);
}

function ThemePreference({ children }) {
  const [theme, setTheme] = useState('g10');
  const value = {
    theme,
    setTheme
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-carbon-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (currentMode === 'dark') {
      setTheme('g100');
    }
    if (currentMode === 'light') {
      setTheme('g10');
    }
  }, []);

  return (
    <ThemePreferenceContext.Provider value={value}>
      <GlobalTheme theme={theme}>{children}</GlobalTheme>
    </ThemePreferenceContext.Provider>
  );
}

export { ThemePreference, useThemePreference };
