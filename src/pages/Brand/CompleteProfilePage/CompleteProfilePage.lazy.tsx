import React, { lazy, Suspense } from 'react';

const LazyBrandCompleteProfilePage = lazy(() => import('./CompleteProfilePage'));

const BrandCompleteProfilePage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBrandCompleteProfilePage {...props} />
  </Suspense>
);

export default BrandCompleteProfilePage;
