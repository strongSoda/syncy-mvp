import React, { lazy, Suspense } from 'react';

const LazyCampaignsPage = lazy(() => import('./CampaignsPage'));

const CampaignsPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCampaignsPage {...props} />
  </Suspense>
);

export default CampaignsPage;
