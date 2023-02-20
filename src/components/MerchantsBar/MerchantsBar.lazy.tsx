/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { lazy, Suspense } from 'react';

const LazyMerchantsBar = lazy(() => import('./MerchantsBar'));

const MerchantsBar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMerchantsBar {...props} />
  </Suspense>
);

export default MerchantsBar;
