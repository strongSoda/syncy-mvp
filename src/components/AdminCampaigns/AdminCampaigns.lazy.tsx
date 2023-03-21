import React, { lazy, Suspense } from 'react';

const LazyAdminCampaigns = lazy(() => import('./AdminCampaigns'));

const AdminCampaigns = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAdminCampaigns {...props} />
  </Suspense>
);

export default AdminCampaigns;
