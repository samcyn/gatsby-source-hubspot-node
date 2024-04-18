import React from 'react';
import AppIcon from '@components/AppIcon';

const AppFooter = () => {
  return (
    <section className="flex items-center justify-between py-8 lg:py-12 lg:px-6 border-t lg:mt-14 border-gray-1">
      <small className="text-xs text-gray-60/90 dark:text-gray-50/90">Made with love by Samson Iyanda</small>
      <ul className="flex justify-between gap-8 text-sm">
        <li className="flex items-center gap-4">
          <a
            title="Github"
            className="py-0.5 px-1 text-inherit text-gray-60 dark:text-gray-50 hover:text-primary"
            target="_blank"
            href="https://github.com/samcyn"
          >
            <AppIcon icon="github" />
          </a>
          <a
            title="LinkedIn"
            className="py-0.5 px-1 text-inherit text-gray-60 dark:text-gray-50 hover:text-primary"
            href="https://www.linkedin.com/in/samson-iyanda-36641b22/"
            target="_blank"
          >
            <AppIcon icon="linkedin" />
          </a>
          <a
            title="X"
            className="py-0.5 px-1 text-inherit text-gray-60 dark:text-gray-50 hover:text-primary"
            href="https://twitter.com/Jide_Cares"
            target="_blank"
          >
            <AppIcon icon="twitter" />
          </a>
          <a
            title="Portfolio"
            className="py-0.5 px-1 text-inherit text-gray-60 dark:text-gray-50 hover:text-primary"
            href="https://www.samsoniyanda.com/"
            target="_blank"
          >
            <AppIcon icon="link" fill="none" />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default AppFooter;
