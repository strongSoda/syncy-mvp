/* eslint-disable react/destructuring-assignment */
import React, { lazy, Suspense } from 'react';

const LazyButton = lazy(() => import('./Button'));

const Button = (props: any) => (
  <Suspense fallback={null}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <LazyButton {...props} />
  </Suspense>
);

export default Button;
