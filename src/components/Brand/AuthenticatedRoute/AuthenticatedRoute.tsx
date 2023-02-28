import ROUTES from 'global/constants/routes';
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router';

import AuthenticatedRouteWrapper from './AuthenticatedRoute.styles';

declare interface IAuthenticatedRouteProps {
  component: React.FC;
  isAuthenticated: boolean;
  componentProps?: any;
  path: string;
}

const AuthenticatedRoute: React.FC<IAuthenticatedRouteProps> = (props: IAuthenticatedRouteProps) => {
  const C = props.component;
  const { isAuthenticated } = props;
  const { componentProps } = props;

  useEffect(() => {
    console.log('AuthenticatedRoute', props);
  }, [props]);

  return (
    <AuthenticatedRouteWrapper data-testid="AuthenticatedRoute">
      <Route
        {...componentProps}
        render={() =>
          isAuthenticated ? (
              <C {...props} {...componentProps} />
          ) : (
            <Redirect to={ROUTES.BRAND.LOGIN} />
          )
        }
      />
    </AuthenticatedRouteWrapper>
  );
};

export default AuthenticatedRoute;
