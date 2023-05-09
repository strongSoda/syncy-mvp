import React, { lazy, Suspense } from 'react';

const LazyAiPoc = lazy(() => import('./AiPoc'));

const AiPoc = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAiPoc {...props} />
  </Suspense>
);

export default AiPoc;
