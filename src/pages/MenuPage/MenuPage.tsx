import React from 'react';

import { Helmet } from 'react-helmet';

import Menu from 'components/Menu/Menu.lazy';

const MenuPage: React.FC = () => (
  <>
    <Helmet>
      <title>MenuPage</title>
    </Helmet>
    <div data-testid="MenuPage">
      <Menu />
    </div>
  </>
);

export default MenuPage;
