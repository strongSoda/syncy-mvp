import React from 'react';

import { Helmet } from 'react-helmet';

import ManageMerchants from 'components/ManageMerchants/ManageMerchants.lazy';

const ManageMerchantsPage: React.FC = () => (
  <>
    <Helmet>
      <title>ManageMerchantsPage</title>
    </Helmet>
    <div data-testid="ManageMerchantsPage">
      <ManageMerchants />
    </div>
  </>
);

export default ManageMerchantsPage;
