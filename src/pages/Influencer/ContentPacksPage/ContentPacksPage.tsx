import ContentPacks from 'components/Influencer/ContentPacks/ContentPacks.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const ContentPacksPage: React.FC = () => (
  <>
    <Helmet>
      <title>My Deliverables | Influencer Syncy</title>
    </Helmet>
    <div data-testid="ContentPacksPage">
      <ContentPacks />
    </div>
  </>
);

export default ContentPacksPage;
