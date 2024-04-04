import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

const IndexPage: React.FC<PageProps> = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <main className="bg-gray-500 min-h-screen overflow-hidden">
      <aside className="fixed h-screen top-0 bottom-0 w-60 bg-slate-950 py-5 px-4 z-0 md:z-10">
        <div>
          <a>logo</a>
        </div>
        <div>
          <input type="search" />
        </div>
        <ul>
          <li>Dashboard 1</li>
          <li>Dashboard 2</li>
          <li>Dashboard 3</li>
          <li>Dashboard 4</li>
        </ul>
      </aside>
      <section
        className={`
        w-full min-h-screen bg-gray-500 
        relative z-10 md:z-0 md:pl-60 transition
        ${open ? 'translate-x-60 md:translate-x-0' : 'translate-x-0'}
      `}
      >
        {/* overlay */}
        {open && <div onClick={() => setOpen((p) => !p)} className="fixed md:hidden inset-0 bg-white/25"></div>}
        <section className="px-4 md:px-25">
          <header>
            <nav className="flex items-center justify-between">
              <button className="md:hidden" onClick={() => setOpen((p) => !p)}>
                humberger
              </button>
              <a>back</a>
              <button>items</button>
            </nav>
          </header>
          <p>Audio VISUAL media</p>
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
