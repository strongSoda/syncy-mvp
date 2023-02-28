// import { registerUser } from 'features/user/userSlice';
import { login } from 'features/user/userSlice';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useFormik } from 'formik';
import { auth } from 'global/constants/firebase';
import ROUTES from 'global/constants/routes';
import { useAppDispatch } from 'hooks/storeHooks';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import * as Yup from "yup";
import SignupWrapper from './Signup.styles';

// declare interface ISignupProps {}

const Signup: React.FC = () => {
  const [Error, setCustomError] = useState('');
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // const [confirmPassword, setConfirmPassword] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      email: '',
      // fname: '',
      // lname: '',
      password: '',
      // username: '',
    },
    validationSchema: Yup.object({
      // username: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
      // fname: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
      // lname: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    }),

    onSubmit: async (values: any) => {
      setCustomError('');
      setLoading(true);
      try {
        
        await createAccount(values);
        setLoading(false);

      } catch (e) {
        setLoading(false);
      }
    },
  });

    const createAccount = async (values: { email: string; password: string; }) => {
    // e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values?.email,
        values?.password,
      )

      const user = userCredential.user;
      await sendEmailVerification(user)

      dispatch(login());
      history.push(ROUTES.BRAND.DISCOVER);

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
  <SignupWrapper data-testid="Signup">
    <header>
        <h3 className="brand">SYNCY</h3>
        <a href={ROUTES.BRAND.LOGIN}>
          <button className="login_btn">log in</button>
        </a>
    </header>
    <div className="form_wrapper">
        <form id="form" onSubmit={formik.handleSubmit}>
          <h2>Create an account</h2>
          <div>{Error}</div>
          {/* {formik.touched.username && formik.errors.username ? <div className="error">{formik.errors.username}</div> : null}

          <input type="text" name="username" id="username" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} placeholder="Username" />

          <br />

          {formik.touched.fname && formik.errors.fname ? <div className="error">{formik.errors.fname}</div> : null}

          <input type="text" name="fname" id="fname" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fname} placeholder="First Name" />
          <br />

          {formik.touched.lname && formik.errors.lname ? <div className="error">{formik.errors.lname}</div> : null}

          <input type="text" name="lname" id="lname" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lname} placeholder="Last Name" />

          <br /> */}
          {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}

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


          {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}

          <input type="password" name="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder="Password" />

          <br />
          {/* <input type="text" name="cpassword" id="cpassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <br /> */}
          <input type="submit" value={loading ? 'loading...' : 'Register'} />
          <p>
            Already have an account? <a href={ROUTES.BRAND.LOGIN}>Log In!</a>
          </p>
        </form>
      </div>
      <div className="banner">
        <h1 className='title'>Find Influencers</h1>
      </div>
  </SignupWrapper>
)};

export default Signup;
