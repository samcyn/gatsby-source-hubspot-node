import * as React from 'react';
import { Link } from 'gatsby';

import AppInput from '@components/AppInput';
import AppIcon, { Props as AppIconProps } from '@components/AppIcon';

type MenuItemProps = {
  to: string;
  title: string;
};

type ListItemProps = {
  title: string;
  menus: Array<MenuItemProps>;
  icon: AppIconProps['icon'];
};

const ListItem = ({ title, menus, icon }: ListItemProps) => (
  <li className="flex items-center flex-wrap text-gray-60">
    <span className="-ml-8 w-8 inline-flex items-center">
      <AppIcon icon={icon} />
    </span>
    <span className="uppercase text-sm font-medium">{title}</span>
    <ul className="basis-full relative mt-3 -ml-[22px] pl-[21px] border-l-[1px] border-gray-30">
      {menus.map((menu) => (
        <MenuItem key={menu.title} {...menu} />
      ))}
    </ul>
  </li>
);

const MenuItem = ({ to, title }: MenuItemProps) => {
  return (
    <li className="pb-6 last-of-type:pb-0">
      <Link
        to={to}
        className="-ml-[22px] border-l-[1px] pl-[21px] pr-4 block h-full"
        activeClassName="text-primary border-primary font-medium"
      >
        <span className="shrink grow text-sm">{title}</span>
      </Link>
    </li>
  );
};

const AppAside = () => (
  <aside className="fixed h-screen top-0 bottom-0 w-60 bg-white ring-1 ring-gray-60/30 ring-inset lg:ring-0 py-20 lg:py-30 px-6 z-0 lg:z-10">
    <div className="mb-5">
      <a aria-label="Link to home" className="" href="/">
        <svg className="" width="91" height="24" fill="#663399" viewBox="0 0 106 28">
          <g>
            <path d="M14,0C6.3,0,0,6.3,0,14s6.3,14,14,14s14-6.3,14-14S21.7,0,14,0z M6.2,21.8c-2.1-2.1-3.2-4.9-3.2-7.6L13.9,25 C11.1,24.9,8.3,23.9,6.2,21.8z M16.4,24.7L3.3,11.6C4.4,6.7,8.8,3,14,3c3.7,0,6.9,1.8,8.9,4.5l-1.5,1.3C19.7,6.5,17,5,14,5 c-3.9,0-7.2,2.5-8.5,6L17,22.5c2.9-1,5.1-3.5,5.8-6.5H18v-2h7C25,19.2,21.3,23.6,16.4,24.7z"></path>
          </g>
          <g fill="#000">
            <path d="M62.9,12h2.8v10h-2.8v-1.3c-1,1.5-2.3,1.6-3.1,1.6c-3.1,0-5.1-2.4-5.1-5.3c0-3,2-5.3,4.9-5.3c0.8,0,2.3,0.1,3.2,1.6V12z M57.7,17c0,1.6,1.1,2.8,2.8,2.8c1.6,0,2.8-1.2,2.8-2.8c0-1.6-1.1-2.8-2.8-2.8C58.9,14.2,57.7,15.4,57.7,17z"></path>
            <path d="M71.2,14.4V22h-2.8v-7.6h-1.1V12h1.1V8.6h2.8V12h1.9v2.4H71.2z"></path>
            <path d="M79.7,14.4c-0.7-0.6-1.3-0.7-1.6-0.7c-0.7,0-1.1,0.3-1.1,0.8c0,0.3,0.1,0.6,0.9,0.9l0.7,0.2c0.8,0.3,2,0.6,2.5,1.4 c0.3,0.4,0.5,1,0.5,1.7c0,0.9-0.3,1.8-1.1,2.5c-0.8,0.7-1.8,1.1-3,1.1c-2.1,0-3.2-1-3.9-1.7l1.5-1.7c0.6,0.6,1.4,1.2,2.2,1.2 c0.8,0,1.4-0.4,1.4-1.1c0-0.6-0.5-0.9-0.9-1l-0.6-0.2c-0.7-0.3-1.5-0.6-2.1-1.2c-0.5-0.5-0.8-1.1-0.8-1.9c0-1,0.5-1.8,1-2.3 c0.8-0.6,1.8-0.7,2.6-0.7c0.7,0,1.9,0.1,3.2,1.1L79.7,14.4z"></path>
            <path d="M85.8,13.3c1-1.4,2.4-1.6,3.2-1.6c2.9,0,4.9,2.3,4.9,5.3c0,3-2,5.3-5,5.3c-0.6,0-2.1-0.1-3.2-1.6V22H83V5.2h2.8V13.3z M85.5,17c0,1.6,1.1,2.8,2.8,2.8c1.6,0,2.8-1.2,2.8-2.8c0-1.6-1.1-2.8-2.8-2.8C86.6,14.2,85.5,15.4,85.5,17z"></path>
            <path d="M98.5,20.5L93.7,12H97l3.1,5.7l2.8-5.7h3.2l-8,15.3h-3.2L98.5,20.5z"></path>
            <path d="M54,13.7h-2.8c0,0-4.2,0-4.2,0v2.8h3.7c-0.6,1.9-2,3.2-4.6,3.2c-2.9,0-5-2.4-5-5.3S43.1,9,46,9c1.6,0,3.2,0.8,4.2,2.1 l2.3-1.5C51,7.5,48.6,6.3,46,6.3c-4.4,0-8,3.6-8,8.1s3.4,8.1,8,8.1s8-3.6,8-8.1C54.1,14.1,54,13.9,54,13.7z"></path>
          </g>
        </svg>
      </a>
    </div>
    <div>
      <AppInput placeholder="Search" name="search" />
    </div>
    <nav className="pl-8 mt-10">
      <ul className="flex flex-col gap-10">
        <ListItem
          title="Main"
          icon="grid"
          menus={[
            {
              to: '/',
              title: 'Overview',
            },
            {
              to: '/dashboard',
              title: 'Dashboard',
            },
          ]}
        />
      </ul>
    </nav>
  </aside>
);

export default AppAside;
