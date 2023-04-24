import React, { useContext, useEffect, useState } from 'react';

import ContentPacksWrapper from './ContentPacks.styles';
import SideBar from '../SideBar/SideBar.lazy';
import CSSVARIABLES from 'global/constants/variables';
import { AuthContext } from 'global/context/AuthContext';
import API from 'global/constants/api';
import { Button, Card, EditIcon, Heading, IconButton, Pane, Pill, Select, SelectField, SideSheet, Spinner, TextInputField, TrashIcon, majorScale, toaster } from 'evergreen-ui';
import { useFormik } from 'formik';
import * as Yup from "yup";

import emailjs from '@emailjs/browser';

// declare interface IContentPacksProps {}

export interface ContentPack {
  id: string;
  title: string;
  description: string;
  price: number;
  platform: string;
  examples: string;
  delivery: number;
}

const ContentPacks: React.FC = () => {
  const user = useContext(AuthContext);

  const [contentPacks, setContentPacks] = useState<ContentPack[]>([]);

  const [selectedPack, setSelectedPack] = useState<ContentPack | undefined>();

  const [showCreateContentPack, setShowCreateContentPack] = useState(false);

  const [loading, setLoading] = useState(false);

  // get content packs from api and set state /content-packs/:id
  const getContentPacks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/content-packs/${user?.email}`);
      const data = await response.json();
      console.log(data);
      
      setContentPacks(data?.body.content_packs);

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const deleteContentPack = async (id: string) => {
    try {
      const response = await fetch(`${API}/content-pack/${user?.email}/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
      if(data?.status === 'success') {
        toaster.success('Content Pack Deleted');
        getContentPacks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(user?.email) {
      getContentPacks();
    }
  }, [user]);


  return (
  <ContentPacksWrapper data-testid="ContentPacks">
    <SideBar lightColor={CSSVARIABLES.COLORS.YELLOW_GREEN_1} darkColor={CSSVARIABLES.COLORS.YELLOW_GREEN_0} />
    
    <h1>My Deliverables</h1>
    <Button appearance='primary' onClick={() => setShowCreateContentPack(true)}>
      Create Deliverable
    </Button>
    {loading ? 
    <Pane display="flex" alignItems="center" justifyContent="center" height={240}>
      <Spinner />
    </Pane>
    :
    <>
    {contentPacks.length > 0 ?
      <div className="content-packs">
      {contentPacks?.map((contentPack) => (
      <Pane padding={16} background='#fff' width='40vw' marginTop={30} borderRadius={10}>
        <div className="content-pack" key={contentPack?.id}>
          <Pill color="green" marginRight={8}>{contentPack?.platform}</Pill>
          <IconButton icon={EditIcon} marginRight={majorScale(2)} onClick={() => {
            setSelectedPack(contentPack);
            setShowCreateContentPack(true)
          }} />
          <IconButton icon={TrashIcon} intent='danger' marginRight={majorScale(2)} onClick={() => {
            deleteContentPack(contentPack?.id);
          }} />
          <h2>{contentPack?.title} for ${contentPack?.price}</h2>
          <p>{contentPack?.description}</p>
          <p>{contentPack?.examples}</p>
        </div>
        <hr />
        <small>Delivery in <Pill color="blue" marginRight={8}>{contentPack?.delivery} days</Pill></small>
      </Pane>
      ))}
    </div>
    :
    <Pane display="flex" alignItems="center" justifyContent="center" height={240} background='#fff' marginTop={12}>
      <div style={{textAlign: 'center'}}>
        <p>You have no deliverables</p>
        <Button appearance='primary' onClick={() => setShowCreateContentPack(true)}>
          Create Deliverable
        </Button>
      </div>
    </Pane>
    }
    </>
  }

    {showCreateContentPack && 
      <CreateContentPack 
        isShown={showCreateContentPack} 
        setIsShown={setShowCreateContentPack} 
        getContentPacks={getContentPacks} 
        selectedPack={selectedPack}
        setSelectedPack={setSelectedPack}
      />}
  </ContentPacksWrapper>
)};

const platforms = [
  "User Generated Content (UGC)",
  "Instagram",
  "Facebook",
  "Twitter",
  "YouTube",
  "TikTok",
  "Snapchat",
  "Pinterest",
  "LinkedIn",
  "Reddit",
  "Twitch",
  "Other"
]

function CreateContentPack({ isShown, setIsShown, getContentPacks, selectedPack, setSelectedPack }: 
  { isShown: boolean, setIsShown: (value: boolean) => void, 
    getContentPacks: () => void, selectedPack?: ContentPack, 
    setSelectedPack: (value: ContentPack | undefined) => void }) {

  const user = useContext(AuthContext);
  const [customError, setCustomError] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: selectedPack ? selectedPack?.title : '1 Still Image',
      description: selectedPack ? selectedPack?.description : 'A still image for Instagram or Facebook. You own the content and can post to your social media accounts.',
      price: selectedPack ? selectedPack?.price : 100,
      platform: selectedPack ? selectedPack?.platform : 'User Generated Content (UGC)',
      examples: selectedPack ? selectedPack?.examples : '',
      delivery: selectedPack ? selectedPack?.delivery : 7,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(300, 'Must be 300 characters or less').required('Required'),
      description: Yup.string().max(1000, 'Must be 1000 characters or less').required('Required'),
      price: Yup.number().min(0, 'Must be greater than 0').required('Required'),
      platform: Yup.string().max(300, 'Must be 300 characters or less').required('Required'),
      examples: Yup.string().max(10000, 'Must be 10000 characters or less'),
      delivery: Yup.number().min(0, 'Must be greater than 0').required('Required'),
    }),

    onSubmit: async (values: any) => {
      // if (values.password !== confirmPassword) {
      //   setCustomError("Passwords don't match.");
      //   return;
      // }

      setCustomError('');
      setLoading(true);

      console.log(selectedPack);
      
      if(selectedPack?.title === undefined ) {
        console.log('create');
        await createContentPack(values);
      } else {
        console.log('update');
        await updateContentPack(values);
      }
      setLoading(false);
    },
  });

  const createContentPack = async (values: any) => {
    try {
      const response = await fetch(`${API}/content-pack/${user?.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);

      if (data?.status === 'fail') {
        toaster.danger(data?.message);
      } else {
        setIsShown(false);
        toaster.success('Content Pack Created');
        getContentPacks()
        // send email with emailjs
        const templateParams = {
          email: user?.email,
          title: values?.title,
          description: values?.description,
          price: values?.price,
          platform: values?.platform,
          delivery: values?.delivery,
          examples: values?.examples,
        };
        emailjs.send('service_5qbdzev', 'template_srfsve9', templateParams, 'Wpls9Y0SfcmtgJKO5')
        .then((result) => {
            console.log(result.text);
        } , (error) => {
            console.log(error.text);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateContentPack = async (values: any) => {
    try {
      const response = await fetch(`${API}/content-pack/${user?.email}/${selectedPack?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);

      if (data?.status === 'fail') {
        toaster.danger(data?.message);
      } else {
        setIsShown(false);
        toaster.success('Content Pack Updated');
        getContentPacks()
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('selectedPack', selectedPack);
  }, [selectedPack])
  
  return (
    <React.Fragment>
      <SideSheet
        isShown={isShown}
        onCloseComplete={() => {
          setSelectedPack(undefined);
          setIsShown(false);
        }}
        containerProps={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column'
        }}
        preventBodyScrolling
      >
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16}>
            <Heading size={600}>{selectedPack ? 'Edit Content Deliverable' : 'Create New Content Deliverable'}</Heading>
          </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
          <Card
            backgroundColor="white"
            elevation={0}
            // height={240}
            padding={16}
            // display="flex"
            // alignItems="center"
            // justifyContent="center"
          >

        <div className="form_wrapper" id="form_wrapper">
        <form id="form" onSubmit={formik.handleSubmit}>
          {Error && <p className="error">{Error}</p>}

          <TextInputField
            type="text"
            name="title"
            id="title"
            label="Title"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            placeholder="Title"
            validationMessage={formik.touched.title && formik.errors.title ? formik.errors.title : null}
          />

          <br />

          <TextInputField
            label="Description"
            required
            name="description"
            id="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeholder="Description"
            validationMessage={formik.touched.description && formik.errors.description ? formik.errors.description : null}
          />

          <br />


          <TextInputField
            label="Price ($USD)"
            required
            type="number"
            name="price"
            id="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            placeholder="Price"
            validationMessage={formik.touched.price && formik.errors.price ? formik.errors.price : null}
          />

          <br />

          <SelectField
            label="Platform"
            required
            value={formik.values.platform} 
            onChange={(event: any) => formik.setFieldValue('platform', event.target.value)}
            onBlur={formik.handleBlur}
          >
            {platforms.map((platform: string) => (
              <option value={selectedPack?.platform === platform ? selectedPack?.platform : platform} key={selectedPack?.platform === platform ? selectedPack?.platform : platform}>
                {selectedPack?.platform === platform ? selectedPack?.platform : platform}
              </option>
            ))}
          </SelectField>

          <br />


          <TextInputField
            label="Examples of past work (comma separated)"
            type="text"
            name="examples"
            id="examples"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.examples}
            placeholder="https://instagram.com/post1, https://instagram.com/post2"
            validationMessage={formik.touched.examples && formik.errors.examples ? formik.errors.examples : null}
          />

          <br />

          <TextInputField
            label="Delivery Time (in days)"
            required
            type="number"
            name="delivery"
            id="delivery"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.delivery}
            placeholder="7"
            validationMessage={formik.touched.delivery && formik.errors.delivery ? formik.errors.delivery : null}
          />

          <Button type="submit" appearance='primary' intent="success">{loading ? 'Saving...' : 'Save'}</Button>
        </form>
    </div>
          </Card>
        </Pane>
      </SideSheet>
    </React.Fragment>
  )
}

export default ContentPacks;
