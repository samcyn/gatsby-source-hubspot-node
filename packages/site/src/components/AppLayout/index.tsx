import React, { ReactElement } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';

import AppAside from '@components/AppAside';
import AppHeader from '@components/AppHeader';
import ThemeProvider from '../../providers/theme';
import AppFooter from '@components/AppFooter';

// tailwind css
import '../../styles/global.css';

const MyH1 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-dark dark:text-white font-bold text-xs md:text-sm lg:text-3xl mt-12 mb-6" {...props} />
);
const MyH2 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-dark dark:text-white font-bold text-xs md:text-sm lg:text-2xl mt-12 mb-6" {...props} />
);
const MyH3 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-dark dark:text-white font-bold text-xs md:text-sm lg:text-xl mt-12 mb-6" {...props} />
);
const MyH4 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-dark dark:text-white font-bold text-xs md:text-sm lg:text-lg mt-12 mb-6" {...props} />
);
const MyH5 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-dark dark:text-white font-bold text-xs md:text-sm lg:text-sm mt-12 mb-6" {...props} />
);
const MyH6 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-dark dark:text-white font-bold text-xs md:text-sm lg:text-xs mt-12 mb-6" {...props} />
);
const MyUL = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
  <ul
    className="ml-6 mb-6 list-disc list-image-none list-outside text-gray-80 dark:text-white text-sm break-words"
    {...props}
  />
);

const MyAnchor = (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
  <a className="" {...props} />
);
const MyParagraph = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
) => <p className="text-gray-80 dark:text-white text-sm mb-6" {...props} />;

const Announcement = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-l-2 border-primary pl-4 py-0.5 mb-6">{children}</div>;
};

const shortcodes = {
  Link,
  Announcement,
  h1: MyH1,
  h2: MyH2,
  h3: MyH3,
  h4: MyH4,
  h5: MyH5,
  h6: MyH6,
  ul: MyUL,
  p: MyParagraph,
  a: MyAnchor,
};

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
