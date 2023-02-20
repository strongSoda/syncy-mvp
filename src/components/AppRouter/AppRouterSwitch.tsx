import React from 'react';

import { Link, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import ROUTES from 'global/constants/routes';
import usePageViews from 'hooks/usePageViews';
import Counter from 'pages/counter';
import Home from 'pages/home';
import ManageMerchantsPage from 'pages/ManageMerchantsPage/ManageMerchantsPage.lazy';
import ManageRequestsPage from 'pages/ManageRequestsPage/ManageRequestsPage.lazy';
import NotFoundPage from 'pages/notfound';
import MenuPage from 'pages/MenuPage/MenuPage.lazy';

const StyledNav = styled.nav`
  display: flex;
`;

const StyledLink = styled(Link)`
  padding: 16px;
  background: #3a4e75;
  color: white;
  text-decoration: none;
  margin-right: 8px;
`;

const AppRouterSwitch: React.FC = () => {
  usePageViews();
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/counter" component={Counter} />
        <Route path={ROUTES.GENERAL.DISCOVER} component={ManageRequestsPage} />
        {/* <Route path={`${ROUTES.GENERAL.MANAGE_MERCHANTS}/:id`} component={ManageMerchantsPage} /> */}
        <Route path={`${ROUTES.GENERAL.MANAGE_MENU}/:id`} component={MenuPage} />
        <Route path={ROUTES.GENERAL.CAMPAIGNS} component={ManageMerchantsPage} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default AppRouterSwitch;
