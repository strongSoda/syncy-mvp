import React, { lazy, Suspense } from 'react';

const LazyForgotPasswordPage = lazy(() => import('./ForgotPasswordPage'));

const ForgotPasswordPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyForgotPasswordPage {...props} />
  </Suspense>
);

export default ForgotPasswordPage;
