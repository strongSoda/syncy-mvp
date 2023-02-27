import React, { lazy, Suspense } from 'react';

const LazyUnAuthenticatedRoute = lazy(() => import('./UnAuthenticatedRoute'));

const UnAuthenticatedRoute = (props: any) => (
  <Suspense fallback={null}>
    <LazyUnAuthenticatedRoute {...props} />
  </Suspense>
);

export default UnAuthenticatedRoute;
