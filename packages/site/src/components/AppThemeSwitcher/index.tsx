import AppIcon from '@components/AppIcon';
import * as React from 'react';

const AppThemeSwitcher = ({ theme = 'light' }) => {
  return (
    <button
      aria-label="switcher"
      className="flex items-center justify-center text-gray-60 dark:text-gray-60 hover:text-primary"
    >
      {theme === 'light' ? <AppIcon icon="sun" fill="currentColor" /> : <AppIcon icon="moon" fill="currentColor" />}
    </button>
  );
};

export default AppThemeSwitcher;
