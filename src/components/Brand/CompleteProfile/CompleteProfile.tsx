import SideBar from 'components/SideBar/SideBar.lazy';
import { Alert, Button, FormField, Pane, Spinner, TextInputField, toaster } from 'evergreen-ui';
import { useFormik } from 'formik';
import API from 'global/constants/api';
import CSSVARIABLES from 'global/constants/variables';
import { AuthContext } from 'global/context/AuthContext';
import logUsage from 'global/functions/usage-logs';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as Yup from "yup";

import BrandCompleteProfileWrapper from './CompleteProfile.styles'

// declare interface IBrandCompleteProfileProps {}

const BrandCompleteProfile: React.FC = () => {
  // const [fris, setValue] = useState('')
  const [Error, setCustomError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(false);


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyInstagram, setCompanyInstagram] = useState('');
  const [companyLinkedin, setCompanyLinkedin] = useState('');
  const [bookCallInfo, setBookCallInfo] = useState('');

  const user = useContext(AuthContext);
  
  // const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    logUsage('BRAND VISITED COMPLETE PROFILE PAGE', {user: {email: user?.email}});
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    // Form to enter First Name, Last Name, job title, company name, company website, company logo, company description, company address, company phone number, company email, company social media links
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      jobTitle: jobTitle,
      companyName: companyName,
      companyWebsite: companyWebsite,
      companyLogo: companyLogo,
      companyDescription: companyDescription,
      companyAddress: companyAddress,
      companyEmail: companyEmail,
      companyInstagram: companyInstagram,
      companyLinkedin: companyLinkedin,
      email: user?.email,
      bookCallInfo: bookCallInfo,
      // companySocialMediaLinks: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      jobTitle: Yup.string().required('Required'),
      companyName: Yup.string().required('Required'),
      companyWebsite: Yup.string().required('Required'),
      companyLogo: Yup.string().required('Required'),
      companyDescription: Yup.string().required('Required'),
      companyAddress: Yup.string().required('Required'),
      companyEmail: Yup.string().email('Invalid email address').required('Required'),
      companyInstagram: Yup.string().required('Required'),
      companyLinkedin: Yup.string().required('Required'),
      bookCallInfo: Yup.string(),
    }),

    onSubmit: async (values: any) => {
      console.log('values: ', values);
      
      setCustomError('');
      setLoading(true);

      // save to database
      await saveProfile(values);

      setLoading(false);
    },
  });

  const saveProfile = async (values: any) => {
    // e.preventDefault();
    try {
      const res = await fetch(`${API}/brand_user_profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);
      
      if(data.status === 'success') {
        toaster.success(data.message);
        history.push('/brand/discover');
      } else {
        toaster.danger(data.message);
      }
      
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      const errorCode = error?.code;
      const errorMessage = error?.message;

      toaster.danger(errorMessage);
    }
  }
  
  const getProfile = async () => {
    setFetchingProfile(true);
    try {
      const res = await fetch(`${API}/brand_user_profile?email=${user?.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      const profile = data?.data

      setFirstName(profile?.first_name);
      setLastName(profile?.last_name);
      setJobTitle(profile?.job_title);
      setCompanyName(profile?.company_name);
      setCompanyWebsite(profile?.company_website);
      setCompanyLogo(profile?.company_logo);
      setCompanyDescription(profile?.company_description);
      setCompanyAddress(profile?.company_address);
      setCompanyEmail(profile?.company_email);
      setCompanyInstagram(profile?.company_instagram);
      setCompanyLinkedin(profile?.company_linkedin);
      setBookCallInfo(profile?.book_call_info);

      // setLoading(false);
      setFetchingProfile(false);
    } catch (error: any) {
      console.error(error);
      const errorCode = error?.code;
      const errorMessage = error?.message;
      setFetchingProfile(false);
    }      
  }

  useEffect(() => {
    if(user) {
      getProfile();
    }
  }, [user]);

  return (
  <BrandCompleteProfileWrapper data-testid="BrandCompleteProfile">

    {!fetchingProfile ?
    <>
      {firstName ?       
      <>
        <SideBar lightColor={CSSVARIABLES.COLORS.PURPLE_1} darkColor={CSSVARIABLES.COLORS.PURPLE_2} />

        <div className='container'>
          <form id="form" onSubmit={formik.handleSubmit}>
          <h2 className='title'>Complete your profile</h2>
            {Error && <p className="error">{Error}</p>}
            {formik.touched.firstName && formik.errors.firstName ? ( <div>{formik.errors.firstName}</div> ) : null}
          <FormField>
            <TextInputField
              name='firstName'
              label="First Name"
              required
              // description="This is a description."
              value={formik.values.firstName}
              onChange={(e: any) => formik.setFieldValue('firstName', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.lastName && formik.errors.lastName ? ( <div>{formik.errors.lastName}</div> ) : null}
          <FormField>
            <TextInputField
              name='lastName'
              label="Last Name"
              required
              // description="This is a description."
              value={formik.values.lastName}
              onChange={(e: any) => formik.setFieldValue('lastName', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.jobTitle && formik.errors.jobTitle ? ( <div>{formik.errors.jobTitle}</div> ) : null}
          <FormField>
            <TextInputField
              name='jobTitle'
              label="Job Title"
              required
              // description="This is a description."
              value={formik.values.jobTitle}
              onChange={(e: any) => formik.setFieldValue('jobTitle', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyName && formik.errors.companyName ? ( <div>{formik.errors.companyName}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyName'
              label="Company Name"
              required
              // description="This is a description."
              value={formik.values.companyName}
              onChange={(e: any) => formik.setFieldValue('companyName', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyWebsite && formik.errors.companyWebsite ? ( <div>{formik.errors.companyWebsite}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyWebsite'
              label="Company Website"
              required
              // description="This is a description."
              value={formik.values.companyWebsite}
              onChange={(e: any) => formik.setFieldValue('companyWebsite', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.bookCallInfo && formik.errors.bookCallInfo ? ( <div>{formik.errors.bookCallInfo}</div> ) : null}
          <FormField>
            <TextInputField
              name='bookCallInfo'
              label="Link to book a 30-minute call with you (Calendly etc.)"
              // required
              // description="This is a description."
              value={formik.values.bookCallInfo}
              onChange={(e: any) => formik.setFieldValue('bookCallInfo', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyLogo && formik.errors.companyLogo ? ( <div>{formik.errors.companyLogo}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyLogo'
              label="Company Logo"
              required
              // description="This is a description."
              value={formik.values.companyLogo}
              onChange={(e: any) => formik.setFieldValue('companyLogo', e.target.value)}
            />
          </FormField>
          
          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyDescription && formik.errors.companyDescription ? ( <div>{formik.errors.companyDescription}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyDescription'
              label="Company Description"
              required
              // description="This is a description."
              value={formik.values.companyDescription}
              onChange={(e: any) => formik.setFieldValue('companyDescription', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyAddress && formik.errors.companyAddress ? ( <div>{formik.errors.companyAddress}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyAddress'
              label="Company Address"
              required
              // description="This is a description."
              value={formik.values.companyAddress}
              onChange={(e: any) => formik.setFieldValue('companyAddress', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyEmail && formik.errors.companyEmail ? ( <div>{formik.errors.companyEmail}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyEmail'
              label="Company Email"
              required
              // description="This is a description."
              value={formik.values.companyEmail}
              onChange={(e: any) => formik.setFieldValue('companyEmail', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyInstagram && formik.errors.companyInstagram ? ( <div>{formik.errors.companyInstagram}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyInstagram'
              label="Company Instagram"
              required
              // description="This is a description."
              value={formik.values.companyInstagram}
              onChange={(e: any) => formik.setFieldValue('companyInstagram', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyLinkedin && formik.errors.companyLinkedin ? ( <div>{formik.errors.companyLinkedin}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyLinkedin'
              label="Company LinkedIn"
              required
              // description="This is a description."
              value={formik.values.companyLinkedin}
              onChange={(e: any) => formik.setFieldValue('companyLinkedin', e.target.value)}
            />
          </FormField>
          

          {/* Submit Button */}
          <input type="submit" value={loading ? 'loading...' : 'Submit'} />
          </form>
        </div>
      </>
      :
      <>
        <div className='container'>
          <form id="form" onSubmit={formik.handleSubmit}>
          <h2 className='title'>Complete your profile</h2>
            {Error && <p className="error">{Error}</p>}
            {formik.touched.firstName && formik.errors.firstName ? ( <div>{formik.errors.firstName}</div> ) : null}
          <FormField>
            <TextInputField
              name='firstName'
              label="First Name"
              required
              // description="This is a description."
              value={formik.values.firstName}
              onChange={(e: any) => formik.setFieldValue('firstName', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.lastName && formik.errors.lastName ? ( <div>{formik.errors.lastName}</div> ) : null}
          <FormField>
            <TextInputField
              name='lastName'
              label="Last Name"
              required
              // description="This is a description."
              value={formik.values.lastName}
              onChange={(e: any) => formik.setFieldValue('lastName', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.jobTitle && formik.errors.jobTitle ? ( <div>{formik.errors.jobTitle}</div> ) : null}
          <FormField>
            <TextInputField
              name='jobTitle'
              label="Job Title"
              required
              // description="This is a description."
              value={formik.values.jobTitle}
              onChange={(e: any) => formik.setFieldValue('jobTitle', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyName && formik.errors.companyName ? ( <div>{formik.errors.companyName}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyName'
              label="Company Name"
              required
              // description="This is a description."
              value={formik.values.companyName}
              onChange={(e: any) => formik.setFieldValue('companyName', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyWebsite && formik.errors.companyWebsite ? ( <div>{formik.errors.companyWebsite}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyWebsite'
              label="Company Website"
              required
              // description="This is a description."
              value={formik.values.companyWebsite}
              onChange={(e: any) => formik.setFieldValue('companyWebsite', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.bookCallInfo && formik.errors.bookCallInfo ? ( <div>{formik.errors.bookCallInfo}</div> ) : null}
          <FormField>
            <TextInputField
              name='bookCallInfo'
              label="Link to book a 30-minute call with you (Calendly etc.)"
              // required
              // description="This is a description."
              value={formik.values.bookCallInfo}
              onChange={(e: any) => formik.setFieldValue('bookCallInfo', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyLogo && formik.errors.companyLogo ? ( <div>{formik.errors.companyLogo}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyLogo'
              label="Company Logo"
              required
              // description="This is a description."
              value={formik.values.companyLogo}
              onChange={(e: any) => formik.setFieldValue('companyLogo', e.target.value)}
            />
          </FormField>
          
          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyDescription && formik.errors.companyDescription ? ( <div>{formik.errors.companyDescription}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyDescription'
              label="Company Description"
              required
              // description="This is a description."
              value={formik.values.companyDescription}
              onChange={(e: any) => formik.setFieldValue('companyDescription', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyAddress && formik.errors.companyAddress ? ( <div>{formik.errors.companyAddress}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyAddress'
              label="Company Address"
              required
              // description="This is a description."
              value={formik.values.companyAddress}
              onChange={(e: any) => formik.setFieldValue('companyAddress', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyEmail && formik.errors.companyEmail ? ( <div>{formik.errors.companyEmail}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyEmail'
              label="Company Email"
              required
              // description="This is a description."
              value={formik.values.companyEmail}
              onChange={(e: any) => formik.setFieldValue('companyEmail', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyInstagram && formik.errors.companyInstagram ? ( <div>{formik.errors.companyInstagram}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyInstagram'
              label="Company Instagram"
              required
              // description="This is a description."
              value={formik.values.companyInstagram}
              onChange={(e: any) => formik.setFieldValue('companyInstagram', e.target.value)}
            />
          </FormField>

          {Error && <p className="error">{Error}</p>}
          {formik.touched.companyLinkedin && formik.errors.companyLinkedin ? ( <div>{formik.errors.companyLinkedin}</div> ) : null}
          <FormField>
            <TextInputField
              name='companyLinkedin'
              label="Company LinkedIn"
              required
              // description="This is a description."
              value={formik.values.companyLinkedin}
              onChange={(e: any) => formik.setFieldValue('companyLinkedin', e.target.value)}
            />
          </FormField>
          

          {/* Submit Button */}
          <input type="submit" value={loading ? 'loading...' : 'Submit'} />
          </form>
        </div>
      </>
      }
    </>
    :
    <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
      <Spinner />
    </Pane>
  }
  </BrandCompleteProfileWrapper>
)};

export default BrandCompleteProfile;
