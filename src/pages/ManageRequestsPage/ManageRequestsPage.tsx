import React from 'react';

import { Helmet } from 'react-helmet';

import ManageRequests from 'components/ManageRequests/ManageRequests.lazy';

const ManageRequestsPage: React.FC = () => (
  <>
    <Helmet>
      <title>Discover | Syncy</title>
    </Helmet>
    <div data-testid="ManageRequestsPage">
      <ManageRequests />
    </div>
  </>
);

export default ManageRequestsPage;
