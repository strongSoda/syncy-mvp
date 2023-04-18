import React, { lazy, Suspense } from 'react';

const LazyOrderDetails = lazy(() => import('./OrderDetails'));

const OrderDetails = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOrderDetails {...props} />
  </Suspense>
);

export default OrderDetails;
