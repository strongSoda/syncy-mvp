import ForgotPassword from 'components/Brand/ForgotPassword/ForgotPassword.lazy';
import Login from 'components/Brand/Login/Login.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const ForgotPasswordPage: React.FC = () => (
  <>
    <Helmet>
      <title>Forgot Password | Syncy</title>
    </Helmet>
    <div data-testid="LoginPage">
      <ForgotPassword />
    </div>
  </>
);

export default ForgotPasswordPage;
