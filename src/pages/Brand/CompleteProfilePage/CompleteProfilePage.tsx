import BrandCompleteProfile from 'components/Brand/CompleteProfile/CompleteProfile.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const BrandCompleteProfilePage: React.FC = () => (
  <>
    <Helmet>
      <title>Complete Profile | Brand</title>
    </Helmet>
    <div data-testid="BrandCompleteProfilePage">
      <BrandCompleteProfile />
    </div>
  </>
);

export default BrandCompleteProfilePage;
