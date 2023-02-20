/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { lazy, Suspense } from 'react';

const LazyMenuPage = lazy(() => import('./MenuPage'));

const MenuPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMenuPage {...props} />
  </Suspense>
);

export default MenuPage;
