import React, { lazy, Suspense } from 'react';

const LazyPostTemplates = lazy(() => import('./PostTemplates'));

const PostTemplates = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPostTemplates {...props} />
  </Suspense>
);

export default PostTemplates;
