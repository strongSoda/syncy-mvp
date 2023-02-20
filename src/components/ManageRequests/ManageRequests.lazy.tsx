/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense, lazy } from 'react';

const LazyManageRequests = lazy(() => import('./ManageRequests'));

const ManageRequests = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => (
  <Suspense fallback={null}>
    <LazyManageRequests {...props} />
  </Suspense>
);

export default ManageRequests;
