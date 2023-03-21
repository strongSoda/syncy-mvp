import React, { lazy, Suspense } from 'react';

const LazyAdminCampaignsPage = lazy(() => import('./AdminCampaignsPage'));

const AdminCampaignsPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAdminCampaignsPage {...props} />
  </Suspense>
);

export default AdminCampaignsPage;
