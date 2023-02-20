import React, { lazy, Suspense } from 'react';

const LazyNavbar = lazy(() => import('./Navbar'));

const Navbar = (props: JSX.IntrinsicAttributes) => (
  <Suspense fallback={null}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <LazyNavbar {...props} />
  </Suspense>
);

export default Navbar;
