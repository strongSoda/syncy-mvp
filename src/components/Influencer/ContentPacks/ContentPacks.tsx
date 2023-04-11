import React, { useContext, useEffect, useState } from 'react';

import ContentPacksWrapper from './ContentPacks.styles';
import SideBar from '../SideBar/SideBar.lazy';
import CSSVARIABLES from 'global/constants/variables';
import { AuthContext } from 'global/context/AuthContext';
import API from 'global/constants/api';
import { Button, Card, Heading, Pane, SideSheet } from 'evergreen-ui';
import { useFormik } from 'formik';
import * as Yup from "yup";

// declare interface IContentPacksProps {}

interface ContentPack {
  id: string;
  title: string;
  description: string;
  price: number;
  source: string;
  examples: string;
}

const ContentPacks: React.FC = () => {
  const user = useContext(AuthContext);

  const [contentPacks, setContentPacks] = useState<ContentPack[]>([]);

  const [showCreateContentPack, setShowCreateContentPack] = useState(false);

  // get content packs from api and set state /content-packs/:id
  const getContentPacks = async () => {
    try {
      const response = await fetch(`${API}/content-packs/${user?.email}`);
      const data = await response.json();
      console.log(data);
      
      setContentPacks(data?.body.content_packs);

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
    
    <h1>My Content Packs
    </h1>
    <Button appearance='primary' onClick={() => setShowCreateContentPack(true)}>
      Create Content Pack
    </Button>

    {contentPacks.length > 0 ?
      <div className="content-packs">
      {contentPacks?.map((contentPack) => (
        <div className="content-pack" key={contentPack.id}>
          <h2>{contentPack.title}</h2>
          <p>{contentPack.description}</p>
          <p>{contentPack.price}</p>
          <p>{contentPack.source}</p>
          <p>{contentPack.examples}</p>
        </div>
      ))}
    </div>
    :
    <p>You have no content packs</p>
  }

    {showCreateContentPack && <CreateContentPack isShown={showCreateContentPack} setIsShown={setShowCreateContentPack} />}
  </ContentPacksWrapper>
)};

function CreateContentPack({ isShown, setIsShown }: { isShown: boolean, setIsShown: (value: boolean) => void }) {

  const formik = useFormik({
    initialValues: {
      title: '1 Reel',
      description: '1 Reel of content',
      price: 100,
      source: 'Instagram',
      examples: '',
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
        preventBodyScrolling
      >
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16}>
            <Heading size={600}>Create New Content Pack</Heading>
          </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
          <Card
            backgroundColor="white"
            elevation={0}
            height={240}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Heading>Some content</Heading>
          </Card>
        </Pane>
      </SideSheet>
    </React.Fragment>
  )
}

export default ContentPacks;
