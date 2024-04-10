import * as React from 'react';

import AppIcon from '@components/AppIcon';
import { Theme_Context } from '../../providers/theme';

const AppThemeSwitcher = () => {
  const { mode, onChangeMode } = React.useContext(Theme_Context);

  return (
    <button
      aria-label="switcher"
      className="flex items-center justify-center text-gray-60 dark:text-gray-60 hover:text-primary"
      onClick={onChangeMode}
    >
      {mode === 'light' ? <AppIcon icon="sun" fill="currentColor" /> : <AppIcon icon="moon" fill="currentColor" />}
    </button>
  );
};

export default AppThemeSwitcher;
