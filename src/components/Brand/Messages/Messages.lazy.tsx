import React, { lazy, Suspense } from 'react';

const LazyMessages = lazy(() => import('./Messages'));

const Messages = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMessages {...props} />
  </Suspense>
);

export default Messages;
