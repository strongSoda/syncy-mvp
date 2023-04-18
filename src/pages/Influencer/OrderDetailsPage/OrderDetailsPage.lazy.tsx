import React, { lazy, Suspense } from 'react';

const LazyOrderDetailsPage = lazy(() => import('./OrderDetailsPage'));

const OrderDetailsPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOrderDetailsPage {...props} />
  </Suspense>
);

export default OrderDetailsPage;
