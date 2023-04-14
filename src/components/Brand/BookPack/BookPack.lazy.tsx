import React, { lazy, Suspense } from 'react';

const LazyBookPack = lazy(() => import('./BookPack'));

const BookPack = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBookPack {...props} />
  </Suspense>
);

export default BookPack;
