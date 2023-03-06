import Messages from 'components/Brand/Messages/Messages.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const MessagesPage: React.FC = () => (
  <>
    <Helmet>
      <title>Messages | Brand</title>
    </Helmet>
    <div data-testid="MessagesPage">
      <Messages />
    </div>
  </>
);

export default MessagesPage;
