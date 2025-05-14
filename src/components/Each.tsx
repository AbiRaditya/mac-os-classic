import React from 'react';

interface EachProps<T> {
  of: T[];
  render: (item: T, index: number) => React.ReactNode;
}

const Each = <T,>({ of, render }: EachProps<T>) => {
  return <>{of.map((item, index) => render(item, index))}</>;
};

export default Each;
