import React, { lazy, Suspense } from 'react';

const LazyAuthenticatedRoute = lazy(() => import('./AuthenticatedRoute'));

const AuthenticatedRoute = (props: any) => (
  <Suspense fallback={null}>
    <LazyAuthenticatedRoute {...props} />
  </Suspense>
);

export default AuthenticatedRoute;
