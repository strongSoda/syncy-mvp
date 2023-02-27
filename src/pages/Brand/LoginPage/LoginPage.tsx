import Login from 'components/Brand/Login/Login.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const LoginPage: React.FC = () => (
  <>
    <Helmet>
      <title>Login | Syncy</title>
    </Helmet>
    <div data-testid="LoginPage">
      <Login />
    </div>
  </>
);

export default LoginPage;
