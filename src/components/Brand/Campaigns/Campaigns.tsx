import React, { useContext, useEffect, useState } from 'react';

import CampaignsWrapper from './Campaigns.styles';
import Hamburger from 'hamburger-react';
import isMobile from 'global/functions/is-mobile';
import { Avatar, Button, Card, Checkbox, FileCard, FileUploader, FormField, Heading, IconButton, Pane, Paragraph, Pill, SideSheet, Spinner, TagInput, TextInputField, TrashIcon, majorScale, toaster } from 'evergreen-ui';
import CSSVARIABLES from 'global/constants/variables';
import Syncy from '../../../assets/images/syncy.png';
import SideBar from 'components/SideBar/SideBar.lazy';
import API from 'global/constants/api';
import { useFormik } from 'formik';
import { AuthContext } from 'global/context/AuthContext';

// declare interface ICampaignsProps {}

const Campaigns: React.FC = () => {
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [isOpen, setOpen] = useState(isMobile.any() ? false : true)
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);

  const [campaigns, setCampaigns] = useState([])

  const user = useContext(AuthContext)

  // get all campaigns /brand/campaigns-by-email
  const getCampaigns = async () => {
    try {
      setLoadingCampaigns(true);
      const res = await fetch(`${API}/brand/campaigns-by-email?email=${user?.email}`);
      const data = await res.json();
      console.log(data);

      if(data?.status === 'success') {
        setCampaigns(data?.body?.campaigns);
      }
    } catch (error: any) {
      console.error(error);
      const errorCode = error?.code;
      const errorMessage = error?.message;
      console.log(error);
    } finally {
      setLoadingCampaigns(false);
    }
  }

  // delete campaign /brand/campaign/:id DELETE
  const deleteCampaign = async (id: string) => {
    try {
      // setLoadingCampaigns(true);
      const res = await fetch(`${API}/brand/campaign/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      console.log(data);

      if(data?.status === 'success') {
        toaster.success('Campaign deleted successfully');
        getCampaigns();
      }
    } catch (error: any) {
      console.error(error);
      const errorCode = error?.code;
      const errorMessage = error?.message;
      console.log(error);
    } finally {
      // setLoadingCampaigns(false);
    }
  }

  useEffect(() => {
    if(user?.email) {
      getCampaigns();
    }
  }, [user?.email])
  
  return (
  <CampaignsWrapper data-testid="Campaigns">
    <div className='toggleBtn'>
      <Hamburger toggled={isOpen} toggle={(setOpen)} />
    </div>

    <Pane display="flex" padding={16} marginTop={24} background={CSSVARIABLES.COLORS.YELLOW_GREEN_1} borderRadius={3}>
      <img src={Syncy} alt="Syncy" width="50" height="50" />
      <Pane>
        <Heading size={800} flex={1} alignItems="center" display="flex">
          Syncy
        </Heading>
        <Heading size={400}>
          Where brands connect with quality micro-influencers
        </Heading>
      </Pane>
      <Pane>
      </Pane>
    </Pane>

    {isOpen && <SideBar lightColor={CSSVARIABLES.COLORS.YELLOW_GREEN_1} darkColor={CSSVARIABLES.COLORS.YELLOW_GREEN_0} />}

    <h1>My Campaigns &nbsp;&nbsp;
        <Button onClick={() => setShowCreateCampaign(true)}>Create New Campaign</Button>
    </h1>

    <Pane display="flex" flexWrap="wrap" justifyContent="center">
      {loadingCampaigns && 
        <Spinner />
      }
      {!loadingCampaigns && campaigns?.map((campaign: any) => (
        <Card
          key={campaign?.id}
          elevation={1}
          backgroundColor={CSSVARIABLES.COLORS.WHITE_0}
          width={300}
          height={300}
          margin={24}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          padding={24}
          onClick={() => console.log('clicked')}
        >


          <Avatar src={campaign?.logo} name={campaign?.name} alt={campaign?.name} size={80} />
          <Heading size={600} marginTop={16}>
            {campaign?.name}
          </Heading>
          <Paragraph size={400} marginTop={16}>
            {campaign?.description}
          </Paragraph>
          <Pill marginTop={16}>
            {campaign?.type.replace('{', '').replace('}', '')}
          </Pill>
          <Heading size={400} marginTop={16}>
            {campaign?.status ? 'Active' : 'Inactive'}
          </Heading>
          {/* <Heading size={400} marginTop={16}>
            {campaign?.bookCallInfo}
          </Heading> */}
          <Paragraph marginTop={16}>
            <IconButton icon={TrashIcon} intent="danger" marginRight={majorScale(2)} 
              onClick={() => deleteCampaign(campaign?.id)}
            />
          </Paragraph>
        </Card>
      ))}
    </Pane>

    <CreateCampaign isShown={showCreateCampaign} setIsShown={setShowCreateCampaign} getCampaigns={getCampaigns} />
  </CampaignsWrapper>
)};

const CreateCampaign = ({isShown, setIsShown, getCampaigns}: any) => {

  const user = useContext(AuthContext)

  const [Error, setCustomError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const allValues = React.useMemo(
    () => ['Paid', 'Gifting', 'Brand Ambassador', 'Unpaid'],
    []
  )
  
  const [campaignTypes, setCampaignTypes] = useState<any>([]);
  const autocompleteItems = React.useMemo(() => allValues.filter((i) => !campaignTypes.includes(i)), [allValues, campaignTypes])

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
      campaignName: "",
      campaignDescription: "",
      campaignType: "",
      campaignStatus: false,
      campaignLogo: "",
      campaignEmail: user?.email,
      bookCallInfo: "",
    },
    // validationSchema: Yup.object({
    //   campaignName: Yup.string().required('Required'),
    //   campaignDescription: Yup.string().required('Required'),
    //   campaignType: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
    //   campaignStatus: Yup.boolean().required('Required'),
    //   campaignLogo: Yup.string().required('Required'),
    //   campaignEmail: Yup.string().email('Invalid email address'),
    //   bookCallInfo: Yup.string(),
    // }),

    onSubmit: async (values: any) => {
      console.log('values: ', values);
      
      setCustomError('');
      setLoading(true);

      // upload image to imgur
      if(files?.length > 0) {
        const link = await uploadImage(files[0]);
        console.log('campaignLogo: ', values.campaignLogo, link);
        values.campaignLogo = link;
      }

      // save to database
      await saveCampaign(values);

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
        // setImageUrl(imageUrl);
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

  const saveCampaign = async (values: any) => {
    console.log('here');
    
    try {
      console.log('now here');

      const res = await fetch(`${API}/admin/campaign`, {
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
        toaster.success('Campaign created successfully');
        
        // refresh campaigns
        getCampaigns();
        setIsShown(false);
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

  useEffect(() => {
    if(user?.email) {
      formik.setFieldValue('campaignEmail', user?.email);
    }
  }, [user?.email])

  return (
    <React.Fragment>
      <SideSheet
        isShown={isShown}
        onCloseComplete={() => setIsShown(false)}
        containerProps={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column'
        }}
      >
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16}>
            <Heading size={600}>Create New Campaign</Heading>
          </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
          <Card
            backgroundColor="white"
            elevation={0}
            // height={240}
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={36}
          >
          <div className='form'>
            <form id="CreateCampaign" onSubmit={formik.handleSubmit}>
              <FormField>
                <TextInputField label="Campaign Name" placeholder=""
                  required
                  value={formik?.values?.campaignName}
                  onChange={(e: any) => formik.setFieldValue('campaignName', e.target.value)}
                />
              </FormField>

              <FormField>
              <TextInputField label="Campaign Description" placeholder=""
                required
                value={formik?.values?.campaignDescription}
                onChange={(e: any) => formik.setFieldValue('campaignDescription', e.target.value)}
              />
              </FormField>

              <TagInput
                inputProps={{ placeholder: 'Campaign type...' }}
                values={campaignTypes}
                autocompleteItems={autocompleteItems}
                onChange={(values) => {
                  setCampaignTypes(values);
                  formik.setFieldValue('campaignType', values);
                }}
              />

              <br/>
              <br/>
                
              <Checkbox 
                label="Activate Campaign"
                checked={formik.values.campaignStatus} onChange={(e: any) => formik.setFieldValue('campaignStatus', e.target.checked)} />

              <FileUploader
                label="Upload Campaign Logo"
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
              <input type="submit" value={loading ? 'loading...' : 'Create Campaign 👉'}/>
          </form>
          </div>
          </Card>
        </Pane>
      </SideSheet>
    </React.Fragment>
  )

}

export default Campaigns;
