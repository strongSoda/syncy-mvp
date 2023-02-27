import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { auth } from 'global/constants/firebase';
import ROUTES from 'global/constants/routes';
import { useAppDispatch } from 'hooks/storeHooks';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import * as Yup from "yup";

import LoginWrapper from './Login.styles';

// declare interface ILoginProps {}

const Login: React.FC = () => {
  const [Error, setCustomError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    }),

    onSubmit: async (values: any) => {
      // if (values.password !== confirmPassword) {
      //   setCustomError("Passwords don't match.");
      //   return;
      // }

      setCustomError('');
      setLoading(true);

      await signIn(values);

      setLoading(false);
    },
  });

  const signIn = async (values: { email: string; password: string; }) => {
  // e.preventDefault();
  try {
    await signInWithEmailAndPassword(
      auth,
      values?.email,
      values?.password,
    );

    history.push(ROUTES.BRAND.DISCOVER);
    setLoading(false);

  } catch (error: any) {
    console.error(error);
    const errorCode = error?.code;
    const errorMessage = error?.message;
    // alert(errorMessage);
    setCustomError(errorMessage.replace('Firebase: ', ''));
    setLoading(false);
  }
  };

  return (
  <LoginWrapper data-testid="Login">
    <header>
        <h3 className="brand">SYNCY</h3>
        <a href={ROUTES.BRAND.REGISTER}>
          <button className="login_btn">register</button>
        </a>
    </header>
    <div className="form_wrapper" id="form_wrapper">
        <form id="form" onSubmit={formik.handleSubmit}>
          <h2>Log in to your account</h2>
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


          {formik.touched.password && formik.errors.password ? <p className="error">{formik.errors.password}</p> : null}

          <input type="password" name="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder="Password" />

          <br />
          <input type="submit" value={loading ? 'loading...' : 'Log In'} />
          <p>
            Don't have an account? <a href={ROUTES.BRAND.REGISTER}>Register!</a>
          </p>
          <p>
            Forgot Password? <a href={ROUTES.GENERAL.FORGOT_PASSWORD}>Reset!</a>
          </p>
        </form>
      </div>
      <div className="banner">
        <h1 className='title'>Find Influencers</h1>
      </div>
  </LoginWrapper>
)};

export default Login;
