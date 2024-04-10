import React, { ReactNode, createContext, useState } from 'react';

type ContextType = {
  mode: 'light' | 'dark';
  onChangeMode: () => void;
};

export const Theme_Context = createContext<ContextType>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const onChangeMode = () => {
    setMode((prev) => {
      if (prev === 'dark') {
        return 'light';
      }
      return 'dark';
    });
  };

  return <Theme_Context.Provider value={{ mode, onChangeMode }}>{children}</Theme_Context.Provider>;
};

export default ThemeProvider;
