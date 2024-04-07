import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import AppAside from '@components/AppAside';
import AppHeader from '@components/AppHeader';
import AppCard from '@components/AppCard';
import AppTabs, { AppTab } from '@components/AppTabs';

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
          <AppCard>
            <ul className="flex items-center justify-around flex-wrap bg-brand-dgray rounded-md px-6 py-4 gap-4 md:gap-0">
              <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
                <div>
                  <p className="font-bold text-lg text-primary">2/3</p>
                  <p className="font-medium text-xs text-primary/75">contracted</p>
                </div>
              </li>
              <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
                <div>
                  <p className="font-bold text-lg text-primary">2/3</p>
                  <p className="font-medium text-xs text-primary/75">contracted</p>
                </div>
              </li>
              <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
                <div>
                  <p className="font-bold text-lg text-primary">2/3</p>
                  <p className="font-medium text-xs text-primary/75">contracted</p>
                </div>
              </li>
              <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
                <div>
                  <p className="font-bold text-lg text-primary">2/3</p>
                  <p className="font-medium text-xs text-primary/75">contracted</p>
                </div>
              </li>
              <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
                <div>
                  <p className="font-bold text-lg text-primary">2/3</p>
                  <p className="font-medium text-xs text-primary/75">contracted</p>
                </div>
              </li>
            </ul>
            <div></div>
          </AppCard>
          <AppTabs>
            <AppTab header="Post">
              122 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam illo voluptatibus dolor accusantium
              sunt dolorem, nesciunt magnam repellat odit repudiandae aliquam adipisci tempore similique consectetur.
              Laborum expedita laboriosam eveniet iusto! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda, tempore. Labore impedit cum ex exercitationem tempore esse quidem molestiae qui, beatae debitis
              odio mollitia est facilis sunt. Debitis, officiis quod.
            </AppTab>
            <AppTab header="Contacts">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, sed et eligendi natus facere neque omnis.
              Velit rerum aut itaque eius culpa, esse mollitia totam? Doloribus neque similique quasi dicta!
            </AppTab>
          </AppTabs>
        </section>
      </section>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Home Page</title>
    <meta name="author" content="Samson Iyanda"></meta>
    <meta name="description" content="site for gatsby source hubspot plugin documentation"></meta>
    <meta name="keywords" content="gatsby, gatsby plugin, reactjs, hubspot"></meta>
  </>
);
