import React, { useEffect, useState } from 'react';

import OrderDetailsWrapper from './OrderDetails.styles';
import Hamburger from 'hamburger-react';
import { Avatar, Button, Heading, Pane, Paragraph, Pill, Spinner, TextInputField, toaster } from 'evergreen-ui';
import CSSVARIABLES from 'global/constants/variables';
import SideBar from 'components/Influencer/SideBar/SideBar.lazy';
import isMobile from 'global/functions/is-mobile';
import Syncy from '../../../assets/images/syncy.png';
import API from 'global/constants/api';
import RichMarkdownEditor from 'rich-markdown-editor';
import addDays from 'global/functions/add-days-to-date';

// declare interface IOrderDetailsProps {}

const OrderDetails: React.FC = () => {
  const [isOpen, setOpen] = useState(isMobile.any() ? false : true)
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<any>({})
  const [submissionUrl, setSubmissionUrl] = useState('')

  const [submitting, setSubmitting] = useState(false)

  const getOrderDetails = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API}/booking/${window?.location?.href.split('/').pop()}`)
      const data = await response.json()
      console.log(data?.body?.booking)
  
      setOrder(data?.body?.booking)

      if(data?.body?.booking?.submission_url) {
        setSubmissionUrl(data?.body?.booking?.submission_url)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const submitSubmission = async () => {
    if (!submissionUrl) {
      toaster.danger('Please enter a submission url')
      return
    }
    setSubmitting(true)
    try {
      const response = await fetch(`${API}/save-submission-url/${window?.location?.href.split('/').pop()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          submissionUrl: submissionUrl
        })
      })
      const data = await response.json()
      console.log(data)
      if(data?.status === 'success') {
        setOrder({ ...order, submission_url: data?.body?.submission_url})
        toaster.success(data?.message)
      } else {
        toaster.danger(data?.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    getOrderDetails()
  }, [])

  useEffect(() => {
    console.log('[updates]', order);
  }, [order])

  return (
  <OrderDetailsWrapper data-testid="OrderDetails">
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

    <h1>Order #{window?.location.href.split('/').pop()}</h1>

    {loading && 
      <Pane display="flex" alignItems="center" justifyContent="center" height={240}>
        <Spinner />
      </Pane>
    }
    {!loading &&
    <>
    {order?.submission_url ?     
    <Pane>
      <Heading>Submission: {order?.submission_url}</Heading>
    </Pane>
    :
    <Pane>
      <TextInputField
        label="Submission URL"
        description="Please provide the URL to your submission after you have completed the order."
        placeholder="https://www.youtube.com/watch?v=..."
        value={submissionUrl}
        onChange={(e: any) => setSubmissionUrl(e.target.value)}
      />
      <Button onClick={submitSubmission} intent="success" appearance='primary' isLoading={submitting}>Submit</Button>
    </Pane>
    }

    <Pane display="flex" padding={16} marginTop={24} background={CSSVARIABLES.COLORS.WHITE_0} borderRadius={3}>
    <div className='orderDetails'>
      
      <Paragraph>Status: <Pill>{order?.status}</Pill></Paragraph>
      <Paragraph>Ordered on: {new Date(order?.date).toLocaleDateString()}</Paragraph>
      <Paragraph>To be delivered by: {addDays(order?.date, order?.delivery)}</Paragraph>

      <h3>Paid: ${order?.contentPack?.price}</h3>
 
      <h2>Deliverable Details</h2>

      <Heading>{order?.contentPack?.title}</Heading>
      <Paragraph>{order?.contentPack?.description}</Paragraph>
      <Paragraph>Platform: <Pill>{order?.contentPack?.platform}</Pill></Paragraph>

      <h2>Brand Details</h2>
      <Avatar src={order?.brand?.company_logo} name={order?.brand?.first_name + ' ' + order?.brand?.last_name} size={40} />
      <Heading>{order?.brand?.company_name}</Heading>
      <Paragraph>{order?.brand?.company_description}</Paragraph>
      <Paragraph>Contact: {order?.brand?.first_name + ' ' + order?.brand?.last_name}</Paragraph>
      <a href={order?.brand?.company_website} target="_blank" rel="noreferrer">{order?.brand?.website}</a>
      <a href={order?.brand?.company_instagram} target="_blank" rel="noreferrer">Instagram</a>

      <br /> <br />
      {order?.details &&
      <>
        <h2>Content Details</h2>
        <RichMarkdownEditor defaultValue={order?.details} readOnly={true} />
      </>
      }

      {order?.contentScript &&
      <>
        <h2>Content Script</h2>
        <RichMarkdownEditor defaultValue={order?.contentScript} readOnly={true} />
      </>
      }

      {order?.copy &&
      <>
        <h2>Content Copy/Assets</h2>
        <RichMarkdownEditor defaultValue={order?.copy} readOnly={true} />
      </>
      }

    </div>
    </Pane>
    </>
    }
  </OrderDetailsWrapper>
)};

export default OrderDetails;
