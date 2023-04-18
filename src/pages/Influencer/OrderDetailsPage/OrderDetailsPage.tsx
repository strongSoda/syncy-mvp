import OrderDetails from 'components/Influencer/OrderDetails/OrderDetails.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const OrderDetailsPage: React.FC = () => (
  <>
    <Helmet>
      <title>Order Details | Influencer Syncy</title>
    </Helmet>
    <div data-testid="OrderDetailsPage">
      <OrderDetails />
    </div>
  </>
);

export default OrderDetailsPage;
