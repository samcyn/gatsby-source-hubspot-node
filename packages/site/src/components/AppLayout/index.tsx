import React, { ReactElement } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';

import AppAside from '@components/AppAside';
import AppHeader from '@components/AppHeader';
import ThemeProvider from '../../providers/theme';
import AppFooter from '@components/AppFooter';

// tailwind css
import '../../styles/global.css';

const shortcodes = { Link };

const AppLayout = ({ element }: { element: ReactElement }) => {
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
          {open && <div onClick={onOpen} className="fixed lg:hidden inset-0 bg-white/25"></div>}
          <section className="px-4 md:px-12 lg:px-25">
            <AppHeader onOpen={onOpen} />
            <MDXProvider components={shortcodes}>{element}</MDXProvider>
            <AppFooter />
          </section>
        </section>
      </main>
    </ThemeProvider>
  );
};

export default AppLayout;
