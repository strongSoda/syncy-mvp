import Orders from 'components/Brand/Orders/Orders.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const OrdersPage: React.FC = () => (
  <>
    <Helmet>
      <title>OrdersPage</title>
    </Helmet>
    <div data-testid="OrdersPage">
      <Orders />
    </div>
  </>
);

export default OrdersPage;
