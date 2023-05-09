import React, { lazy, Suspense } from 'react';

const LazyAiPocPage = lazy(() => import('./AiPocPage'));

const AiPocPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAiPocPage {...props} />
  </Suspense>
);

export default AiPocPage;
