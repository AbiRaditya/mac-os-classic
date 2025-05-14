import React from 'react';

interface ShowProps {
  when: boolean;
  children: React.ReactNode;
}

const Show: React.FC<ShowProps> = ({ when, children }) => {
  if (!when) {
    return null;
  }
  return <>{children}</>;
};

export default Show;
