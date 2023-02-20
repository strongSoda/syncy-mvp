/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense, lazy } from 'react';

const LazySideBar = lazy(() => import('./SideBar'));

const SideBar = (props: any & { children?: React.ReactNode }) => (
  <Suspense fallback={null}>
    {/* eslint-disable-next-line react/destructuring-assignment */}
    <LazySideBar lightColor={props?.lightColor} darkColor={props?.darkColor} {...props} />
  </Suspense>
);

export default SideBar;
