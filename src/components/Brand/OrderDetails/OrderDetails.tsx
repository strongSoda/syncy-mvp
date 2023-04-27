import React, { useEffect, useState } from 'react';

import OrderDetailsWrapper from './OrderDetails.styles';
import Hamburger from 'hamburger-react';
import { Avatar, Button, Heading, Pane, Paragraph, Pill, Spinner, TextInputField, Textarea, toaster } from 'evergreen-ui';
import CSSVARIABLES from 'global/constants/variables';
import SideBar from 'components/SideBar/SideBar.lazy';
import isMobile from 'global/functions/is-mobile';
import Syncy from '../../../assets/images/syncy.png';
import API from 'global/constants/api';
import RichMarkdownEditor from 'rich-markdown-editor';
import addDays from 'global/functions/add-days-to-date';
import emailjs from '@emailjs/browser';
import { Rating } from 'react-simple-star-rating';

// declare interface IOrderDetailsProps {}

const OrderDetails: React.FC = () => {
  const [isOpen, setOpen] = useState(isMobile.any() ? false : true)
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<any>({})

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const [submittingReview, setSubmittingReview] = useState(false)

  const [reviewExists, setReviewExists] = useState(false)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)

    // other logic
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value: number, index: number) => console.log(value, index)

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

  // check if email has been sent
  function sendEmail(id: string, brand: any, influencer: any, contentPack: any, date:string, delivery:string, submission_url:string) {
    fetch(`${API}/check-email-sent/${id}`)
      .then(res => res.json())
      .then(data => {
          console.log(data);
          if (data?.body?.email_sent_to_brand) {
              return;
          }

          // send with to creator about new order
          emailjs.send("service_5qbdzev", "template_9rf93fd", {
              brand_name: brand?.first_name + ' ' + brand?.last_name,
              influencer_name: influencer?.first_name,
              content_pack_title: contentPack?.title,
              content_pack_description: contentPack?.description,
              content_pack_platform: contentPack?.platform,
              content_pack_price: contentPack?.price,
              date: new Date(date).toLocaleDateString(),
              delivery: new Date(addDays(date, delivery)).toLocaleDateString(),
              submission_url: submission_url,
              orderlink: `https://app.syncy.net/influencer/order?id=${id}`,
              to_email: influencer?.email,
          }, 'Wpls9Y0SfcmtgJKO5').then(res => {
              console.log(res);
          }).catch(err => {
              console.log(err);
          });

      }).catch(err => {
          console.log(err);
      });


      // send with emailjs to brand
      emailjs.send("service_5qbdzev", "template_w0hd4v9", {
          brand_name: brand?.first_name + ' ' + brand?.last_name,
          influencer_name: influencer?.first_name + ' ' + influencer?.last_name,
          content_pack_title: contentPack?.title,
          content_pack_description: contentPack?.description,
          content_pack_platform: contentPack?.platform,
          content_pack_price: contentPack?.price,
          date: new Date(date).toLocaleDateString(),
          delivery: new Date(addDays(date, delivery)).toLocaleDateString(),
          submission_url: submission_url,
          orderlink: `https://syncy.net/order?id=${id}`,
          to_email: brand?.email,
      }, 'Wpls9Y0SfcmtgJKO5').then(res => {
          console.log(res);
          // update email sent to brand
          fetch(`${API}/set-email-sent/${id}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
          }).then(res => res.json())
      }).catch(err => {
          console.log(err);
      });

}

const submitReview = async () => {
  setSubmittingReview(true)
  try {
    const response = await fetch(`${API}/review/${window?.location?.href.split('/').pop()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating: rating,
        review: review
      })
    })
    const data = await response.json()
    console.log(data)
    if (data?.status === 'success') {
      // send email to influencer about review
      emailjs.send("service_5qbdzev", "template_e3thib6", {
        brand_name: order?.brand?.first_name + ' ' + order?.brand?.last_name,
        to_name: order?.influencer?.first_name,
        content_pack_title: order?.contentPack?.title,
        review: data?.body?.review?.review,
        rating: data?.body?.review?.rating,
        orderlink: `https://app.syncy.net/influencer/order/${window?.location?.href.split('/').pop()}`,
        to_email: order?.influencer?.email,
      }, 'Wpls9Y0SfcmtgJKO5').then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
      
      toaster.success('Review submitted successfully')

      getReview()

    } else {
      toaster.danger('Something went wrong')
    }
  } catch (error) {
    console.log(error)
    toaster.danger('Something went wrong')
  } finally {
    setSubmittingReview(false)
  }
}

const getReview = async () => {
  try {
    const response = await fetch(`${API}/review/${window?.location?.href.split('/').pop()}`)
    const data = await response.json()
    console.log(data)

    if (data?.status === 'success') {
      setRating(data?.body?.review?.rating)
      setReview(data?.body?.review?.review)

      setReviewExists(true)
    } else {
      setRating(0)
      setReview('')
    }
  } catch (error) {
    console.log(error)
  }
}


  useEffect(() => {
    getOrderDetails()
  }, [])

  useEffect(() => {
    if (order?.id) {
      getReview()
      sendEmail(order?.id, order?.brand, order?.influencer, order?.contentPack, order?.date, order?.delivery, order?.submission_url)
    }
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
    {order?.submission_url &&
    <Pane background={CSSVARIABLES.COLORS.WHITE_0} display="flex" alignItems="center" justifyContent="center" padding={24}>
    <Pane>
      <Heading>Submission: <a href={order?.submission_url} target='_blank' rel='noreferrer'>{order?.submission_url}</a></Heading>
      <br/>

      {reviewExists ?
      <>
      <Heading>Rating: {'⭐️'.repeat(rating)}</Heading>
      <Paragraph>Review: {review}</Paragraph>
      </>
      :
      <>
      <Rating
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        /* Available Props */
        />

        <br/>

        <Textarea
          placeholder="Leave a review"
          onChange={(e: any) => setReview(e.target.value)}
          value={review}
          width={300}
          height={100}
          resize="none"
          marginTop={16}
          maxLength={500}
        />

        <br/>

        <Button onClick={submitReview} intent='success' appearance='primary'>{submittingReview ? 'Submitting...' : 'Submit Review'}</Button>
      </>
    }
    </Pane>
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
    </>
    }
  </OrderDetailsWrapper>
)};

export default OrderDetails;
