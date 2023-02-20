/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense, lazy } from 'react';

const LazyManageMerchants = lazy(() => import('./ManageMerchants'));

const ManageMerchants = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => (
  <Suspense fallback={null}>
    <LazyManageMerchants {...props} />
  </Suspense>
);

export default ManageMerchants;
