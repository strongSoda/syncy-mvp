import React, { useContext, useEffect, useState } from 'react';
import SideBar from 'components/Influencer/SideBar/SideBar.lazy';

import InfluencerDashboardWrapper from './InfluencerDashboard.styles';
import CSSVARIABLES from 'global/constants/variables';
import API from 'global/constants/api';
import { AuthContext } from 'global/context/AuthContext';
import { Avatar, Badge, Button, Heading, Pane, Paragraph, Spinner, toaster } from 'evergreen-ui';

import EyeIcon from '../../../assets/icons/eye.svg';
// import EmailIcon from '../../../assets/icons/email.svg';
import { useHistory } from 'react-router';
import ROUTES from 'global/constants/routes';
import logUsage from 'global/functions/usage-logs';
import PhoneIcon from '../../../assets/icons/phone.svg';
// import SaveIcon from '../../assets/icons/save.svg';
// import loadingGif from '../../assets/images/loading.gif';
import Syncy from '../../../assets/images/syncy.png';
import createChat, { chatClient } from 'global/functions/create-chat';
import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import "stream-chat-react/dist/css/v2/index.css";

import { CardWrapper } from 'components/ManageRequests/ManageRequests.styles';
import getInfluencerProfile from 'global/functions/get-influencer-profile';
import formatNumber from 'global/functions/formatFollowers';

import { Spin as Hamburger } from 'hamburger-react'

import emailjs from '@emailjs/browser';
// import Button from 'components/Button/Button.lazy';

// import { useMediaQuery } from 'react-responsive';

// declare interface IInfluencerDashboardProps {}

const InfluencerDashboard: React.FC = () => {
  
  const user = useContext(AuthContext)

  const [campaignsLoading, setCampaignsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [applyLoading, setApplyLoading] = React.useState<string>('');
  const [invites, setInvites] = React.useState<any[]>([]);

  const [showBrandProfile, setShowBrandProfile] = React.useState(false);
  const [showBookCall, setShowBookCall] = React.useState(false);
  const [selectedInvite, setSelectedInvite] = React.useState<any>(null);
  
  
  const [isOpen, setOpen] = useState(true)

  // get influencer profile
  const [influencerProfile, setInfluencerProfile] = useState<any>(null);

  const getInfluencerProfileData = async () => {
    try {
      const response = await fetch(`${API}/influencer-profile?email=${user?.email}`);
      const data = await response.json();
      console.log('influencer profile', data);
      setInfluencerProfile(data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  // get invites by influencer email
  const getInvites = async () => {
    try {
      setLoading(true);
      // /influencer-invites
      const response = await fetch(`${API}/influencer-invites?email=${user?.email}`)
      const data = await response.json();
      console.log('invites', data);
      setInvites(data?.body?.invites);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const getCampaigns = async () => {
    try {
      setCampaignsLoading(true);
      // /influencer-invites
      const response = await fetch(`${API}/admin/campaigns`)
      const data = await response.json();
      console.log('campaigns', data);
      setCampaigns(data?.body?.campaigns);
      setCampaignsLoading(false);
    } catch (error) {
      console.log(error);
      setCampaignsLoading(false);
    }
  }

  const sendProposal = async (campaignId: string, campaignName: string, email: string) => {
    setApplyLoading(campaignId);
    try {
      const res = await fetch(`${API}/campaign/apply?campaignId=${campaignId}&email=${user?.email}`)
      const data = await res.json();
  
      console.log('sendProposal', data);
  
      if(data?.status === 'success') {
        // toaster.success('Proposal sent successfully');
        // send email with emailjs
        const templateParams = {
          email: user?.email,
          campaign: campaignName,
          to_email: email,
          name: influencerProfile?.first_name + ' ' + influencerProfile?.last_name,
          instagram: 'https://www.instagram.com/' + influencerProfile?.instagram_username,
          followers: influencerProfile?.followers_count,
        };

        // @ts-ignore
        await emailjs.send('service_5qbdzev', 'template_6fm5oud', templateParams, 'Wpls9Y0SfcmtgJKO5')
          .then((response: any) => {
              console.log('SUCCESS!', response.status, response.text);
              toaster.success('Proposal sent successfully');
            }, (error: any) => {    
              console.log('FAILED...', error);
              toaster.danger('Error sending proposal');
          });
      }
    }
    catch (error) {
      console.log(error);
      toaster.danger('Error sending proposal');
    }
    finally {
      setApplyLoading('');
    }
  }


  useEffect(() => {
    if(user?.email) {
      getInvites();
      getInfluencerProfileData();
      getCampaigns();
    }
  }, [user])

  return (
  <InfluencerDashboardWrapper data-testid="InfluencerDashboard">
    <div className='toggleBtn'>
      <Hamburger toggled={isOpen} toggle={(setOpen)} />
    </div>

    <Pane display="flex" padding={36} background={CSSVARIABLES.COLORS.YELLOW_GREEN_1} borderRadius={3}>
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
    
    {isOpen && <SideBar lightColor={CSSVARIABLES.COLORS.PURPLE_1} darkColor={CSSVARIABLES.COLORS.PURPLE_2} />}
  

    {loading ? 
      <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
        <Spinner />
      </Pane>
    :
    <>
        {invites?.length > 0 &&
          <div>
            <h1>Campaign Invites</h1>
            {invites?.map((invite: any) => (
              <Card invite={invite} setSelectedInvite={setSelectedInvite} setShowBrandProfile={setShowBrandProfile} setShowBookCall={setShowBookCall} />
            ))}
          </div>
        }
      </>
    }

    <h1>Discover All Campaigns</h1>
    {campaignsLoading ? 
      <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
        <Spinner />
      </Pane>
    :
      <>
        {campaigns?.length > 0 ?
          <div>
            {campaigns?.map((campaign: any) => (
              <div className="campaign">
                <div className='header'>
                  <Avatar src={campaign?.logo} name={campaign?.name} size={40} />
                  <div>
                    <p className='title'>
                      {campaign?.name} &nbsp;
                      {campaign?.status ? <Badge color="green">Active</Badge> : <Badge color="red">Inactive</Badge>}
                    </p>
                    
                    <Paragraph>{campaign?.description}</Paragraph>
                    <br/>
                    {campaign?.type.replaceAll(/[{}"]/g, '').split(',').map((type: any) => (<><Badge>{type}</Badge>&nbsp;</>))}
                  </div>
                  <div className='actions'>
                  <Button
                    appearance="primary"
                    intent="success"
                    onClick={() => {
                      // setShowBrandProfile(true);
                      sendProposal(campaign?.id, campaign?.name, campaign?.email);
                    }}
                  >
                    {applyLoading === campaign?.id ? "Applying..." : "Apply"}
                  </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        :
          <div>
            <span>No campaigns</span>
          </div>
        }
      </>
    }
    


  {showBrandProfile && <BrandProfile brand={selectedInvite} setShowBrandProfile={setShowBrandProfile} />}
  {showBookCall && <BookCall brand={selectedInvite} setShowBookCall={setShowBookCall} />}
  </InfluencerDashboardWrapper>
)};

interface ICardProps {
  invite: any;
  setShowBrandProfile: any;
  setSelectedInvite: any;
  setShowBookCall: any;
}

const Card: React.FC<ICardProps> = ({invite, setShowBrandProfile, setSelectedInvite, setShowBookCall }) => {
  return (
  <CardWrapper data-testid="Card">
    <Avatar src={invite?.companyLogo} alt="profile" size={80} name={invite?.fullName} />
    <div className="card-body">
      <div className='card-header'>
        <p className="card-title">
          {invite?.brandName}
          {/* <Paragraph>{invite?.contactName}</Paragraph> */}
        </p>
        <div className='actions'>          
          {invite?.bookCallInfo && <img className='icon' src={PhoneIcon} alt="eye" onClick={() => {
            setSelectedInvite(invite);
            setShowBookCall(true)} 
          } />}
          <img className='icon' src={EyeIcon} alt="eye" onClick={() => {
            // logUsage('InfluencerDashboard', 'VIEW Brand Profile');
            setShowBrandProfile(true);
            setSelectedInvite(invite);
          } } />
          {/* <img className='icon' src={SaveIcon} alt="eye" /> */}
        </div>
      </div>
      <Paragraph className="card-desc">{invite?.companyDescription}</Paragraph>
      {/* <small>{formatNumber(invite?.followersCount)} Followers</small>         */}
      <div className="card-footer">
        {/* eye icon svg */}
        {/* <Button text="View" backgroundColor={CSSVARIABLES.COLORS.GREEN_0} onClick={() => setShowInfluencerProfile(true)} /> */}
      </div>
    </div>
    {/* {showInfluencerProfile && <InfluencerProfile influencer={invite} setShowInfluencerProfile={setShowInfluencerProfile} setShowBookCall={setShowBookCall} setShowReachout={setShowReachout} />}
    {showReachout && <Reachout influencer={invite} setShowReachout={setShowReachout} />} */}
  </CardWrapper>
)};

declare interface IBrandProfileProps {
  brand: any;
  setShowBrandProfile: any;
}
const BrandProfile: React.FC<IBrandProfileProps> = ({brand, setShowBrandProfile}: IBrandProfileProps) => {

  const user = useContext(AuthContext)
  const [channel, setChannel] = useState<any>(null);
  const [filters, setFilters] = useState<any>(null);
  const [sort, setSort] = useState<any>(null);
  const [options, setOptions] = useState<any>(null);

  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    console.log('brand', brand?.channelId);
    if(brand?.channelId) {
      setLoadingChat(true);
      console.log('here');
      getUserToken(brand?.channelId);
    }
  }, [brand]);

  const updateChannelMembers = async (channelId: string) => {
    console.log('updateChannelMembers', channelId);
    // /stream-chat-update-channel-members
    const response = await fetch(`${API}/stream-chat-update-channel-members?email=${user?.email}&userId=${user?.uid}&channelId=${channelId}`)
    const data = await response.json();
    console.log(data, data?.data?.token);
  }


  const getUserToken = async (channelId: string) => {
    console.log('getUserToken', channelId);
    
    const influencerProfile = await getInfluencerProfile(user?.email as string);

    await updateChannelMembers(channelId)

    // /stream-chat-token
    const response = await fetch(`${API}/stream-chat-token?uid=${user?.uid}`)
    const data = await response.json();
    console.log(data, data?.data?.token);

    // setUserToken(data?.data?.token);

    const user1 = {email: user?.email, id: user?.uid, fullName: influencerProfile?.first_name + influencerProfile?.last_name, imageUrl: influencerProfile?.image_url}
    const user2 = {fullName: brand?.brandName, imageUrl: brand?.companyLogo}
    
    const {channel, chatClient} = createChat(data?.data?.token, user1, user2, brand?.channelId);

    // wait for 3 seconds
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    setChannel(channel);
    // setChatClient(chatClient);
    
    const filters = { members: { $in: [ user1?.id ] } }
    const sort = { last_message_at: -1 };
    const options = { limit: 10 }

    setFilters(filters);
    setSort(sort);
    setOptions(options);

    setLoadingChat(false);
    console.log('channel', channel?.id, channel?.cid, channel?.data?.id);
  }


  return (
    <div className='brand-profile'>
      
      <div className='profile-header'>
      {/* cross icon to close sidebar on click */}
        <img className='cross-icon' src='https://www.svgimages.com/svg-image/s3/close-icon-256x256.png' alt="cross" onClick={() => setShowBrandProfile(false) } />
      </div>
      <div className='container'>  
        <Avatar src={brand?.companyLogo} alt="profile" name={brand?.brandName} size={80} />
        <div className='profile-info'>
          <h1 className='name'>{brand?.brandName}</h1>
          <p className='bio'>{brand?.companyDescription}</p>
          <p className='bio'>Contacted by: {brand?.contactName}</p>
          <a className='website' href={brand?.companyWebsite} target="_blank" rel='noreferrer'>{brand?.companyWebsite}</a>
        </div>
      </div>

      {/* <iframe title={influencer?.fullName} src={`${influencer?.profileUrl ? influencer?.profileUrl : `https://www.instagram.com/${influencer?.instagram_username}/` }embed`} name="myiFrame" scrolling="yes" frameBorder="0" height="900" width="100%" allowFullScreen={true}></iframe> */}
      {/* <Button text="X" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={() => setShowInfluencerProfile(false) } /> */}

      {loadingChat ?
      <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
        <Spinner />
      </Pane>
      :
      <>
      {channel && chatClient && filters && sort && options &&
        <Chat client={chatClient} theme="str-chat__theme-dark">
        {/* <ChannelList showChannelSearch filters={filters} sort={sort} options={options} Preview={CustomPreview} /> */}
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
        </Chat>
        }
      </>
      }
    </div>
  );
}

interface IBookCallProps {
  brand: any;
  setShowBookCall: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookCall: React.FC<IBookCallProps> = ({brand, setShowBookCall}: IBookCallProps) => {

  const user = useContext(AuthContext);
  const [influencerUserProfile, setInfluencerUserProfile] = useState<any>(null);

  const getProfile = async () => {
    // /brand_user_profile
    const profile = await getInfluencerProfile(user?.email as string);
    console.log('influencer_profile', profile);
    setInfluencerUserProfile(profile);
  }

  useEffect(() => {
    getProfile();
    logUsage('BRAND BOOK CALL BUTTON CLICKED', {user: {email: user?.email}, brand: brand?.brandName});
  },[])

  return (
    <div className='brand-profile'>
      {/* cross icon to close sidebar on click */}
      <img className='cross-icon' src='https://www.svgimages.com/svg-image/s3/close-icon-256x256.png' alt="cross" onClick={() => setShowBookCall(false) } />

      {/* <Button text="X" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={() => setShowInfluencerProfile(false) } /> */}
      <div className='container'>  
        <Avatar src={brand?.companyLogo} alt="profile" name={brand?.brandName} size={80} />
          
        <div>
          <h1 className='name'>{brand?.brandName}</h1>
          <p className='bio'>{brand?.companyDescription}</p>
          <p className='bio'>Contacted by: {brand?.contactName}</p>
          <a className='website' href={brand?.companyWebsite} target="_blank" rel='noreferrer'>{brand?.companyWebsite}</a>
        </div>
        {/* <p className='followers'>Followers: {formatNumber(brand?.followersCount)}</p> */}
        {/* <p className='bio'>{influencer?.imageUrl}</p> */}

        {/* calednly iframe */}
      </div>      
      {influencerUserProfile ? 
        <iframe title={brand?.brandName} 
        src={`${brand?.bookCallInfo}?email=${user?.email}&name=${influencerUserProfile?.first_name} ${influencerUserProfile?.last_name}&guests=assistant@syncy.net`} 
        width="100%" height="1000px" frameBorder="0">
        </iframe> 
      :
      <Pane display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Spinner />
      </Pane>
      }
    </div>
  );
}


export default InfluencerDashboard;
