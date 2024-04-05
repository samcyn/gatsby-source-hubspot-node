import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import AppAside from '@components/AppAside';
import AppHeader from '@components/AppHeader';

const IndexPage: React.FC<PageProps> = () => {
  const [open, setOpen] = React.useState(false);

  const onOpen = () => {
    setOpen((p) => !p);
  };
  return (
    <main className="bg-complimentary min-h-screen overflow-hidden">
      <AppAside />
      <section
        className={`
        w-full min-h-screen bg-complimentary 
        relative z-10 md:z-0 md:pl-60 transition
        ${open ? 'translate-x-60 md:translate-x-0' : 'translate-x-0'}
      `}
      >
        {/* overlay */}
        {open && <div onClick={onOpen} className="fixed md:hidden inset-0 bg-white/25"></div>}
        <section className="px-4 md:px-25">
          <AppHeader onOpen={onOpen} />
          <p className="text-2xl font-bold text-primary dark:text-primary">Gatsby Source Hubspot Node Plugin v1.0.1</p>
          <ul>
            <li>Posts</li>
            <li>Contacts</li>
          </ul>
        </section>
      </section>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
