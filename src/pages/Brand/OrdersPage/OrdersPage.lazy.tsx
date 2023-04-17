import React, { lazy, Suspense } from 'react';

const LazyOrdersPage = lazy(() => import('./OrdersPage'));

const OrdersPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOrdersPage {...props} />
  </Suspense>
);

export default OrdersPage;
