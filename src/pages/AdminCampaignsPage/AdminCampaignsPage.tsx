import AdminCampaigns from 'components/AdminCampaigns/AdminCampaigns.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const AdminCampaignsPage: React.FC = () => (
  <>
    <Helmet>
      <title>Manage Campaigns | Admin</title>
    </Helmet>
    <div data-testid="AdminCampaignsPage">
      <AdminCampaigns />
    </div>
  </>
);

export default AdminCampaignsPage;
