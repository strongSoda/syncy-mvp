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

  const deliverable_id = window.location?.hash?.split('#')[1];
  console.log('deliverable', deliverable_id?.split('-')[1]);

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
            <Redirect to={{ pathname: ROUTES.BRAND.LOGIN + (deliverable_id ? `#deliverable-${deliverable_id?.split('-')[1]}` : ''), search: window.location?.search }} />
          )
        }
      />
    </AuthenticatedRouteWrapper>
  );
};

export default AuthenticatedRoute;
