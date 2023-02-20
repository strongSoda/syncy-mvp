/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { lazy, Suspense } from 'react';

const LazyMenu = lazy(() => import('./Menu'));

const Menu = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMenu {...props} />
  </Suspense>
);

export default Menu;
