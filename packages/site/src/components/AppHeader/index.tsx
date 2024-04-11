import * as React from 'react';

import AppThemeSwitcher from '@components/AppThemeSwitcher';
import AppIcon from '@components/AppIcon';

const AppHeader = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <header>
      <nav className="flex items-center justify-between py-4">
        <button aria-label="toggle menu" className="text-gray-80 dark:text-gray-50 text-4xl lg:hidden" onClick={onOpen}>
          <AppIcon icon="hamburger" aria-hidden="true" width="1em" height="1em" fill="none" viewBox="0 0 24 24" />
        </button>
        <ul className="hidden lg:flex gap-4">
          <li>
            <button className="text-xs text-gray-60 dark:text-gray-50 hover:text-primary flex items-center">
              <AppIcon icon="back-arrow" />
              Back to Dashboard
            </button>
          </li>
        </ul>
        <ul className="flex gap-4 ml-auto">
          <li>
            <a
              className="text-gray-60 dark:text-gray-50 hover:text-primary"
              href="https://github.com/samcyn/gatsby-source-hubspot-node.git"
              target="_blank"
              aria-label="repo github link"
            >
              <span className="sr-only">repo github link</span>
              <AppIcon icon="github" fill="currentColor" />
            </a>
          </li>
          <li>
            <AppThemeSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
