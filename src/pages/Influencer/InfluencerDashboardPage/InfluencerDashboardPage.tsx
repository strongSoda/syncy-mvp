import InfluencerDashboard from 'components/Influencer/InfluencerDashboard/InfluencerDashboard.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const InfluencerDashboardPage: React.FC = () => (
  <>
    <Helmet>
      <title>Dashboard | Influencer Syncy</title>
    </Helmet>
    <div data-testid="InfluencerDashboardPage">
      <InfluencerDashboard />
    </div>
  </>
);

export default InfluencerDashboardPage;
