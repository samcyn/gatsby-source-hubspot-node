import React from 'react';

const AppCard = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={`bg-white dark:bg-white shadow-md ${className || ''}`}>{children}</div>;
};

export default AppCard;
