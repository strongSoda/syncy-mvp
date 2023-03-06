import React, { lazy, Suspense } from 'react';

const LazyMessagesPage = lazy(() => import('./MessagesPage'));

const MessagesPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMessagesPage {...props} />
  </Suspense>
);

export default MessagesPage;
