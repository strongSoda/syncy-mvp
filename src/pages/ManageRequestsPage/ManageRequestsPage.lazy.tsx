/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense, lazy } from 'react';

const LazyManageRequestsPage = lazy(() => import('./ManageRequestsPage'));

const ManageRequestsPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyManageRequestsPage {...props} />
  </Suspense>
);

export default ManageRequestsPage;
