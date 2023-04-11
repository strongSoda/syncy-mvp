import React, { lazy, Suspense } from 'react';

const LazyContentPacks = lazy(() => import('./ContentPacks'));

const ContentPacks = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyContentPacks {...props} />
  </Suspense>
);

export default ContentPacks;
