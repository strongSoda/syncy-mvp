import React, { lazy, Suspense } from 'react';

const LazyInfluencerCompleteProfile = lazy(() => import('./CompleteProfile'));

const InfluencerCompleteProfile = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInfluencerCompleteProfile {...props} />
  </Suspense>
);

export default InfluencerCompleteProfile;
