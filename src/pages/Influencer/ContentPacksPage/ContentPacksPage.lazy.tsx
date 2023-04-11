import React, { lazy, Suspense } from 'react';

const LazyContentPacksPage = lazy(() => import('./ContentPacksPage'));

const ContentPacksPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyContentPacksPage {...props} />
  </Suspense>
);

export default ContentPacksPage;
