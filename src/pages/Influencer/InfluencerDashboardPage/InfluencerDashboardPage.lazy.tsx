import React, { lazy, Suspense } from 'react';

const LazyInfluencerDashboardPage = lazy(() => import('./InfluencerDashboardPage'));

const InfluencerDashboardPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInfluencerDashboardPage {...props} />
  </Suspense>
);

export default InfluencerDashboardPage;
