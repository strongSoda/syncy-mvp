import InfluencerCompleteProfile from 'components/Influencer/CompleteProfile/CompleteProfile';
import React from 'react';

import { Helmet } from 'react-helmet';

const InfluencerCompleteProfilePage: React.FC = () => (
  <>
    <Helmet>
      <title>Complete Profile | Brand</title>
    </Helmet>
    <div data-testid="BrandCompleteProfilePage">
      <InfluencerCompleteProfile />
    </div>
  </>
);

export default InfluencerCompleteProfilePage;
