import AiPoc from 'components/AiPoc/AiPoc.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const AiPocPage: React.FC = () => (
  <>
    <Helmet>
    </Helmet>
    <div data-testid="AiPocPage">
      <AiPoc />
    </div>
  </>
);

export default AiPocPage;
