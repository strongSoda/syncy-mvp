import React, { lazy, Suspense } from 'react';

const LazyInfluencerCompleteProfilePage = lazy(() => import('./CompleteProfilePage'));

const InfluencerCompleteProfilePage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInfluencerCompleteProfilePage {...props} />
  </Suspense>
);

export default InfluencerCompleteProfilePage;
