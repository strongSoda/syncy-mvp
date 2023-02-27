import Signup from 'components/Brand/Signup/Signup.lazy';
import React from 'react';

import { Helmet } from 'react-helmet';

const SignupPage: React.FC = () => (
  <>
    <Helmet>
      <title>Register | Syncy</title>
    </Helmet>
    <div data-testid="SignupPage">
      <Signup />
    </div>
  </>
);

export default SignupPage;
