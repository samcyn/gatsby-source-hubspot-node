import React, { ReactElement } from 'react';
import AppAside from '@components/AppAside';
import AppHeader from '@components/AppHeader';
// tailwind css
import '../../styles/global.css';

const AppLayout = ({ element }: { element: ReactElement }) => {
  const [open, setOpen] = React.useState(false);

  const onOpen = () => {
    setOpen((p) => !p);
  };
  return (
    <main className="bg-white min-h-screen overflow-hidden max-w-screen-2xl xl:px-12 mx-auto">
      <AppAside />
      <section
        className={`
        w-full min-h-screen bg-white 
        relative z-10 md:z-0 md:pl-60 transition
        ${open ? 'translate-x-60 md:translate-x-0' : 'translate-x-0'}
      `}
      >
        {/* overlay */}
        {open && <div onClick={onOpen} className="fixed md:hidden inset-0 bg-white/25"></div>}
        <section className="px-4 md:px-25">
          <AppHeader onOpen={onOpen} />
          {element}
        </section>
      </section>
    </main>
  );
};

export default AppLayout;
