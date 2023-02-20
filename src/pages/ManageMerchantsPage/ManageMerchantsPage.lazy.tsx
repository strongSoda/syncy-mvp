/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense, lazy } from 'react';

const LazyManageMerchantsPage = lazy(() => import('./ManageMerchantsPage'));

const ManageMerchantsPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => (
  <Suspense fallback={null}>
    <LazyManageMerchantsPage {...props} />
  </Suspense>
);

export default ManageMerchantsPage;
