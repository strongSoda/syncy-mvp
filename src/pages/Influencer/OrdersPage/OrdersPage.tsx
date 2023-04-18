import Orders from 'components/Influencer/Orders/Orders.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const OrdersPage: React.FC = () => (
  <>
    <Helmet>
      <title>Orders | Influencer Syncy</title>
    </Helmet>
    <div data-testid="OrdersPage">
      <Orders />
    </div>
  </>
);

export default OrdersPage;
