import React, { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';

import AppAside from '@components/AppAside';
import AppHeader from '@components/AppHeader';
import ThemeProvider from '../../providers/theme';
import AppFooter from '@components/AppFooter';
import { shortcodes } from '@components/AppShortCodes';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  const onOpen = () => {
    setOpen((p) => !p);
  };
  return (
    <ThemeProvider>
      <main className="bg-white dark:bg-dark transition-colors min-h-screen overflow-hidden lg:overflow-visible max-w-screen-2xl xl:px-12 mx-auto">
        <AppAside />
        <section
          className={`
        w-full min-h-screen bg-white dark:bg-dark
        relative z-10 lg:z-0 lg:pl-60 transition
        ${open ? 'translate-x-60 lg:translate-x-0' : 'translate-x-0'}
      `}
        >
          {/* overlay */}
          {open && (
            <div
              onClick={onOpen}
              className="absolute lg:hidden inset-0 h-full min-h-screen bg-white/70 dark:bg-dark/90 z-[1000]"
            ></div>
          )}
          <section className="px-4 md:px-6 xl:px-19">
            <AppHeader onOpen={onOpen} />
            <MDXProvider components={shortcodes}>{children}</MDXProvider>
            <AppFooter />
          </section>
        </section>
      </main>
    </ThemeProvider>
  );
};

export default AppLayout;
