import React, { lazy, Suspense } from 'react';

const LazyInfluencerDashboard = lazy(() => import('./InfluencerDashboard'));

const InfluencerDashboard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInfluencerDashboard {...props} />
  </Suspense>
);

export default InfluencerDashboard;
