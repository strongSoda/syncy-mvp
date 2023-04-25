import Campaigns from 'components/Brand/Campaigns/Campaigns.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const CampaignsPage: React.FC = () => (
  <>
    <Helmet>
      <title>My Campaigns | Syncy</title>
    </Helmet>
    <div data-testid="CampaignsPage">
      <Campaigns />
    </div>
  </>
);

export default CampaignsPage;
