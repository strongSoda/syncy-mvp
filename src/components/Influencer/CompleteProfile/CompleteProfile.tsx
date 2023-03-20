import SideBar from 'components/Influencer/SideBar/SideBar.lazy';
import { Alert, Button, FormField, Pane, Paragraph, Spinner, Tab, Tablist, TextInputField, toaster, FileUploader, FileCard } from 'evergreen-ui';
import { useFormik } from 'formik';
import API from 'global/constants/api';
import ROUTES from 'global/constants/routes';
import CSSVARIABLES from 'global/constants/variables';
import { AuthContext } from 'global/context/AuthContext';
import logUsage from 'global/functions/usage-logs';
import Hamburger from 'hamburger-react';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as Yup from "yup";

import InfluencerCompleteProfileWrapper from './CompleteProfile.styles'

// declare interface IBrandCompleteProfileProps {}

const InfluencerCompleteProfile: React.FC = () => {
  // const dispatch = useAppDispatch();

  const user = useContext(AuthContext);

  useEffect(() => {
    logUsage('INFLUENCER VISITED COMPLETE PROFILE PAGE', {user: {email: user?.email}});
  }, [])

  return (
  <InfluencerCompleteProfileWrapper data-testid="BrandCompleteProfile">
    <div className='container'>
      <ProfileTabs />
    </div>
  </InfluencerCompleteProfileWrapper>
)};

function ProfileTabs() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [tabs] = React.useState(['Personal', 'Instagram'])
  
  const [fetchingProfile, setFetchingProfile] = useState<boolean>(false);
  
  const user = useContext(AuthContext);

  const [profile, setProfile] = useState<any>(null);

  const [isOpen, setOpen] = useState(true)

  const getProfile = async () => {
    setFetchingProfile(true);
    try {
      const res = await fetch(`${API}/influencer-profile?email=${user?.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      const profile = data?.data
      setProfile(profile);
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
  <>
    <div className='toggleBtn'>
      <Hamburger toggled={isOpen} toggle={(setOpen)} />
    </div>

    {fetchingProfile ? 
      <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
        <Spinner />
      </Pane>
      :
      <>
      {profile && isOpen && <SideBar lightColor={CSSVARIABLES.COLORS.PRIMARY_GREEEN_1} darkColor={CSSVARIABLES.COLORS.GREEN_0} />}
      <Pane height={120}>
      <h2 className='title'>Complete your profile</h2>

      <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
        {tabs.map((tab, index) => (
          <Tab
            aria-controls={`panel-${tab}`}
            isSelected={index === selectedIndex}
            key={tab}
            onSelect={() => setSelectedIndex(index)}
          >
            {tab}
          </Tab>
        ))}
      </Tablist>
      <Pane padding={16} background="tint1" flex="1">
        <Pane
            aria-labelledby="Personal"
            aria-hidden={0 !== selectedIndex}
            display={0 === selectedIndex ? 'block' : 'none'}
            key="Personal"
            role="tabpanel"
          >
          <PersonalDetails setSelectedIndex={setSelectedIndex} profile={profile} />
        </Pane>

        <Pane
            aria-labelledby="Instagram"
            aria-hidden={1 !== selectedIndex}
            display={1 === selectedIndex ? 'block' : 'none'}
            key="Instagram"
            role="Instagram"
          >
          <InstagramDetails setSelectedIndex={setSelectedIndex} profile={profile} />
        </Pane>


        {/* <Pane
            aria-labelledby="Audience"
            aria-hidden={2 !== selectedIndex}
            display={2 === selectedIndex ? 'block' : 'none'}
            key="Audience"
            role="Audience"
          >
            <Paragraph>Panel Personal</Paragraph>
        </Pane> */}

      </Pane>
    </Pane>
    </>
    }
  </>
  )
}

interface IProfileDetailsProps {
  setSelectedIndex: any,
  profile: any,
}

const PersonalDetails: React.FC<IProfileDetailsProps> = ({setSelectedIndex, profile}: IProfileDetailsProps) => {
  const user = useContext(AuthContext);

  const [Error, setCustomError] = useState('');
  const [loading, setLoading] = useState(false);
  // const [fetchingProfile, setFetchingProfile] = useState(false);

  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [bio, setBio] = useState(profile?.bio) || '';
  const [imageUrl, setImageUrl] = useState(profile?.image_url || '');
  const [city, setCity] = useState(profile?.city || '');
  const [bookCallInfo, setBookCallInfo] = useState(profile?.calender_url || '');

  const [files, setFiles] = React.useState<any>([])
  const [fileRejections, setFileRejections] = React.useState<any>([])
  const handleChange = React.useCallback((files) => setFiles([files[0]]), [])
  const handleRejected = React.useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
  const handleRemove = React.useCallback(() => {
    setFiles([])
    setFileRejections([])
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    // Form to enter First Name, Last Name, job title, company name, company website, company logo, company description, company address, company phone number, company email, company social media links
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      bio: bio,
      city: city,
      imageUrl: imageUrl,
      email: user?.email,
      bookCallInfo: bookCallInfo,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      bio: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      imageUrl: Yup.string(),
      email: Yup.string().email('Invalid email address'),
      bookCallInfo: Yup.string().required('Required'),
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
        console.log('imageUrl: ', data);
        const imageUrl = data?.data?.link;
        setImageUrl(imageUrl);
        formik.setFieldValue('imageUrl', data?.data?.link);
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
    console.log('here');
    
    try {
      console.log('now here');

      // upload image to imgur
      if(files?.length > 0) {
        const link = await uploadImage(files[0]);
        console.log('imageUrl: ', values.imageUrl, link);
        values.imageUrl = link;
      }

      const res = await fetch(`${API}/influencer-profile-personal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);
      
      if(data?.status === 'success') {
        toaster.success(data?.message);
        // change to next tab
        setSelectedIndex(1);
      } else {
        toaster.danger(data?.message);
      }
      
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      const errorCode = error?.code;
      const errorMessage = error?.message;
      console.log(error);
      
      toaster.danger(errorMessage);
    }
  }

  return (
    <form id="PersonalDetails" onSubmit={formik.handleSubmit}>
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
      {formik.touched.bio && formik.errors.bio ? ( <div>{formik.errors.bio}</div> ) : null}
      <FormField>
        <TextInputField
          name='bio'
          label="Bio"
          required
          // description="This is a description."
          value={formik.values.bio}
          onChange={(e: any) => formik.setFieldValue('bio', e.target.value)}
        />
      </FormField>

      {Error && <p className="error">{Error}</p>}
      {formik.touched.city && formik.errors.city ? ( <div>{formik.errors.city}</div> ) : null}
      <FormField>
        <TextInputField
          name='city'
          label="City"
          required
          // description="This is a description."
          value={formik.values.city}
          onChange={(e: any) => formik.setFieldValue('city', e.target.value)}
        />
      </FormField>

      {Error && <p className="error">{Error}</p>}
      {formik.touched.bookCallInfo && formik.errors.bookCallInfo ? ( <div>{formik.errors.bookCallInfo}</div> ) : null}
      <FormField>
        <TextInputField
          name='bookCallInfo'
          label="Link to book a 30-minute call with you (Calendly etc.)"
          required
          // description="This is a description."
          value={formik.values.bookCallInfo}
          onChange={(e: any) => formik.setFieldValue('bookCallInfo', e.target.value)}
        />
      </FormField>

      <FileUploader
        label="Upload Profile Image"
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
      <input type="submit" value={loading ? 'loading...' : 'Save 👉'} />
    </form>
  )
};

const InstagramDetails: React.FC<IProfileDetailsProps> = ({ setSelectedIndex, profile }: IProfileDetailsProps) => {
  const [Error, setCustomError] = useState('');
  const [loading, setLoading] = useState(false);
  // const [fetchingProfile, setFetchingProfile] = useState(false);

  const [username, setUsername] = useState(profile?.instagram_username || '');
  const [followersCount, setFollowersCount] = useState(profile?.followers_count || '');
  const [rate, setRate] = useState(profile?.rate || '');
  const [category, setCategory] = useState(profile?.category || '');
  const [hashtags, setHashtags] = useState(profile?.hashtags || '');
  const [topPostUrl1, setTopPostUrl1] = useState(profile?.top_post_url_1 || '');
  const [topPostUrl2, setTopPostUrl2] = useState(profile?.top_post_url_2 || '');
  const [topPostUrl3, setTopPostUrl3] = useState(profile?.top_post_url_3 || '');
  const [sponsoredPostUrl1, setSponsoredPostUrl1] = useState(profile?.sponsored_post_url_1 || '');
  const [sponsoredPostUrl2, setSponsoredPostUrl2] = useState(profile?.sponsored_post_url_2 || '');
  const [sponsoredPostUrl3, setSponsoredPostUrl3] = useState(profile?.sponsored_post_url_3 || '');

  const history = useHistory();

  const user = useContext(AuthContext);


  const formik = useFormik({
    enableReinitialize: true,
    // Form to enter First Name, Last Name, job title, company name, company website, company logo, company description, company address, company phone number, company email, company social media links
    initialValues: {
      email: user?.email,
      username: username,
      followersCount: followersCount,
      rate: rate,
      category: category,
      hashtags: hashtags,
      topPostUrl1: topPostUrl1,
      topPostUrl2: topPostUrl2,
      topPostUrl3: topPostUrl3,
      sponsoredPostUrl1: sponsoredPostUrl1,
      sponsoredPostUrl2: sponsoredPostUrl2,
      sponsoredPostUrl3: sponsoredPostUrl3,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      rate: Yup.number(),
      followersCount: Yup.string(),
      category: Yup.string(),
      hashtags: Yup.string(),
      topPostUrl1: Yup.string(),
      topPostUrl2: Yup.string(),
      topPostUrl3: Yup.string(),
      sponsoredPostUrl1: Yup.string(),
      sponsoredPostUrl2: Yup.string(),
      sponsoredPostUrl3: Yup.string(),
    }),

    onSubmit: async (values: any) => {
      console.log('values: ', values);
      
      setCustomError('');
      setLoading(true);

      // todo: save to database
      await saveProfile(values);

      setLoading(false);
    },
  });

  const saveProfile = async (values: any) => {
    // e.preventDefault();
    try {
      const res = await fetch(`${API}/influencer-profile-instagram`, {
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
        
        history.push(ROUTES.INFLUENCER.DASHBOARD);
        // todo: change tab

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

  return (
    <form id="form" onSubmit={formik.handleSubmit}>
      {Error && <p className="error">{Error}</p>}
      {formik.touched.username && formik.errors.username ? ( <div>{formik.errors.username}</div> ) : null}
      <FormField>
        <TextInputField
          name='username'
          label="Username"
          required
          // description="This is a description."
          value={formik.values.username}
          onChange={(e: any) => formik.setFieldValue('username', e.target.value)}
        />
      </FormField>

      {Error && <p className="error">{Error}</p>}
      {formik.touched.followersCount && formik.errors.followersCount ? ( <div>{formik.errors.followersCount}</div> ) : null}
      <FormField>
        <TextInputField
          name='followersCount'
          label="Followers Count"
          // description="This is a description."
          value={formik.values.followersCount}
          onChange={(e: any) => formik.setFieldValue('followersCount', e.target.value)}
        />
      </FormField>

      {Error && <p className="error">{Error}</p>}
      {formik.touched.rate && formik.errors.rate ? ( <div>{formik.errors.rate}</div> ) : null}
      <FormField>
        <TextInputField
          type="number"
          name='rate'
          label="Rate Per Post ($)"
          // description="This is a description."
          value={formik.values.rate}
          onChange={(e: any) => formik.setFieldValue('rate', e.target.value)}
        />
      </FormField>

      {Error && <p className="error">{Error}</p>}
      {formik.touched.category && formik.errors.category ? ( <div>{formik.errors.category}</div> ) : null}
      <FormField>
        <TextInputField
          name='category'
          label="Category"
          // required
          // description="This is a description."
          value={formik.values.category}
          onChange={(e: any) => formik.setFieldValue('category', e.target.value)}
        />
      </FormField>

      {Error && <p className="error">{Error}</p>}
      {formik.touched.hashtags && formik.errors.hashtags ? ( <div>{formik.errors.hashtags}</div> ) : null}
      <FormField>
        <TextInputField
          name='hashtags'
          label="Top Hashtags (comma separated)"
          // required
          // description="This is a description."
          value={formik.values.hashtags}
          onChange={(e: any) => formik.setFieldValue('hashtags', e.target.value)}
        />
      </FormField>

      {Error && <p className="error">{Error}</p>}
      {formik.touched.topPostUrl1 && formik.errors.topPostUrl1 ? ( <div>{formik.errors.topPostUrl1}</div> ) : null}
      <FormField>
        <TextInputField
          name='topPostUrl1'
          label="Top Post Url 1"
          // required
          // description="This is a description."
          value={formik.values.topPostUrl1}
          onChange={(e: any) => formik.setFieldValue('topPostUrl1', e.target.value)}
        />
      </FormField>

      {Error && <p className="error">{Error}</p>}
      {formik.touched.topPostUrl2 && formik.errors.topPostUrl2 ? ( <div>{formik.errors.topPostUrl2}</div> ) : null}
      <FormField>
        <TextInputField
          name='topPostUrl2'
          label="Top Post Url 2"
          // required
          // description="This is a description."
          value={formik.values.topPostUrl2}
          onChange={(e: any) => formik.setFieldValue('topPostUrl2', e.target.value)}
        />
      </FormField>


      {Error && <p className="error">{Error}</p>}
      {formik.touched.topPostUrl3 && formik.errors.topPostUrl3 ? ( <div>{formik.errors.topPostUrl3}</div> ) : null}
      <FormField>
        <TextInputField
          name='topPostUrl3'
          label="Top Post Url 3"
          // required
          // description="This is a description."
          value={formik.values.topPostUrl3}
          onChange={(e: any) => formik.setFieldValue('topPostUrl3', e.target.value)}
        />
      </FormField>


      {Error && <p className="error">{Error}</p>}
      {formik.touched.sponsoredPostUrl1 && formik.errors.sponsoredPostUrl1 ? ( <div>{formik.errors.sponsoredPostUrl1}</div> ) : null}
      <FormField>
        <TextInputField
          name='sponsoredPostUrl1'
          label="Sponsored Post Url 1"
          // required
          // description="This is a description."
          value={formik.values.sponsoredPostUrl1}
          onChange={(e: any) => formik.setFieldValue('sponsoredPostUrl1', e.target.value)}
        />
      </FormField>


      {Error && <p className="error">{Error}</p>}
      {formik.touched.sponsoredPostUrl2 && formik.errors.sponsoredPostUrl2 ? ( <div>{formik.errors.sponsoredPostUrl2}</div> ) : null}
      <FormField>
        <TextInputField
          name='sponsoredPostUrl2'
          label="Sponsored Post Url 2"
          // required
          // description="This is a description."
          value={formik.values.sponsoredPostUrl2}
          onChange={(e: any) => formik.setFieldValue('sponsoredPostUrl2', e.target.value)}
        />
      </FormField>


      {Error && <p className="error">{Error}</p>}
      {formik.touched.sponsoredPostUrl3 && formik.errors.sponsoredPostUrl3 ? ( <div>{formik.errors.sponsoredPostUrl3}</div> ) : null}
      <FormField>
        <TextInputField
          name='sponsoredPostUrl3'
          label="Sponsored Post Url 3"
          // required
          // description="This is a description."
          value={formik.values.sponsoredPostUrl3}
          onChange={(e: any) => formik.setFieldValue('sponsoredPostUrl3', e.target.value)}
        />
      </FormField>

    {/* Submit Button */}
    <input type="submit" value={loading ? 'loading...' : 'Submit'} />
    </form>
  )
}

// const AudienceDetails: React.FC = () => {

//    const [Error, setCustomError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [fetchingProfile, setFetchingProfile] = useState(false);

//   const [city1, setCity1] = useState('');
//   const [city2, setCity2] = useState('');
//   const [city3, setCity3] = useState('');



//   const [lastName, setLastName] = useState('');
//   const [bio, setBio] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [city, setCity] = useState('');

//   const history = useHistory();

//   const formik = useFormik({
//     enableReinitialize: true,
//     // Form to enter First Name, Last Name, job title, company name, company website, company logo, company description, company address, company phone number, company email, company social media links
//     initialValues: {
//       firstName: firstName,
//       lastName: lastName,
//       bio: bio,
//       city: city,
//       imageUrl: imageUrl,
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().required('Required'),
//       lastName: Yup.string().required('Required'),
//       bio: Yup.string().required('Required'),
//       city: Yup.string().required('Required'),
//       imageUrl: Yup.string()
//         .matches(
//             /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
//             'Invalid url!'
//         ).required('Required'),
//     }),

//     onSubmit: async (values: any) => {
//       console.log('values: ', values);
      
//       setCustomError('');
//       setLoading(true);

//       // todo: save to database
//       await saveProfile(values);

//       setLoading(false);
//     },
//   });

//   const saveProfile = async (values: any) => {
//     // e.preventDefault();
//     try {
//       const res = await fetch(`${API}/influencer_user_profile_personal`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });
//       const data = await res.json();
//       console.log(data);
      
//       if(data.status === 'success') {
//         toaster.success(data.message);
//         // history.push('/brand/discover');

//         // todo: change to next tab
//       } else {
//         toaster.danger(data.message);
//       }
      
//       setLoading(false);
//     } catch (error: any) {
//       console.error(error);
//       const errorCode = error?.code;
//       const errorMessage = error?.message;

//       toaster.danger(errorMessage);
//     }
//   }

//   return (
//     <>
//     <form id="form" onSubmit={formik.handleSubmit}>
//       {Error && <p className="error">{Error}</p>}
//       {formik.touched.city1 && formik.errors.city1 ? ( <div>{formik.errors.firstName}</div> ) : null}
//       <FormField>
//         <TextInputField
//           name='firstName'
//           label="First Name"
//           required
//           // description="This is a description."
//           value={formik.values.firstName}
//           onChange={(e: any) => formik.setFieldValue('firstName', e.target.value)}
//         />
//       </FormField>

//       {Error && <p className="error">{Error}</p>}
//       {formik.touched.lastName && formik.errors.lastName ? ( <div>{formik.errors.lastName}</div> ) : null}
//       <FormField>
//         <TextInputField
//           name='lastName'
//           label="Last Name"
//           required
//           // description="This is a description."
//           value={formik.values.lastName}
//           onChange={(e: any) => formik.setFieldValue('lastName', e.target.value)}
//         />
//       </FormField>

//       {Error && <p className="error">{Error}</p>}
//       {formik.touched.bio && formik.errors.bio ? ( <div>{formik.errors.bio}</div> ) : null}
//       <FormField>
//         <TextInputField
//           name='bio'
//           label="Bio"
//           required
//           // description="This is a description."
//           value={formik.values.bio}
//           onChange={(e: any) => formik.setFieldValue('bio', e.target.value)}
//         />
//       </FormField>

//       {Error && <p className="error">{Error}</p>}
//       {formik.touched.city && formik.errors.city ? ( <div>{formik.errors.city}</div> ) : null}
//       <FormField>
//         <TextInputField
//           name='city'
//           label="City"
//           required
//           // description="This is a description."
//           value={formik.values.city}
//           onChange={(e: any) => formik.setFieldValue('city', e.target.value)}
//         />
//       </FormField>

//       {Error && <p className="error">{Error}</p>}
//       {formik.touched.imageUrl && formik.errors.imageUrl ? ( <div>{formik.errors.imageUrl}</div> ) : null}
//       <FormField>
//         <TextInputField
//           name='imageUrl'
//           label="Profile Image Url"
//           required
//           // description="This is a description."
//           value={formik.values.imageUrl}
//           onChange={(e: any) => formik.setFieldValue('imageUrl', e.target.value)}
//         />
//       </FormField>

//       {/* Submit Button */}
//       <input type="submit" value={loading ? 'loading...' : 'Submit'} />
//     </form>
//     </>
//   )
// };

export default InfluencerCompleteProfile;
