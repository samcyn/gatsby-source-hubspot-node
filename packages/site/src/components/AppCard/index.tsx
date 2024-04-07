import * as React from 'react';

const AppCard = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-white dark:bg-white rounded-md p-4 shadow-md">{children}</div>;
};

export default AppCard;
