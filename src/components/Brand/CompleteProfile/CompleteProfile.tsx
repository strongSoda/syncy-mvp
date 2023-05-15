import SideBar from 'components/SideBar/SideBar.lazy';
import { Alert, Button, FileCard, FileUploader, FormField, Pane, Spinner, TextInputField, toaster } from 'evergreen-ui';
import { useFormik } from 'formik';
import API from 'global/constants/api';
import CSSVARIABLES from 'global/constants/variables';
import { AuthContext } from 'global/context/AuthContext';
import logUsage from 'global/functions/usage-logs';
import Hamburger from 'hamburger-react';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as Yup from "yup";

import BrandCompleteProfileWrapper from './CompleteProfile.styles'
import ROUTES from 'global/constants/routes';

// declare interface IBrandCompleteProfileProps {}

const BrandCompleteProfile: React.FC = () => {
  // const [fris, setValue] = useState('')
  const [Error, setCustomError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(false);

  const [isOpen, setOpen] = useState(true)

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

  const [files, setFiles] = React.useState<any>([])
  const [fileRejections, setFileRejections] = React.useState<any>([])
  const handleChange = React.useCallback((files) => setFiles([files[0]]), [])
  const handleRejected = React.useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
  const handleRemove = React.useCallback(() => {
    setFiles([])
    setFileRejections([])
  }, [])

  const deliverable_id = window.location?.hash?.split('#')[1];
  // console.log('deliverable', deliverable_id?.split('-')[1]);

  // get the influencers%5Bquery%5D from the query string
  const query = window.location?.search?.split('influencers%5Bquery%5D=')[1];
  // console.log('query', query);

  useEffect(() => {
    logUsage('BRAND VISITED COMPLETE PROFILE PAGE', {user: {email: user?.email}});
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    // Form to enter First Name, Last Name, job title, company name, company website, company logo, company description, company address, company phone number, company email, company social media links
    initialValues: {
      firstName: firstName || '',
      lastName: lastName || '',
      jobTitle: jobTitle || '',
      companyName: companyName || '',
      companyWebsite: companyWebsite || '',
      companyLogo: companyLogo || '',
      companyDescription: companyDescription || '',
      companyAddress: companyAddress || '',
      companyEmail: companyEmail || '',
      companyInstagram: companyInstagram || '',
      companyLinkedin: companyLinkedin || '',
      email: user?.email || '',
      bookCallInfo: bookCallInfo ? bookCallInfo : 'None',
      // companySocialMediaLinks: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      jobTitle: Yup.string().required('Required'),
      companyName: Yup.string().required('Required'),
      companyWebsite: Yup.string().required('Required'),
      companyLogo: Yup.string(),
      companyDescription: Yup.string().required('Required'),
      companyAddress: Yup.string().required('Required'),
      companyEmail: Yup.string().email('Invalid email address').required('Required'),
      companyInstagram: Yup.string().required('Required'),
      companyLinkedin: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address'),
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

  // upload profile image to imgur
  const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
        },
        body: formData,
      });
      const data = await res.json();

      if(data?.success) {
        console.log('companyLogo: ', data);
        const imageUrl = data?.data?.link;
        setCompanyLogo(imageUrl);
        formik.setFieldValue('companyLogo', data?.data?.link);
        return data?.data?.link
      } else {
        toaster.danger("Can't upload image. Please try again later.");
      }
    }
    catch (error: any) {
      console.error(error);
      const errorCode = error?.code;
      const errorMessage = error?.message;
      console.log(error);
      toaster.danger("Can't upload image. Please try again later.");
    }
  }


  const saveProfile = async (values: any) => {
    // e.preventDefault();
    try {

      // upload image to imgur
      if(files?.length > 0) {
        const link = await uploadImage(files[0]);
        console.log('imageUrl: ', values.companyLogo, link);
        values.companyLogo = link;
      }

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
        history.push(ROUTES.BRAND.DISCOVER + (query ? `?influencers%5Bquery%5D=${query}` : '') + (deliverable_id ? `#deliverable-${deliverable_id?.split('-')[1]}` : ''));
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

      if(profile) {
        formik.setFieldValue('firstName', profile?.first_name)
        formik.setFieldValue('lastName', profile?.last_name)
        formik.setFieldValue('companyName', profile?.company_name)
        formik.setFieldValue('companyWebsite', profile?.company_website)
        formik.setFieldValue('companyLogo', profile?.company_logo)
        formik.setFieldValue('companyDescription', profile?.company_description)
        formik.setFieldValue('companyAddress', profile?.company_address)
        formik.setFieldValue('companyEmail', profile?.company_email)
        formik.setFieldValue('companyInstagram', profile?.company_instagram)
        formik.setFieldValue('companyLinkedin', profile?.company_linkedin)
        formik.setFieldValue('bookCallInfo', profile?.book_call_info)
        formik.setFieldValue('jobTitle', profile?.job_title)

        console.log(formik.values);
        
      }

      // setLoading(false);
      setFetchingProfile(false);
    } catch (error: any) {
      console.error(error);
      const errorCode = error?.code;
      const errorMessage = error?.message;
      setFetchingProfile(false);
      console.log(formik.values);
    }      
  }

  useEffect(() => {
    if(user) {
      getProfile();
    }
  }, [user]);

  return (
  <BrandCompleteProfileWrapper data-testid="BrandCompleteProfile">

    <div className='toggleBtn'>
      <Hamburger toggled={isOpen} toggle={(setOpen)} />
    </div>

    {!fetchingProfile ?
    <>
      {/* {firstName ?        */}
      <>
        {firstName && isOpen && <SideBar lightColor={CSSVARIABLES.COLORS.PURPLE_1} darkColor={CSSVARIABLES.COLORS.PURPLE_2} />}

        <div className='container'>
          <form id="form" onSubmit={formik.handleSubmit}>
          <h2 className='title'>Complete your profile</h2>
            {/* {Error && <p className="error">{Error}</p>} */}

          <FormField>
            <TextInputField
              name='firstName'
              label="First Name"
              required
              // description="This is a description."
              value={formik.values.firstName}
              onChange={(e: any) => formik.setFieldValue('firstName', e.target.value)}
              validationMessage={formik?.touched?.firstName && formik?.errors?.firstName ? ( <div>{formik?.errors?.firstName}</div> ) : null}
            />
          </FormField>

          
          <FormField>
            <TextInputField
              name='lastName'
              label="Last Name"
              required
              // description="This is a description."
              value={formik.values.lastName}
              onChange={(e: any) => formik.setFieldValue('lastName', e.target.value)}
              validationMessage={formik?.touched?.lastName && formik?.errors?.lastName ? ( <div>{formik?.errors?.lastName}</div> ) : null}
            />
          </FormField>

          <FormField>
            <TextInputField
              name='jobTitle'
              label="Job Title"
              required
              // description="This is a description."
              value={formik.values.jobTitle}
              onChange={(e: any) => formik.setFieldValue('jobTitle', e.target.value)}
              validationMessage={formik?.touched?.jobTitle && formik?.errors?.jobTitle ? ( <div>{formik?.errors?.jobTitle}</div> ) : null}
            />
          </FormField>

          <FormField>
            <TextInputField
              name='companyName'
              label="Company Name"
              required
              // description="This is a description."
              value={formik.values.companyName}
              onChange={(e: any) => formik.setFieldValue('companyName', e.target.value)}
              validationMessage={formik?.touched?.companyName && formik?.errors?.companyName ? ( <div>{formik?.errors?.companyName}</div> ) : null}
            />
          </FormField>

          
          <FormField>
            <TextInputField
              name='companyWebsite'
              label="Company Website"
              required
              // description="This is a description."
              value={formik.values.companyWebsite}
              onChange={(e: any) => formik.setFieldValue('companyWebsite', e.target.value)}
              validationMessage={formik?.touched?.companyWebsite && formik?.errors?.companyWebsite ? ( <div>{formik?.errors?.companyWebsite}</div> ) : null}
            />
          </FormField>

          <FormField>
            <TextInputField
              name='bookCallInfo'
              label="Link to book a 30-minute call with you (Calendly etc.)"
              // required
              // description="This is a description."
              value={formik.values.bookCallInfo}
              onChange={(e: any) => formik.setFieldValue('bookCallInfo', e.target.value)}
              validationMessage={formik?.touched?.bookCallInfo && formik?.errors?.bookCallInfo ? ( <div>{formik?.errors?.bookCallInfo}</div> ) : null}
            />
          </FormField>
          
        
          <FormField>
            <TextInputField
              name='companyDescription'
              label="Company Description"
              required
              // description="This is a description."
              value={formik.values.companyDescription}
              onChange={(e: any) => formik.setFieldValue('companyDescription', e.target.value)}
              validationMessage={formik?.touched?.companyDescription && formik?.errors?.companyDescription ? ( <div>{formik?.errors?.companyDescription}</div> ) : null}
            />
          </FormField>

          <FormField>
            <TextInputField
              name='companyAddress'
              label="Company Address"
              required
              // description="This is a description."
              value={formik.values.companyAddress}
              onChange={(e: any) => formik.setFieldValue('companyAddress', e.target.value)}
              validationMessage={formik?.touched?.companyAddress && formik?.errors?.companyAddress ? ( <div>{formik?.errors?.companyAddress}</div> ) : null}
            />
          </FormField>

          <FormField>
            <TextInputField
              name='companyEmail'
              label="Company Email"
              required
              // description="This is a description."
              value={formik.values.companyEmail}
              onChange={(e: any) => formik.setFieldValue('companyEmail', e.target.value)}
              validationMessage={formik?.touched?.companyEmail && formik?.errors?.companyEmail ? ( <div>{formik?.errors?.companyEmail}</div> ) : null}
            />
          </FormField>

        
          <FormField>
            <TextInputField
              name='companyInstagram'
              label="Company Instagram"
              required
              // description="This is a description."
              value={formik.values.companyInstagram}
              onChange={(e: any) => formik.setFieldValue('companyInstagram', e.target.value)}
              validationMessage={formik?.touched?.companyInstagram && formik?.errors?.companyInstagram ? ( <div>{formik?.errors?.companyInstagram}</div> ) : null}
            />
          </FormField>

          <FormField>
            <TextInputField
              name='companyLinkedin'
              label="Company LinkedIn"
              required
              // description="This is a description."
              value={formik.values.companyLinkedin}
              onChange={(e: any) => formik.setFieldValue('companyLinkedin', e.target.value)}
              validationMessage={formik?.touched?.
companyLinkedin && formik?.errors?.companyLinkedin ? ( <div>{formik?.errors?.companyLinkedin}</div> ) : null}
            />
          </FormField>
          
          <FileUploader
            label="Upload Company Logo"
            description="You can upload 1 file. File can be up to 50 MB."
            maxSizeInBytes={50 * 1024 ** 2}
            maxFiles={1}
            onChange={handleChange}
            onRejected={handleRejected}
            renderFile={(file: any) => {
              const { name, size, type } = file
              const fileRejection = fileRejections.find((fileRejection: any) => fileRejection.file === file)
              const { message } = fileRejection || {}
              return (
                <FileCard
                  key={name}
                  isInvalid={fileRejection != null}
                  name={name}
                  onRemove={handleRemove}
                  sizeInBytes={size}
                  type={type}
                  validationMessage={message}
                />
              )
            }}
            values={files}
          />

          {/* Submit Button */}
          <input type="submit" value={loading ? 'loading...' : 'Submit'} />
          </form>
        </div>
      </>
      {/* : */}
    </>
    :
    <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
      <Spinner />
    </Pane>
  }
  </BrandCompleteProfileWrapper>
)};

export default BrandCompleteProfile;
