import React, { useContext, useEffect, useState } from 'react';

import BookPackWrapper from './BookPack.styles';
import { ContentPack } from 'components/Influencer/ContentPacks/ContentPacks';
import { ArrowRightIcon, Button, Card, Heading, Pane, Paragraph, Pill, toaster } from 'evergreen-ui';
import { useFormik } from 'formik';
import { AuthContext } from 'global/context/AuthContext';
import API from 'global/constants/api';
import RichMarkdownEditor from 'rich-markdown-editor';
import uploadImage from 'global/functions/upload-image';

declare interface IBookPackProps {
  contentPack: ContentPack;
  influencer: any;
}

const BookPack: React.FC<IBookPackProps> = ({contentPack, influencer}: IBookPackProps) => {
  return (
  <BookPackWrapper data-testid="BookPack">
    <CreateBooking contentPack={contentPack} influencer={influencer} />
  </BookPackWrapper>
)};

function CreateBooking({ contentPack, influencer }: { contentPack: ContentPack, influencer: any }) {
  
  const user = useContext(AuthContext);
  const [customError, setCustomError] = useState('');
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState('');
  const [contentScript, setContentScript] = useState('');
  const [copy, setCopy] = useState('');

  const createPackBooking = async () => {
    if(!details) {
      toaster.danger('Please fill out the details');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API}/book-content-pack/${contentPack?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: user?.email,
          details,
          contentScript,
          copy,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data?.status === 'fail') {
        toaster.danger(data?.message);
      } else {
        // setIsShown(false);
        toaster.success('Progress Saved');
        await createCheckoutSession(data?.body?.booking?.id);
        // getContentPacks()
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createCheckoutSession = async (bookingId: string) => {
    try {
      const response = await fetch(`${API}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: user?.email,
          bookingId: bookingId,
          contentPackId: contentPack,
          contentPack: contentPack,
          influencer: influencer,
          price: contentPack?.price,
          details,
          contentScript,
          copy,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data?.status === 'fail') {
        toaster.danger(data?.message);
      } else {
        window.location.href = data?.body?.url;
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    console.log('contentPack', contentPack);
  }, [contentPack])
  
  return (
    <React.Fragment>
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16}>
            <Heading size={600}>Booking <em><strong>{contentPack?.title}</strong></em> on 
            &nbsp;<Pill color='purple'>{contentPack?.platform}</Pill> by {influencer?.fullName} for <big>${contentPack?.price}</big></Heading>
            <Paragraph>Fill out the details below to create a booking for this content pack.</Paragraph>
          </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
          <Card
            backgroundColor="tint2"
            elevation={0}
            padding={16}
          >
            <Heading size={600} marginTop={20}>Your Details</Heading>
            <Paragraph>Write some details about what post you want and mention specifics like your product, format etc.</Paragraph>
            <RichMarkdownEditor defaultValue={details} onChange={(value: any) => {
                setDetails(value())
                console.log('@@@@@@ details', value())
              }} 
                uploadImage={async file => {
                  const result = await uploadImage(file);
                  console.log('@@@@@@ image uploaded', result?.data);
                  return result?.data?.link;
                }}
                />

            <Heading size={600} marginTop={20}>Content Script (Optional)</Heading>
            <Paragraph>If you have a script for the content please include it here.</Paragraph>
            <RichMarkdownEditor defaultValue={contentScript} onChange={(value: any) => setContentScript(value())}
                uploadImage={async file => {
                  const result = await uploadImage(file);
                  console.log('@@@@@@ image uploaded', result?.data);
                  return result?.data?.link;
                }}
                />

            <Heading size={600} marginTop={20}>Copy/Media (Optional)</Heading>
            <Paragraph>Attach the text of the post or assets such as Links, Images, Videos etc.</Paragraph>
            <RichMarkdownEditor defaultValue={copy} onChange={(value: any) => setCopy(value())}
                uploadImage={async file => {
                  const result = await uploadImage(file);
                  console.log('@@@@@@ image uploaded', result?.data);
                  return result?.data?.link;
                }}
                />

            <Pane display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Button appearance="primary" intent="success" marginTop={20} onClick={createPackBooking} iconAfter={ArrowRightIcon}>
              {loading ? 'Loading...' : 'Create Booking'}
            </Button>
            </Pane>            
        </Card>
    </Pane>
    </React.Fragment>
  )
}

export default BookPack;
