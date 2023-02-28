import React, { useContext, useEffect, useState } from 'react';

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
import { AuthContext } from 'global/context/AuthContext';
// import UnAuthenticatedRoute from 'components/Brand/UnAuthenticatedRoute/UnAuthenticatedRoute.lazy';
import LoginPage from 'pages/Brand/LoginPage/LoginPage.lazy';
import SignupPage from 'pages/Brand/SignupPage/SignupPage.lazy';
// import AuthenticatedRoute from 'components/Brand/AuthenticatedRoute/AuthenticatedRoute.lazy';
import ForgotPasswordPage from 'pages/Brand/ForgotPasswordPage/ForgotPasswordPage.lazy';
import { useAppSelector } from 'hooks/storeHooks';
import UnAuthenticatedRoute from 'components/Brand/UnAuthenticatedRoute';
import AuthenticatedRoute from 'components/Brand/AuthenticatedRoute';
;

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

  const loggedin = useAppSelector((state) => state.user.loggedin);
  // const user = useContext(AuthContext);
  // const [loggedin, setLoggedin] = useState(() => false);


  // useEffect(() => {
  //   if (user) {
  //     console.log(user);
  //     setLoggedin(true);
  //   } else {
  //     setLoggedin(false);
  //   }
  // }, [user]);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/counter" component={Counter} />
        {/* <Route exact path={ROUTES.BRAND.DISCOVER} component={ManageRequestsPage} /> */}
        {/* <Route path={`${ROUTES.GENERAL.MANAGE_MERCHANTS}/:id`} component={ManageMerchantsPage} /> */}
        {/* <Route path={`${ROUTES.GENERAL.MANAGE_MENU}/:id`} component={MenuPage} /> */}
        {/* <Route path={ROUTES.GENERAL.CAMPAIGNS} component={ManageMerchantsPage} /> */}

        {/* Brand */}
        <AuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.BRAND.DISCOVER} component={ManageRequestsPage} />
        <AuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.GENERAL.CAMPAIGNS} component={ManageMerchantsPage} />

        <UnAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.BRAND.REGISTER} component={SignupPage} />
        <UnAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.BRAND.LOGIN} component={LoginPage} />
        <UnAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.GENERAL.FORGOT_PASSWORD} component={ForgotPasswordPage} />


        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default AppRouterSwitch;
