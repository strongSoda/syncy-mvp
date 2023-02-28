import React, { lazy, Suspense } from 'react';

const LazyBrandCompleteProfile = lazy(() => import('./CompleteProfile'));

const BrandCompleteProfile = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBrandCompleteProfile {...props} />
  </Suspense>
);

export default BrandCompleteProfile;
