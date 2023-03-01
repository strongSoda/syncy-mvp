import React, { lazy, Suspense } from 'react';

const LazySignupPage = lazy(() => import('./SignupPage'));

const SignupPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySignupPage {...props} />
  </Suspense>
);

export default SignupPage;
