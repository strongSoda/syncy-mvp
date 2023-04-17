import React, { useContext, useEffect, useState } from 'react';

import OrdersWrapper from './Orders.styles';
import Hamburger from 'hamburger-react';
import { Avatar, Button, Heading, Pane, Pill, Spinner } from 'evergreen-ui';
import SideBar from 'components/SideBar/SideBar.lazy';
import CSSVARIABLES from 'global/constants/variables';
import isMobile from 'global/functions/is-mobile';
import Syncy from '../../../assets/images/syncy.png';
import API from 'global/constants/api';
import { AuthContext } from 'global/context/AuthContext';

// declare interface IOrdersProps {}

const Orders: React.FC = () => {
  const [isOpen, setOpen] = useState(isMobile.any() ? false : true)
  const [loading, setLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const [bookings, setBookings] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 5,
    total: +Infinity,
  })

  const user  = useContext(AuthContext)

  const getOrders = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API}/bookings/${user?.email}?per_page=${pagination?.per_page}`)
      const data = await response.json()
      console.log(data)
  
      setBookings(data?.body?.bookings)
      setPagination(data?.pagination)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const loadNextPage = async () => {
    setLoadMore(true)
    try {
      const response = await fetch(`${API}/bookings/${user?.email}?page=${pagination?.page + 1 > pagination?.total ? pagination?.total : pagination?.page + 1}`)
      const data = await response.json()
      console.log(data)

      setBookings([...bookings, ...data?.body?.bookings] as [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoadMore(false)
    }
  }

  useEffect(() => {
    if(user) getOrders()
  }, [user])


  useEffect(() => {
    console.log(pagination);
  }, [pagination])

  // given a date and a number of days, return a new date
  const addDays = (date: string, days: string) => {
    console.log(date);
    
    const result = new Date(date);
    result.setDate(result.getDate() + +days);
    console.log('yoyo', result.toLocaleDateString());
    return result.toLocaleDateString();
    // return result;
  }

  return (
  <OrdersWrapper data-testid="Orders">

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

    <h1>My Orders &nbsp;&nbsp;

      {!loading && (pagination?.page < pagination?.total) && 
        <Button onClick={loadNextPage} isLoading={loadMore} disabled={loadMore}>{loadMore ? 'Loading...' : 'Load More'}</Button>
      }
    </h1>
    {loading && <Spinner />}
    {!loading && bookings && <div className='orders'>
      {bookings?.map((booking: any) => (
        <Pane key={booking?.id} display="flex" padding={16} background={CSSVARIABLES.COLORS.WHITE_0} borderRadius={3} marginBottom={20}>
        <div className='order'>
          <Heading className='title'>{booking?.contentPack?.title}</Heading>
          <p>$ {booking?.contentPack?.price}</p>
          <Pill>{booking?.status}</Pill>
          <Pane display="flex" alignItems="center" gap={4}>
            <Avatar src={booking?.influencer?.image_url} name={booking?.influencer?.first_name + ' ' + booking?.influencer?.last_name} size={40} />
            <p>{booking?.influencer?.first_name + ' ' + booking?.influencer?.last_name} </p>
          </Pane>
          <p>Delivery on {addDays(booking?.date, booking?.contentPack?.delivery)}</p>
        </div>
        </Pane>
      ))}
    </div>}

  </OrdersWrapper>
)};

export default Orders;
