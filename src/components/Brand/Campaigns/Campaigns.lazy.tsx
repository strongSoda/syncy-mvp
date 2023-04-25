import React, { lazy, Suspense } from 'react';

const LazyCampaigns = lazy(() => import('./Campaigns'));

const Campaigns = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCampaigns {...props} />
  </Suspense>
);

export default Campaigns;
