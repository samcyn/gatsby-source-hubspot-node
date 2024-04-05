import * as React from 'react';

const AppHeader = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <header>
      <nav className="flex items-center justify-between">
        <button className="md:hidden" onClick={onOpen}>
          humberger
        </button>
        <a>back</a>
        <button>items</button>
      </nav>
    </header>
  );
};

export default AppHeader;
