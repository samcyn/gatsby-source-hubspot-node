import React, { ReactNode, createContext, useEffect, useState } from 'react';

type ContextType = {
  mode: 'light' | 'dark';
  onChangeMode: () => void;
};

export const Theme_Context = createContext<ContextType>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const saveThemeToLocalStorage = (value: ContextType['mode']) => {
    if (window) {
      window.localStorage.setItem('theme', value);
    }
  };

  const changeHTMLTagClassName = (value: ContextType['mode']) => {
    if (window) {
      const htmlElement = window.document.documentElement;
      htmlElement.classList.remove(mode);
      htmlElement.classList.add(value);
    }
  };

  const onChangeMode = () => {
    if (mode === 'light') {
      setMode('dark');
      saveThemeToLocalStorage('dark');
      changeHTMLTagClassName('dark');
    } else {
      setMode('light');
      saveThemeToLocalStorage('light');
      changeHTMLTagClassName('light');
    }
  };

  useEffect(() => {
    const handleStorage = () => {
      if (window) {
        const htmlElement = window.document.documentElement;
        const theme = window.localStorage.getItem('theme');
        // || window.matchMedia('(prefers-color-scheme: dark)').matches
        if (theme === 'dark') {
          setMode('dark');
          htmlElement.classList.add('dark');
        } else {
          setMode('light');
          htmlElement.classList.add('light');
        }
      }
    };
    handleStorage();
  }, [setMode]);

  return <Theme_Context.Provider value={{ mode, onChangeMode }}>{children}</Theme_Context.Provider>;
};

export default ThemeProvider;
