import React from 'react';

const AppCard = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={`${className || ''}`}>{children}</div>;
};

export default AppCard;
