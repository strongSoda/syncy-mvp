import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { auth } from 'global/constants/firebase';
import ROUTES from 'global/constants/routes';
import { useAppDispatch } from 'hooks/storeHooks';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import * as Yup from "yup";
import ForgotPasswordWrapper from './ForgotPassword.styles';

import LoginWrapper from './ForgotPassword.styles';

// declare interface ILoginProps {}

const ForgotPassword: React.FC = () => {
  const [Error, setCustomError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // const dispatch = useAppDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),

    onSubmit: async (values: any) => {
      // if (values.password !== confirmPassword) {
      //   setCustomError("Passwords don't match.");
      //   return;
      // }
      setCustomError('');
      setLoading(true);

      try {
        await sendPasswordReset(values)
      } catch(error: any) {
          console.error(error);
          setLoading(false);
      }
    },
  });

  const sendPasswordReset = async (values: { email: string; password: string; }) => {
    // e.preventDefault();
  
    try {
      await sendPasswordResetEmail(auth, values?.email);
      alert('Password reset email sent!');
      history.push(ROUTES.BRAND.LOGIN);
      // setShowPasswordReset(false);
    } catch (error: any) {
      console.error(error);
      const errorCode = error?.code;
      const errorMessage = error?.message;
      // alert(errorMessage);

      setCustomError(errorMessage.replace('Firebase: ', ''));
      setLoading(false);
    }
  }

  return (
  <ForgotPasswordWrapper data-testid="Login">
    <header>
        <h3 className="brand">SYNCY</h3>
        <a href={ROUTES.BRAND.REGISTER}>
          <button className="login_btn">register</button>
        </a>
    </header>
    <div className="form_wrapper" id="form_wrapper">
        <form id="form" onSubmit={formik.handleSubmit}>
          <h2>Reset your account password</h2>
          {Error && <p className="error">{Error}</p>}
          {formik.touched.email && formik.errors.email ? <p className="error">{formik.errors.email}</p> : null}

          <input
            // type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email Address"
          />

          <br />

          <input type="submit" value={loading ? 'loading...' : 'Reset'} />
          <p>
            Don't have an account? <a href={ROUTES.BRAND.REGISTER}>Register!</a>
          </p>
        </form>
      </div>
      <div className="banner">
        <h1 className='title'>Find Influencers</h1>
      </div>
  </ForgotPasswordWrapper>
)};

export default ForgotPassword;
