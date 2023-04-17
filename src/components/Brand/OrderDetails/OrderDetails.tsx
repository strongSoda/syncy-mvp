import React, { useEffect, useState } from 'react';

import OrderDetailsWrapper from './OrderDetails.styles';
import Hamburger from 'hamburger-react';
import { Avatar, Heading, Pane, Paragraph, Pill, Spinner } from 'evergreen-ui';
import CSSVARIABLES from 'global/constants/variables';
import SideBar from 'components/SideBar/SideBar.lazy';
import isMobile from 'global/functions/is-mobile';
import Syncy from '../../../assets/images/syncy.png';
import API from 'global/constants/api';
import RichMarkdownEditor from 'rich-markdown-editor';

// declare interface IOrderDetailsProps {}

const OrderDetails: React.FC = () => {
  const [isOpen, setOpen] = useState(isMobile.any() ? false : true)
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<any>({})

  const getOrderDetails = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API}/booking/${window?.location?.href.split('/').pop()}`)
      const data = await response.json()
      console.log(data?.body?.booking)
  
      setOrder(data?.body?.booking)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getOrderDetails()
  }, [])

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
    <Pane display="flex" padding={16} marginTop={24} background={CSSVARIABLES.COLORS.WHITE_0} borderRadius={3}>
    <div className='orderDetails'>
      
      <Paragraph>Status: <Pill>{order?.status}</Pill></Paragraph>
      <Paragraph>Ordered on: {order?.date}</Paragraph>

      <h3>Paid: ${order?.contentPack?.price}</h3>
 
      <h2>Deliverable Details</h2>

      <Heading>{order?.contentPack?.title}</Heading>
      <Paragraph>{order?.contentPack?.description}</Paragraph>
      <Paragraph>Platform: <Pill>{order?.contentPack?.platform}</Pill></Paragraph>

      <h2>Influencer Details</h2>
      <Avatar src={order?.influencer?.image_url} size={80} name={order?.influencer?.first_name + ' ' + order?.influencer?.last_name} />
      <Heading>{order?.influencer?.first_name + ' ' + order?.influencer?.last_name}</Heading>
      <Paragraph>{order?.influencer?.followersCount}</Paragraph>

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
    }
  </OrderDetailsWrapper>
)};

export default OrderDetails;
