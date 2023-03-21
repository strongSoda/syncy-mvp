import React, { useState } from 'react';

import { Checkbox, FileCard, FileUploader, FormField, Pane, TagInput, TextInputField, toaster } from 'evergreen-ui';
import { useFormik } from 'formik';
import * as Yup from "yup";


import AdminCampaignsWrapper from './AdminCampaigns.styles';
import API from 'global/constants/api';
import CSSVARIABLES from 'global/constants/variables';
import Button from 'components/Button/Button.lazy';

// declare interface IAdminCampaignsProps {}

const AdminCampaigns: React.FC = () => {
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
      campaignEmail: "",
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
  <AdminCampaignsWrapper data-testid="AdminCampaigns">
    {/* <span>AdminCampaigns Component</span> */}
    <Pane display="flex" justifyContent="center">
      <h1>Manage Campaigns | Admin</h1>
    </Pane>

    <div className='form'>
    <form id="CreateCampaign" onSubmit={formik.handleSubmit}>
      <FormField>
        <TextInputField label="Campaign Name" placeholder=""
          required
          value={formik.values.campaignName}
          onChange={(e: any) => formik.setFieldValue('campaignName', e.target.value)}
        />
      </FormField>

      <FormField>
      <TextInputField label="Campaign Description" placeholder=""
        required
        value={formik.values.campaignDescription}
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

      
      <FormField>
      <TextInputField label="Campaign Email" placeholder=""
        required
        value={formik.values.campaignEmail}
        onChange={(e: any) => {
          formik.setFieldValue('campaignEmail', e.target.value)
        }}
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
      <input type="submit" value={loading ? 'loading...' : 'Create Campaign 👉'}/>
  </form>
  </div>
  </AdminCampaignsWrapper>
)};

export default AdminCampaigns;
