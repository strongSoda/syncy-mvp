import ROUTES from 'global/constants/routes';
import React from 'react';
import { Redirect, Route } from 'react-router';

import UnAuthenticatedRouteWrapper from './UnAuthenticatedRoute.styles';

declare interface IUnAuthenticatedRouteProps {
  component: React.FC;
  isAuthenticated: boolean;
  componentProps?: any;
  path: string;
}

const UnAuthenticatedRoute:  React.FC<IUnAuthenticatedRouteProps> = (props: IUnAuthenticatedRouteProps) => {
  const C = props.component;
  const { isAuthenticated } = props;
  const { componentProps } = props;

  return (
    <UnAuthenticatedRouteWrapper data-testid="AuthenticatedRoute">
      <Route {...componentProps} render={() => (isAuthenticated ? <Redirect to={ROUTES.BRAND.DISCOVER} /> : <C {...props} {...componentProps} />)} />
    </UnAuthenticatedRouteWrapper>
  );
};

export default UnAuthenticatedRoute;
